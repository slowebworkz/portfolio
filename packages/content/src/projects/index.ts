import type { Project } from '@portfolio/data';

import { apLogicRedesign } from './ap-logic-redesign.js';
import { mcmillanRedesign } from './mcmillan-redesign.js';
import { praxisKit } from './praxis-kit.js';

/** All authored projects. Order here is not display order. */
export const projects: readonly Project[] = [praxisKit, mcmillanRedesign, apLogicRedesign];

const bySlug = new Map(projects.map((project) => [project.slug, project]));

export function getProject(slug: string): Project | undefined {
  return bySlug.get(slug);
}

/** Projects marked for prominent display, publishable, in no particular order. */
export function getFeaturedProjects(): Project[] {
  return projects.filter(
    (project) => project.featured && project.publishability.status !== 'private',
  );
}
