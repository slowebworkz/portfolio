import * as v from 'valibot';

import { ClaimConfidenceSchema } from './common.ts';

/**
 * One stage in a site's history — used by the redesign projects, where "before"
 * and "after" are points on a longer timeline (e.g. table layout → WordPress +
 * flexslider → the redesign). Lets a case study show the work in context
 * without overclaiming what the user personally did.
 */
export const LineageStageSchema = v.object({
  /** Rough period label, e.g. `"≤ 2012"`, `"early–mid 2013"`, `"2017-10"`. */
  period: v.pipe(v.string(), v.minLength(1)),
  label: v.pipe(v.string(), v.minLength(1)),
  description: v.pipe(v.string(), v.minLength(1)),
  /** Did the work in this stage belong to the portfolio owner? */
  mine: v.boolean(),
  confidence: ClaimConfidenceSchema,
  /** Optional id of an `Evidence` item illustrating this stage. */
  evidenceId: v.optional(v.string()),
});
export type LineageStage = v.InferOutput<typeof LineageStageSchema>;
