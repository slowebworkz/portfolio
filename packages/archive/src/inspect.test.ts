import { describe, expect, it } from 'vitest';

import { analyzeHtml, countConditionalComments, detectLibrary } from './inspect.ts';

describe('detectLibrary', () => {
  it('names common libraries and pulls the version from the filename', () => {
    expect(detectLibrary('/js/jquery-1.11.3.min.js')).toMatchObject({
      name: 'jQuery',
      version: '1.11.3',
    });
    expect(detectLibrary('https://code.jquery.com/ui/1.12.1/jquery-ui.min.js')).toMatchObject({
      name: 'jQuery UI',
      version: '1.12.1',
    });
    expect(detectLibrary('/vendor/modernizr.custom.js')).toMatchObject({
      name: 'Modernizr',
      version: null,
    });
    expect(detectLibrary('/plugins/slick/slick.min.js')).toMatchObject({ name: 'slick' });
  });

  it('returns a null name for an unrecognised URL but keeps a version if present', () => {
    expect(detectLibrary('/js/site-2.4.1.js')).toMatchObject({ name: null, version: '2.4.1' });
    expect(detectLibrary('/css/main.css')).toMatchObject({ name: null, version: null });
  });
});

describe('countConditionalComments', () => {
  it('counts IE conditional comments', () => {
    const html = `<!--[if lt IE 9]><script src="html5shiv.js"></script><![endif]-->
      <!--[if IE]><link rel="stylesheet" href="ie.css"><![endif]-->`;
    expect(countConditionalComments(html)).toBe(2);
  });
});

const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="generator" content="WordPress 3.5.1" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/css/reset.css" />
  <link rel="stylesheet" href="/css/site.css" />
  <link rel="stylesheet" href="/css/flexslider.css" />
  <!--[if lt IE 9]><script src="/js/html5shiv.js"></script><![endif]-->
  <style>.a{color:red}</style>
</head>
<body>
  <script src="/js/jquery-1.11.3.min.js"></script>
  <script src="/js/jquery.flexslider.js"></script>
  <script>window.x = 1;</script>
</body>
</html>`;

describe('analyzeHtml', () => {
  it('extracts doctype, lang, generator, viewport, and counts', () => {
    const analysis = analyzeHtml(PAGE);
    expect(analysis.htmlBytes).toBeGreaterThan(0);
    expect(analysis.doctype?.toLowerCase()).toContain('doctype html');
    expect(analysis.lang).toBe('en');
    expect(analysis.generator).toBe('WordPress 3.5.1');
    expect(analysis.hasViewportMeta).toBe(true);
    expect(analysis.conditionalCommentCount).toBe(1);
    expect(analysis.inlineStyleCount).toBe(1);
  });

  it('lists external scripts and stylesheets with detected libraries', () => {
    const analysis = analyzeHtml(PAGE);
    expect(analysis.externalScripts.map((script) => script.name)).toEqual(
      expect.arrayContaining(['jQuery', 'FlexSlider']),
    );
    const jquery = analysis.externalScripts.find((script) => script.name === 'jQuery');
    expect(jquery?.version).toBe('1.11.3');
    expect(analysis.stylesheets).toHaveLength(3);
    expect(analysis.inlineScriptCount).toBe(1);
  });
});
