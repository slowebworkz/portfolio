import { parseProject, type Project } from '@portfolio/data';

export const apLogicRedesign: Project = parseProject({
  slug: 'ap-logic-redesign',
  title: 'AP Logic — website redesign',
  summary:
    'A three-month contract to build AP Logic’s website redesign: a custom WordPress theme from client comps, roughly nine times lighter than the flexslider site it replaced.',
  category: 'contract',
  status: 'gone',
  period: { start: '2013', end: '2013', approximate: true, note: 'Three-month contract.' },
  role: 'Sole developer, direct contract with the client',
  organization: {
    name: 'AP Logic (Applied Process Logic)',
    kind: 'client',
    location: 'San Luis Obispo, CA at the time; since moved to Long Beach',
  },
  motivation:
    'AP Logic had new design comps and needed them built as a custom WordPress theme, replacing a heavy ASP.NET + WordPress site whose homepage shipped ~130 KB of markup.',
  technologies: [
    { name: 'WordPress', confidence: 'confirmed' },
    { name: 'PHP', confidence: 'confirmed' },
    { name: 'CSS3', confidence: 'confirmed' },
    { name: 'jQuery', confidence: 'confirmed' },
    { name: 'Modernizr', confidence: 'confirmed' },
    { name: 'html5shiv', confidence: 'confirmed' },
    { name: 'CSS3 PIE', confidence: 'confirmed' },
  ],
  contributions: {
    did: [
      'Built the custom WordPress theme (themes/aplogic/) from client comps',
      'HTML5 and CSS3 with IE 6–8 support via Modernizr, html5shiv, and CSS3 PIE (PIE_IE678.js / PIE_9.js)',
      'Responsive layout, collapsing five stylesheets to one theme stylesheet',
      'Developed on a staging host (ap-logic.dwtemp.net) and deployed to the client’s WordPress install',
    ],
    didNot: ['Own the visual design — I implemented client comps'],
  },
  lineage: [
    {
      period: '≤ 2012',
      label: 'Div-based ASP.NET site',
      description: 'XHTML 1.0 Transitional, .aspx pages, jQuery 1.3–1.4. ~17 KB homepage.',
      mine: false,
      confidence: 'confirmed',
      evidenceId: 'context-2012',
    },
    {
      period: 'early–mid 2013',
      label: 'ASP.NET + WordPress + flexslider (~130 KB)',
      description:
        'A hybrid: .aspx pages pulling in WordPress content, jQuery 1.7.2 + jQuery UI 1.9.2, FlexSlider, five stylesheets. This is what the redesign replaced.',
      mine: false,
      confidence: 'confirmed',
      evidenceId: 'before',
    },
    {
      period: '2013-10',
      label: 'The redesign — custom WordPress theme (~15 KB)',
      description:
        'A lean custom theme on WordPress 3.6.1, ~8.6× lighter, responsive, with conditional jQuery (1.10.2 for old IE, 2.0.3 for modern) and Modernizr / html5shiv / CSS3 PIE for IE 6–8.',
      mine: true,
      confidence: 'confirmed',
      evidenceId: 'after',
    },
  ],
  links: [
    {
      label: 'The redesign (Internet Archive)',
      url: 'https://web.archive.org/web/20131028060152/http://www.ap-logic.com/',
      kind: 'archive',
    },
  ],
  evidence: [
    {
      id: 'context-2012',
      kind: 'wayback',
      label: 'Div-based ASP.NET era (~17 KB, jQuery 1.4)',
      confidence: 'confirmed',
      role: 'context',
      originalUrl: 'http://www.ap-logic.com/',
      archiveUrl: 'https://web.archive.org/web/20120830132739/http://www.ap-logic.com/',
      capturedAt: '2012-08-30',
    },
    {
      id: 'before',
      kind: 'wayback',
      label: 'ASP.NET + WordPress + flexslider (~130 KB) — what the redesign replaced',
      confidence: 'confirmed',
      role: 'before',
      originalUrl: 'http://www.ap-logic.com/',
      archiveUrl: 'https://web.archive.org/web/20130516030421/http://www.ap-logic.com/',
      capturedAt: '2013-05-16',
    },
    {
      id: 'after',
      kind: 'wayback',
      label: 'The redesign — custom WordPress theme (~15 KB)',
      confidence: 'confirmed',
      role: 'after',
      originalUrl: 'http://www.ap-logic.com/',
      archiveUrl: 'https://web.archive.org/web/20131028060152/http://www.ap-logic.com/',
      capturedAt: '2013-10-28',
    },
  ],
  retainedArtifacts: 'none',
  caveats: [
    'Gone from production — AP Logic’s current site is an unrelated Webflow rebuild. The work survives only in the Internet Archive.',
    'No NDA; no retained source or design files.',
    'The stack (WordPress, jQuery, Modernizr, html5shiv, CSS3 PIE) and the ~130 KB → ~15 KB drop are read directly from the archived 2013-05 and 2013-10 captures; design ownership and the working process are from recollection.',
  ],
  publishability: { status: 'likely', notes: 'No NDA; public site, public archive.' },
  caseStudy: null,
  featured: false,
});
