import { parseProject, type Project } from '@portfolio/data';

export const mcmillanRedesign: Project = parseProject({
  slug: 'mcmillan-study-guides-redesign',
  title: 'McMillan Study Guides — front-end modernization',
  summary:
    'Modernized the front end of a live study-guide storefront — library upgrades, CSS3, responsive images, and a restructured stylesheet architecture — on the existing CakePHP application, page by page, without a rewrite.',
  category: 'employment',
  status: 'live',
  period: {
    start: '2016-05',
    end: '2017',
    note: 'Phased, page by page; ended with the Contact Us pages.',
  },
  role: 'Software Developer — sole developer on the redesign',
  organization: { name: 'McMillan Study Guides', kind: 'employer' },
  motivation:
    'The company wanted a fresher, more modern design to attract customers — a commercial refresh, not a technical forcing function.',
  technologies: [
    { name: 'CakePHP', confidence: 'confirmed' },
    { name: 'jQuery', confidence: 'confirmed' },
    { name: 'jQuery UI', confidence: 'confirmed' },
    { name: 'Vanilla JavaScript', confidence: 'confirmed' },
    { name: 'slick carousel', confidence: 'confirmed' },
    { name: 'picturefill', confidence: 'confirmed' },
  ],
  contributions: {
    did: [
      'Updated jQuery 1.11 → 2.2.4 and jQuery UI 1.10.4 → 1.12.1',
      'Added responsive images via picturefill',
      'Replaced the jquery.slides carousel with slick',
      'Split the single site.css into per-concern and per-portal stylesheets',
      'Built the HTML5 replacements as Flash was retired',
    ],
    didNot: [
      'The earlier table-layout → div conversion — the site was already div-based by 2014',
      'Own the visual design — I implemented the designer’s direction',
    ],
  },
  lineage: [
    {
      period: '≤ 2013',
      label: 'Table-based marketing pages',
      description: 'Classic HTML table layout. Converted to div-based before I arrived.',
      mine: false,
      confidence: 'recollection',
    },
    {
      period: '2014 – 2016',
      label: 'Div-based but dated',
      description:
        'XHTML 1.0, jQuery 1.10.2, jQuery UI 1.10.4, the jquery.slides carousel, w2ui widgets, swfobject. The AirForce storefront shipped ~14 KB of markup. This is what I inherited.',
      mine: false,
      confidence: 'confirmed',
      evidenceId: 'before',
    },
    {
      period: '2016-05 – 2017',
      label: 'Modernized, page by page',
      description:
        'jQuery 1.10.2/1.11 → 2.2.4, jQuery UI 1.10.4 → 1.12.1, slick replacing jquery.slides, picturefill for responsive images, balancetext. Phased across the storefront; the Contact Us pages came last.',
      mine: true,
      confidence: 'confirmed',
      evidenceId: 'after',
    },
  ],
  links: [{ label: 'Live site', url: 'https://mcmguides.com/AirForce', kind: 'live' }],
  evidence: [
    {
      id: 'context-2014',
      kind: 'wayback',
      label: 'The marketing site in 2014 — div-based, pre-modernization',
      confidence: 'confirmed',
      role: 'context',
      originalUrl: 'http://mcmguides.com/',
      archiveUrl: 'https://web.archive.org/web/20140517212708/http://mcmguides.com/',
      capturedAt: '2014-05-17',
    },
    {
      id: 'before',
      kind: 'wayback',
      label: 'The AirForce storefront as I inherited it (2015): jQuery 1.10.2, jquery.slides',
      confidence: 'confirmed',
      role: 'before',
      originalUrl: 'http://mcmguides.com/AirForce',
      archiveUrl: 'https://web.archive.org/web/20150718080457/http://mcmguides.com/AirForce',
      capturedAt: '2015-07-18',
    },
    {
      id: 'mid-2017',
      kind: 'wayback',
      label: 'Mid-migration (June 2017): jQuery 1.11.0, jquery.slides still in place',
      confidence: 'confirmed',
      role: 'context',
      originalUrl: 'http://mcmguides.com/AirForce',
      archiveUrl: 'https://web.archive.org/web/20170616233938/http://mcmguides.com/AirForce',
      capturedAt: '2017-06-16',
    },
    {
      id: 'after',
      kind: 'wayback',
      label:
        'Modernized AirForce storefront (Oct 2017): jQuery 2.2.4, jQuery UI 1.12.1, slick, picturefill',
      confidence: 'confirmed',
      role: 'after',
      originalUrl: 'http://mcmguides.com/AirForce',
      archiveUrl: 'https://web.archive.org/web/20171023004337/http://mcmguides.com/AirForce',
      capturedAt: '2017-10-23',
    },
    {
      id: 'live',
      kind: 'link',
      label: 'The site today (further evolved since)',
      confidence: 'confirmed',
      role: 'supporting',
      url: 'https://mcmguides.com/AirForce',
    },
  ],
  retainedArtifacts: 'none',
  caveats: [
    'No retained source, screenshots, or design files — all handed over on leaving.',
    'The library upgrades (jQuery, jQuery UI, slick-for-jquery.slides, picturefill) are read directly from the archived AirForce captures. The June-2017 capture still shows jQuery 1.11.0 and jquery.slides; the October-2017 capture is fully modernized, which brackets the finish.',
    'The stylesheet split and the Flash-to-HTML5 work were on other portals/pages not sampled here — those specifics rest on recollection. Flash removal was the company’s decision; the HTML5 replacement was mine.',
    'I have no data on the redesign’s commercial results.',
  ],
  publishability: {
    status: 'likely',
    notes:
      'No remembered NDA on the public redesign. Later internal client-software work at McMillan is separately NDA-bound and is not included here.',
  },
  caseStudy: {
    summary:
      'A phased front-end modernization of McMillan’s live study-guide storefront over 2016–17 — sole developer, on the existing CakePHP application, page by page, with no rewrite and no downtime. Library upgrades (jQuery, jQuery UI, a carousel swap), responsive images, and a stylesheet architecture that isolated one sales portal from another.',

    context: `McMillan Study Guides sells promotion-exam prep for the US military — separate storefronts (“portals”) for the Air Force, Navy, and others, all served by one CakePHP application. By 2016 the front end had aged: jQuery 1.10.2, jQuery UI 1.10.4, the \`jquery.slides\` carousel, \`w2ui\` widgets, \`swfobject\` for Flash content, and a single site-wide stylesheet.

The company wanted a fresher, more modern look to help conversion — a commercial refresh with a designer (April Bargatze) setting the direction. I was the sole developer on it, an employee at the time.`,

    problem: `The site earns money every day. There was no appetite — correctly — for taking it offline for a rebuild, and the CakePHP application itself was structurally fine. So the work had to happen *in place*, on the running site, without a flag day where the old and new couldn’t coexist.

Three things made that harder than a fresh build:

1. **The jQuery stack was load-bearing.** Old plugins assumed old jQuery; bumping the version could break the carousel, the dialogs, the cart interactions.
2. **One stylesheet for every portal.** Any CSS change to make the Air Force pages look modern risked the Navy pages, and vice versa.
3. **Flash content** still existed and had to be replaced with HTML5 as it was retired.`,

    goals: [
      'A visibly more modern storefront, matching the designer’s direction',
      'Bring the JavaScript libraries current without regressing existing behaviour',
      'Responsive images for the mix of desktop and mobile traffic',
      'Contain CSS changes to one portal at a time',
      'Do it page by page on the live site, no downtime',
    ],

    keyDecisions: [
      {
        decision: 'Modernize in place, page by page — no rewrite branch, no big-bang launch',
        rationale:
          'A live revenue site and a one-person effort. The CakePHP app was sound; the problem was the front end. Shipping one modernized page at a time meant every change was small, reversible, and immediately in production where regressions would actually show.',
        tradeoffs:
          'A long tail — the Contact Us pages were still on the old styling a year in — and a stretch where two visual eras coexisted on the site. A rebuild would have been cleaner to look at mid-flight, but riskier and slower to any value.',
      },
      {
        decision: 'Split the single site-wide stylesheet into per-concern and per-portal sheets',
        rationale:
          'One stylesheet meant every edit had site-wide blast radius. Splitting it — shared base, then per-portal overrides — let me restyle the Air Force storefront without touching the Navy one, and let each page load only the CSS it needed.',
        tradeoffs:
          'Some rule duplication across portals, more files to manage, and an include/build story to keep straight. Worth it for being able to change one portal without holding my breath about the others.',
      },
      {
        decision: 'Upgrade jQuery by replacing what breaks, not by pinning',
        rationale:
          'Rather than freeze jQuery to keep old plugins alive, I audited what depended on it and moved forward: `jquery.slides` (unmaintained) was replaced with `slick`, and the rest was brought up to jQuery 2.2.4 / jQuery UI 1.12.1. The archive shows this landing between June and October 2017.',
        tradeoffs:
          'More up-front work than a version pin, and each replacement (the carousel especially) was its own small migration with its own testing.',
      },
    ],

    implementation: `The modernized storefront (visible in the October 2017 archive capture of \`/AirForce\`) runs jQuery 2.2.4, jQuery UI 1.12.1, \`slick\` for the carousel, \`picturefill\` for responsive images, and \`balancetext\` for headline wrapping — up from jQuery 1.10.2 / \`jquery.slides\` in the 2015 capture. \`w2ui\` stayed; it wasn’t in the way.

Each portal page was reworked against the designer’s direction, its markup updated for the new styling, and its stylesheet needs pulled out of the monolith into the split structure. Flash pieces were rebuilt in HTML5 as they were retired — a company decision on the retirement, my implementation of the replacement.`,

    challenges: `**Two eras on one site.** For months the storefront had modernized pages next to un-modernized ones. Keeping shared components (header, cart, footer) working and looking acceptable across both was ongoing.

**The carousel swap.** \`jquery.slides\` → \`slick\` wasn’t a drop-in — different markup, different options, different callbacks — and it was on the most-trafficked pages.

**No staging parity I fully controlled.** Working on a live CakePHP app as one developer meant testing changes carefully and shipping in small increments rather than relying on a full staging mirror.`,

    results: `The public storefront was brought current — measurable from the Internet Archive: jQuery 1.10.2 → 2.2.4, jQuery UI 1.10.4 → 1.12.1, \`jquery.slides\` → \`slick\`, \`picturefill\` added, between the 2015 and October-2017 \`/AirForce\` captures. The site stayed live throughout and is still running today, further evolved since.

I have no data on whether the refresh moved conversion — that wasn’t shared with me.`,

    whatIdChange: `**Set a finish line for the tail.** The page-by-page approach was right, but the last pages (Contact Us) lingered on the old styling far too long. A short, scheduled sprint to close out the stragglers would have ended the two-eras period sooner.

**Write down the stylesheet architecture.** The split worked, but it lived mostly in my head. A one-page note on which sheet owns what would have made it safe for the next person to touch — and, given I have no retained files, would have made this write-up less reliant on memory.`,

    links: [
      {
        label: 'Before — the AirForce storefront in 2015 (Internet Archive)',
        url: 'https://web.archive.org/web/20150718080457/http://mcmguides.com/AirForce',
        kind: 'archive',
      },
      {
        label: 'After — modernized, October 2017 (Internet Archive)',
        url: 'https://web.archive.org/web/20171023004337/http://mcmguides.com/AirForce',
        kind: 'archive',
      },
      { label: 'The storefront today', url: 'https://mcmguides.com/AirForce', kind: 'live' },
    ],
  },
  featured: true,
});
