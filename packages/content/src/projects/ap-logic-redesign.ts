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
  caseStudy: {
    summary:
      'A three-month contract in 2013 to rebuild AP Logic’s marketing site as a custom WordPress theme from a designer’s comps. The site it replaced was an ASP.NET/WordPress hybrid whose homepage shipped ~130 KB of markup across five stylesheets and a stack of jQuery plugins; the rebuild brought that to ~15 KB on one theme stylesheet while still supporting IE 6–8.',

    context: `AP Logic (Applied Process Logic) is a software consultancy, then in San Luis Obispo. By 2013 their site had accreted: the earlier pages were a div-based ASP.NET site, and at some point a WordPress install had been bolted on for content. The homepage that existed when I started was a hybrid — \`.aspx\` pages pulling in \`wp-content\` — loading jQuery 1.7.2, jQuery UI 1.9.2, FlexSlider, a lightbox, a hosted webfont, and five stylesheets, for about 130 KB of HTML before any of that.

They had commissioned new design comps and wanted them built properly. This was a direct contract, sole developer, roughly three months.`,

    problem: `The brief was "build these comps," but the real problem was the weight and the tangle. Every page carried the full plugin stack whether it used it or not, the CSS was split across five files with overlapping rules, and the ASP.NET/WordPress split meant no single place owned a page's markup.

The site also had to keep working in IE 6–8. In 2013 that was still a real requirement for a B2B audience, and the comps used rounded corners, gradients, and web fonts that those browsers didn't do natively.`,

    goals: [
      'Implement the comps faithfully as a single custom WordPress theme',
      'Consolidate to WordPress — retire the ASP.NET half',
      'Cut the page weight substantially — one theme stylesheet, only the JavaScript a page needs',
      'Hold IE 6–8 support without holding everyone else back',
      'Responsive layout',
    ],

    keyDecisions: [
      {
        decision: 'Load jQuery as an IE-conditional pair, not a single old-IE build',
        rationale:
          'jQuery 2.0 had just dropped IE 6–8 support and was meaningfully smaller and faster for it. Loading `jquery-2.0.3` for modern browsers and `jquery-1.10.2` inside an `<!--[if lt IE 9]>` block meant the majority of visitors got the lean build while IE users still worked.',
        tradeoffs:
          'Two jQuery versions to test against, and any plugin had to be checked on both. The alternative — shipping 1.10 to everyone — was simpler but taxed every visitor for a shrinking minority.',
      },
      {
        decision: 'CSS3 PIE for rounded corners and gradients in IE, rather than sliced images',
        rationale:
          'The comps leaned on `border-radius`, gradients, and shadows. PIE renders those in IE 6–9 from the real CSS, so there was one source of truth for the styling and no image assets to regenerate when the design changed.',
        tradeoffs:
          'PIE is a `.htc` behavior — fragile about `position`, repaints on scroll, and slow on long pages. In hindsight, letting IE 8 degrade to square corners would have been steadier and fine for this audience.',
      },
    ],

    implementation: `The theme (\`wp-content/themes/aplogic/\`) was built on a staging host and handed to the client's WordPress install. One stylesheet, \`aplogic.css\`; the only other CSS on a typical page came from Contact Form 7 and a pagination plugin. **html5shiv** (the \`html5shim\` build) covered HTML5 sectioning elements in old IE, and **Modernizr** provided feature classes for the CSS. All of the IE-only code — shiv, PIE, jQuery 1.10 — sat behind conditional comments, so modern browsers downloaded none of it.`,

    challenges: `**IE 6–8 in 2013.** Getting the comps' rounded panels and gradient buttons to hold up in IE via CSS3 PIE — without visible reflow on scroll — was most of the fiddly work.

**The hybrid handover.** Consolidating onto WordPress meant untangling which pages were \`.aspx\` and which were already WordPress, and making sure nothing that mattered lived only on the ASP.NET side before it went away.

**No design authority.** I implemented the comps; where they were ambiguous at a breakpoint or in an interaction state, those were conversations with the client rather than decisions I could just make.`,

    results: `Measured from the Internet Archive: the homepage went from **132 KB** (2013-05 capture) to **15 KB** (2013-10 capture) — about 8.6× lighter — and from five stylesheets plus FlexSlider, jQuery UI, and a lightbox to one theme stylesheet and a conditionally-loaded jQuery.

The theme stayed in production, largely unchanged, for years — the archive shows it settling at ~14 KB through 2015. AP Logic has since moved to an unrelated Webflow site, so the work now survives only in the archive.`,

    whatIdChange: `**Not CSS3 PIE.** It was the pragmatic 2013 choice, but the maintenance cost was real. A graceful degradation — square corners and flat buttons in IE 8, the full treatment everywhere else — would have been less fragile and, in hindsight, perfectly acceptable for the audience.

**Push on the content model.** Consolidating onto WordPress was right, but the theme was fairly template-driven. A cleaner separation of content types up front would have made the site easier for the client to extend without a developer.`,

    links: [
      {
        label: 'Before — the hybrid site (2013-05, Internet Archive)',
        url: 'https://web.archive.org/web/20130516030421/http://www.ap-logic.com/',
        kind: 'archive',
      },
      {
        label: 'After — the redesign (2013-10, Internet Archive)',
        url: 'https://web.archive.org/web/20131028060152/http://www.ap-logic.com/',
        kind: 'archive',
      },
    ],
  },
  featured: false,
});
