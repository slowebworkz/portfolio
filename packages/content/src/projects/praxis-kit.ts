import { parseProject, type Project } from '@portfolio/data';

export const praxisKit: Project = parseProject({
  slug: 'praxis-kit',
  title: 'Praxis Kit',
  summary:
    'A contract-based, framework-agnostic UI system that validates component composition, HTML semantics, and accessibility at runtime — not just in docs or types.',
  category: 'open-source',
  status: 'active',
  period: { start: '2026-05', end: null },
  role: 'Creator and sole author',
  organization: null,
  motivation:
    'TypeScript tells you whether an API is valid. Nothing tells you whether the resulting UI is valid. Praxis makes composition, HTML semantics, and ARIA requirements executable contracts, so invalid UI fails in development instead of shipping as a latent bug.',
  technologies: [
    { name: 'TypeScript', confidence: 'confirmed' },
    { name: 'tsup', confidence: 'confirmed' },
    { name: 'ESLint plugin API', confidence: 'confirmed' },
    { name: 'TypeScript language-service plugin API', confidence: 'confirmed' },
  ],
  contributions: {
    did: [
      'Designed the contract model — valid hierarchies, required children, permitted parents, ARIA requirements',
      'Built polymorphic adapters for React, Vue, Solid, Svelte, Lit, Preact, and Web Components',
      'Wrote the runtime validator, the ESLint plugin, a TypeScript language-service plugin, a Vite plugin, and migration codemods',
      'Packaged it as one npm module with ~25 subpath exports',
    ],
  },
  package: {
    name: 'praxis-kit',
    registry: 'npm',
    registryUrl: 'https://www.npmjs.com/package/praxis-kit',
    repoUrl: 'https://github.com/slowebworkz/praxis-kit',
    license: 'MIT',
    version: '7.8.1',
    entryPoints: [
      'praxis-kit/contract',
      'praxis-kit/react',
      'praxis-kit/vue',
      'praxis-kit/eslint',
      'praxis-kit/ts-plugin',
      'praxis-kit/vite-plugin',
      'praxis-kit/codemod',
    ],
    downloads: { weekly: 116, monthly: 1248, asOf: '2026-08-26' },
  },
  links: [
    { label: 'Source', url: 'https://github.com/slowebworkz/praxis-kit', kind: 'repo' },
    { label: 'npm', url: 'https://www.npmjs.com/package/praxis-kit', kind: 'package' },
  ],
  evidence: [
    {
      id: 'repo',
      kind: 'source',
      label: 'Public repository — full source and history',
      confidence: 'confirmed',
      role: 'supporting',
      url: 'https://github.com/slowebworkz/praxis-kit',
    },
    {
      id: 'npm',
      kind: 'package',
      label: 'Published package',
      confidence: 'confirmed',
      role: 'supporting',
      url: 'https://www.npmjs.com/package/praxis-kit',
      registry: 'npm',
    },
  ],
  retainedArtifacts: 'full',
  publishability: { status: 'public', notes: 'Own work, already public, MIT.' },
  caseStudy: null,
  featured: true,
});
