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
    { name: 'slick carousel', confidence: 'inferred' },
    { name: 'picturefill', confidence: 'inferred' },
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
      'The earlier table-layout → div conversion — that predated me',
      'Own the visual design — I implemented the designer’s direction',
    ],
  },
  lineage: [
    {
      period: '≤ 2012',
      label: 'Table-based layout',
      description: 'Classic HTML table layout on the marketing pages.',
      mine: false,
      confidence: 'inferred',
      evidenceId: 'context-2014',
    },
    {
      period: '2015 – 2016',
      label: 'Div-based but dated',
      description:
        'A single site.css, jQuery 1.11, Flash via swfobject, jquery.slides. This is what I inherited.',
      mine: false,
      confidence: 'inferred',
      evidenceId: 'before',
    },
    {
      period: '~2017-10',
      label: 'Modernized',
      description:
        'jQuery 2.2.4 / jQuery UI 1.12, slick, picturefill, split stylesheets; Flash gone.',
      mine: true,
      confidence: 'inferred',
      evidenceId: 'after',
    },
  ],
  links: [{ label: 'Live site', url: 'https://mcmguides.com/AirForce', kind: 'live' }],
  evidence: [
    {
      id: 'context-2014',
      kind: 'wayback',
      label: 'Table-based era (predates my work)',
      confidence: 'confirmed',
      role: 'context',
      originalUrl: 'http://mcmguides.com/',
      archiveUrl: 'https://web.archive.org/web/20140517212708/http://mcmguides.com/',
      capturedAt: '2014-05-17',
    },
    {
      id: 'before',
      kind: 'wayback',
      label: 'The site as I inherited it, 2016',
      confidence: 'inferred',
      role: 'before',
      originalUrl: 'http://mcmguides.com/',
      archiveUrl: 'https://web.archive.org/web/20161007132557/http://mcmguides.com/',
      capturedAt: '2016-10-07',
    },
    {
      id: 'after',
      kind: 'wayback',
      label: 'Modernized, 2017',
      confidence: 'inferred',
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
    'The finish date is not pinned: the Contact Us pages were still un-modernized in June 2017 and the next archive capture is 2019. I place the finish in 2017.',
    'Flash removal was the company’s decision; the HTML5 implementation that replaced it was mine.',
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
