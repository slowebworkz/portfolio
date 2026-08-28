import * as v from 'valibot';

import { ProjectSchema, type Project } from './project.js';

/** Parse and validate an unknown value as a `Project`; throws on failure. */
export function parseProject(input: unknown): Project {
  const project = v.parse(ProjectSchema, input);
  checkReferentialIntegrity(project);
  return project;
}

/** Non-throwing schema validation; does not run the integrity checks. */
export function safeParseProject(input: unknown): v.SafeParseResult<typeof ProjectSchema> {
  return v.safeParse(ProjectSchema, input);
}

/**
 * Cross-field checks the schema can't express: every `lineage[].evidenceId`
 * must name a real `evidence[].id`, and evidence ids must be unique.
 */
export function checkReferentialIntegrity(project: Project): void {
  const ids = new Set<string>();
  for (const item of project.evidence) {
    if (ids.has(item.id)) {
      throw new Error(`Project "${project.slug}": duplicate evidence id "${item.id}"`);
    }
    ids.add(item.id);
  }
  for (const stage of project.lineage ?? []) {
    if (stage.evidenceId !== undefined && !ids.has(stage.evidenceId)) {
      throw new Error(
        `Project "${project.slug}": lineage stage "${stage.label}" references unknown evidence id "${stage.evidenceId}"`,
      );
    }
  }
}
