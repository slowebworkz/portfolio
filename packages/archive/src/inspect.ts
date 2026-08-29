import { parse } from 'node-html-parser';

/**
 * Static analysis of an archived HTML page — the signals worth citing when
 * reconstructing what a site's front end was built with at a point in time.
 * Works on the page markup alone; it does not fetch linked assets.
 */

export interface DetectedLibrary {
  /** Best-guess library name, or `null` when only the URL is known. */
  name: string | null;
  /** Version parsed from the URL (`jquery-1.11.3.min.js` → `1.11.3`), if any. */
  version: string | null;
  /** The `src` / `href` as it appeared in the markup. */
  url: string;
}

export interface PageAnalysis {
  /** Bytes of HTML analysed. */
  htmlBytes: number;
  doctype: string | null;
  lang: string | null;
  generator: string | null;
  /** `true` when a `<meta name="viewport">` is present. */
  hasViewportMeta: boolean;
  /** `<!--[if IE]>` and friends — a marker of the IE6–9 support era. */
  conditionalCommentCount: number;
  externalScripts: DetectedLibrary[];
  stylesheets: DetectedLibrary[];
  inlineScriptCount: number;
  inlineStyleCount: number;
}

/** src/href substring → library name. Matched against the basename, so a query
 *  string or CDN path doesn't matter. Order matters — first hit wins. */
const LIBRARY_SIGNATURES: ReadonlyArray<readonly [RegExp, string]> = [
  [/jquery-ui|jquery\.ui/iu, 'jQuery UI'],
  [/jquery(\.min)?\.js|jquery-\d|jquery\//iu, 'jQuery'],
  [/modernizr/iu, 'Modernizr'],
  [/html5shiv|html5-shiv/iu, 'html5shiv'],
  [/respond(\.min)?\.js/iu, 'Respond.js'],
  [/picturefill/iu, 'picturefill'],
  [/slick(\.min)?\.js|slick-carousel/iu, 'slick'],
  [/jquery\.slides|slides\.min\.js|superslides/iu, 'jquery.slides / Slides'],
  [/flexslider/iu, 'FlexSlider'],
  [/bootstrap(\.min)?\.js/iu, 'Bootstrap JS'],
  [/PIE(\.min)?\.(js|htc)/u, 'CSS3 PIE'],
  [/prototype(\.min)?\.js/iu, 'Prototype'],
  [/mootools/iu, 'MooTools'],
  [/underscore|lodash/iu, 'Underscore / Lodash'],
  [/backbone/iu, 'Backbone'],
  [/angular/iu, 'Angular'],
  [/react(-dom)?(\.min)?\.js/iu, 'React'],
  [/vue(\.min)?\.js/iu, 'Vue'],
  [/ember/iu, 'Ember'],
];

const VERSION_PATTERN = /[-@/v_](\d+\.\d+(?:\.\d+)?)/u;

/** Guess the library and version behind a script/stylesheet URL. */
export function detectLibrary(url: string): DetectedLibrary {
  const basename = url.split(/[?#]/u)[0]?.split('/').pop() ?? url;
  let name: string | null = null;
  for (const [pattern, libraryName] of LIBRARY_SIGNATURES) {
    if (pattern.test(basename) || pattern.test(url)) {
      name = libraryName;
      break;
    }
  }
  // Version is usually in the filename (`jquery-1.11.3.min.js`) but sometimes
  // only in the path (`/ui/1.12.1/jquery-ui.min.js`).
  const version = VERSION_PATTERN.exec(basename)?.[1] ?? VERSION_PATTERN.exec(url)?.[1] ?? null;
  return { name, version, url };
}

/** Count `<!--[if …]>` / `<!--[if !IE]>` conditional comments in raw HTML. */
export function countConditionalComments(html: string): number {
  return (html.match(/<!--\s*\[if\s/giu) ?? []).length;
}

export function analyzeHtml(html: string): PageAnalysis {
  const root = parse(html, { comment: true });

  const htmlEl = root.querySelector('html');
  const generatorMeta = root
    .querySelectorAll('meta[name]')
    .find((meta) => meta.getAttribute('name')?.toLowerCase() === 'generator');

  const externalScripts = root
    .querySelectorAll('script[src]')
    .map((script) => detectLibrary(script.getAttribute('src') ?? ''));

  const stylesheets = root
    .querySelectorAll('link[rel]')
    .filter((link) => link.getAttribute('rel')?.toLowerCase().includes('stylesheet'))
    .map((link) => detectLibrary(link.getAttribute('href') ?? ''));

  const doctypeMatch = /<!doctype[^>]*>/iu.exec(html);

  return {
    htmlBytes: Buffer.byteLength(html, 'utf8'),
    doctype: doctypeMatch ? doctypeMatch[0].replace(/\s+/gu, ' ') : null,
    lang: htmlEl?.getAttribute('lang') ?? null,
    generator: generatorMeta?.getAttribute('content') ?? null,
    hasViewportMeta: root
      .querySelectorAll('meta[name]')
      .some((meta) => meta.getAttribute('name')?.toLowerCase() === 'viewport'),
    conditionalCommentCount: countConditionalComments(html),
    externalScripts,
    stylesheets,
    inlineScriptCount: root.querySelectorAll('script').length - externalScripts.length,
    inlineStyleCount: root.querySelectorAll('style').length,
  };
}
