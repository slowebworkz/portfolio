import * as v from 'valibot';

import { ProjectSchema, type Project } from './project.js';

/** Parse and validate an unknown value as a `Project`; throws on failure. */
export function parseProject(input: unknown): Project {
  return v.parse(ProjectSchema, input);
}

/** Non-throwing variant; returns valibot's result object. */
export function safeParseProject(input: unknown): v.SafeParseResult<typeof ProjectSchema> {
  return v.safeParse(ProjectSchema, input);
}
