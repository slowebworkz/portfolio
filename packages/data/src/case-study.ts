import * as v from 'valibot';

import { LinkSchema } from './common.js';

/**
 * A key architectural or technical decision, with its reasoning. Kept as
 * structured data (not just prose) so it can be surfaced on its own.
 */
export const DecisionSchema = v.object({
  decision: v.pipe(v.string(), v.minLength(1)),
  rationale: v.pipe(v.string(), v.minLength(1)),
  tradeoffs: v.optional(v.string()),
});
export type Decision = v.InferOutput<typeof DecisionSchema>;

/**
 * Long-form case study for a project. Section fields hold plain strings
 * (Markdown source) — the `content` package decides whether that's MDX; `data`
 * stays framework-neutral.
 *
 * Only `summary` is required. The rest are optional so a writeup can grow into
 * the structure over time. `role` and `technologies` are not repeated here —
 * they live on the `Project`.
 */
export const CaseStudySchema = v.object({
  summary: v.pipe(v.string(), v.minLength(1)),
  context: v.optional(v.string()),
  problem: v.optional(v.string()),
  goals: v.optional(v.array(v.string())),
  architecture: v.optional(v.string()),
  keyDecisions: v.optional(v.array(DecisionSchema)),
  implementation: v.optional(v.string()),
  challenges: v.optional(v.string()),
  results: v.optional(v.string()),
  /** Deliberately named after the plan: what I would change, done differently. */
  whatIdChange: v.optional(v.string()),
  links: v.optional(v.array(LinkSchema)),
});
export type CaseStudy = v.InferOutput<typeof CaseStudySchema>;
