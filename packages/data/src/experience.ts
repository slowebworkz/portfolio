import * as v from 'valibot';

import { PeriodSchema, PublishabilitySchema, SlugSchema } from './common.ts';

/**
 * A role — résumé-style, not a case study. Fills the timeline the detailed
 * projects can't: full-time employment (named) and contract work (often
 * anonymized, since clients don't want specifics discussed).
 */
export const ExperienceSchema = v.object({
  /** Employer / client, or a stand-in like "Independent" when `named` is false. */
  organization: v.pipe(v.string(), v.minLength(1)),
  /** Whether `organization` is the real name or a placeholder. */
  named: v.boolean(),
  title: v.pipe(v.string(), v.minLength(1)),
  period: PeriodSchema,
  kind: v.picklist(['full-time', 'contract', 'independent']),
  /** e.g. "e-commerce billing", "transit connectivity". */
  domain: v.optional(v.string()),
  /** Markdown; NDA-safe. Keep to publicly disclosed / non-proprietary detail. */
  summary: v.pipe(v.string(), v.minLength(1)),
  highlights: v.optional(v.array(v.pipe(v.string(), v.minLength(1)))),
  /** Generic tech names — no confidence tags here (this isn't a claim record). */
  stack: v.optional(v.array(v.pipe(v.string(), v.minLength(1)))),
  /** Slug of a `Project` that goes deeper on part of this role. */
  relatedProject: v.optional(SlugSchema),
  publishability: PublishabilitySchema,
});
export type Experience = v.InferOutput<typeof ExperienceSchema>;
