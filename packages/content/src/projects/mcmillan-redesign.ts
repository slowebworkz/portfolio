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
  caseStudy: null,
  featured: true,
});
