import { parseExperience, type Experience } from '@portfolio/data';

/**
 * Résumé-style timeline. Full-time roles and their descriptions come from the
 * public Toptal résumé (toptal.com/developers/resume/karsten-huehn) — already
 * cleared for disclosure. Contract work is aggregated and not named, matching
 * how that résumé handles it.
 *
 * Newest first — this is display order.
 */
const raw: unknown[] = [
  {
    organization: 'Independent',
    named: false,
    title: 'Open-source & developer tooling',
    period: { start: '2023', end: null, note: 'After FastSpring' },
    kind: 'independent',
    domain: 'developer tooling, UI frameworks',
    summary:
      'Building Praxis Kit — a contract-based, framework-agnostic system that validates component composition, HTML semantics, and accessibility at runtime. Published on npm, MIT-licensed.',
    stack: ['TypeScript', 'ESLint plugin API', 'TypeScript language-service plugin API', 'tsup'],
    relatedProject: 'praxis-kit',
    publishability: { status: 'public' },
  },
  {
    organization: 'FastSpring',
    named: true,
    title: 'Senior Front-end Engineer',
    period: { start: '2022', end: '2023' },
    kind: 'full-time',
    domain: 'e-commerce / SaaS billing',
    summary:
      'Engineering lead on a Vue 3 web-components project — resolved stability issues, improved performance, and ran design and code reviews to spread best practices. Gathered user feedback to drive iterative component improvements.',
    stack: ['Vue 3', 'Web Components', 'JavaScript (ES6)'],
    publishability: { status: 'public', notes: 'From the public Toptal résumé.' },
  },
  {
    organization: 'Intellimize',
    named: true,
    title: 'Senior Solutions Engineer',
    period: { start: '2021', end: '2022' },
    kind: 'full-time',
    domain: 'web personalization / A/B testing',
    summary:
      'Turned customer requirements into personalization variations in the Intellimize platform — coded and shipped A/B tests on high-traffic pages and worked across teams to design technical solutions.',
    stack: ['JavaScript', 'jQuery', 'React', 'Angular', 'JSON', 'XML'],
    publishability: { status: 'public', notes: 'From the public Toptal résumé.' },
  },
  {
    organization: 'Icomera North America',
    named: true,
    title: 'Software Engineer',
    period: { start: '2020', end: '2020' },
    kind: 'full-time',
    domain: 'transit connectivity',
    summary:
      'Migrated a PHP codebase from 5.4 to 7.2 for modern-standards compatibility, with testing and debugging to resolve incompatibilities, and drafted a roadmap for moving the codebase toward React.',
    stack: ['PHP 7', 'JavaScript', 'React'],
    publishability: { status: 'public', notes: 'From the public Toptal résumé.' },
  },
  {
    organization: 'McMillan Study Guides',
    named: true,
    title: 'Software Developer',
    period: { start: '2016', end: '2019' },
    kind: 'full-time',
    domain: 'education / e-learning',
    summary:
      'Modernized the public storefront — responsive layout and mobile navigation — on the existing CakePHP application, fixed bugs across existing software, built a new learning-management system in Ember.js, and took part in code reviews.',
    stack: ['JavaScript (ES6)', 'CakePHP', 'Ember.js', 'TypeScript', 'Sass', 'Less', 'Gulp'],
    relatedProject: 'mcmillan-study-guides-redesign',
    publishability: { status: 'public', notes: 'From the public Toptal résumé.' },
  },
  {
    organization: 'Independent',
    named: false,
    title: 'Front-end developer — contract & freelance',
    period: {
      start: '2003',
      end: '2016',
      approximate: true,
      note: 'Career start after Cuesta College; span to confirm.',
    },
    kind: 'contract',
    domain: 'marketing sites, CMS builds, front-end production',
    summary:
      'Contract and freelance front-end work for a range of clients — marketing sites, CMS builds (WordPress, Drupal, Joomla), enterprise CMS (HP TeamSite), and PSD-to-HTML production. Most engagements are covered by NDA; the AP Logic redesign (2013) is the one shown here in detail.',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'WordPress', 'Drupal', 'SVG'],
    relatedProject: 'ap-logic-redesign',
    publishability: {
      status: 'likely',
      notes: 'Aggregated and unnamed; matches how the public résumé handles contract work.',
    },
  },
];

export const experience: readonly Experience[] = raw.map((entry) => parseExperience(entry));
