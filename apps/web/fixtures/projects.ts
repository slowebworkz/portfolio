import { parseProject, type Project } from '@portfolio/data';

/**
 * PLACEHOLDER fixture data — invented, not real portfolio work. It exists so the
 * app shell has something typed to render before Phase 3 produces real content
 * in `@portfolio/content`. Each entry is run through `parseProject` so the shell
 * also exercises the `@portfolio/data` schema.
 */
const raw: unknown[] = [
  {
    slug: 'component-library',
    title: 'Component Library',
    summary: 'A typed, tree-shakeable React component library.',
    category: 'open-source',
    timeline: { start: '2023', end: null },
    role: 'Author and maintainer',
    organization: null,
    technologies: [
      { name: 'TypeScript', confidence: 'confirmed' },
      { name: 'React', confidence: 'confirmed' },
    ],
    links: [{ label: 'Source', url: 'https://github.com/example/lib', kind: 'repo' }],
    media: [],
    evidence: [
      {
        id: 'src',
        kind: 'source',
        label: 'Repository',
        confidence: 'confirmed',
        url: 'https://github.com/example/lib',
      },
    ],
    publishability: 'public',
    caseStudy: {
      summary: 'Why a hand-rolled library instead of reaching for an off-the-shelf kit.',
      whatIdChange: 'Start the visual-regression suite earlier.',
    },
    featured: true,
  },
  {
    slug: 'mud-engine',
    title: 'MUD / Game Engine',
    summary: 'A text-driven multiplayer game server.',
    category: 'personal',
    timeline: { start: '2022-01', end: '2023-06' },
    role: 'Sole developer',
    organization: null,
    technologies: [
      { name: 'Node.js', confidence: 'confirmed' },
      { name: 'WebSockets', confidence: 'confirmed' },
    ],
    links: [],
    media: [],
    evidence: [
      {
        id: 'recollection',
        kind: 'account',
        label: 'Developer notes',
        confidence: 'recollection',
        detail: 'Architecture reconstructed from memory and old design docs.',
      },
    ],
    publishability: 'public',
    caseStudy: null,
    featured: false,
  },
];

export const projects: Project[] = raw.map((entry) => parseProject(entry));

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
