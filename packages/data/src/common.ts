import * as v from 'valibot';

/**
 * PROVISIONAL. This domain model is a first draft sketched from the project
 * plan's illustrative shapes. It will be reworked against the real work
 * inventory (`inventory/projects.md`) in Phase 3 — expect churn in the field
 * set, the evidence variants, and the case-study structure.
 */

/**
 * How well-supported a factual claim is. Historical projects in particular mix
 * all three: source in hand (confirmed), details read off an archived page
 * (inferred), and things remembered but not evidenced (recollection).
 */
export const ClaimConfidenceSchema = v.picklist(['confirmed', 'inferred', 'recollection']);
export type ClaimConfidence = v.InferOutput<typeof ClaimConfidenceSchema>;

/** A technology used on a project, tagged with how sure we are it was used. */
export const TechnologySchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  confidence: ClaimConfidenceSchema,
  note: v.optional(v.string()),
});
export type Technology = v.InferOutput<typeof TechnologySchema>;

/** An outbound link attached to a project or case study. */
export const LinkSchema = v.object({
  label: v.pipe(v.string(), v.minLength(1)),
  url: v.pipe(v.string(), v.url()),
  kind: v.picklist(['repo', 'live', 'writeup', 'other']),
});
export type Link = v.InferOutput<typeof LinkSchema>;

/** ISO year or year-month, e.g. `"2014"` or `"2014-06"`. */
export const YearMonthSchema = v.pipe(v.string(), v.regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/u));

/** ISO calendar date, e.g. `"2014-06-21"`. Used for archive capture dates. */
export const IsoDateSchema = v.pipe(v.string(), v.isoDate());

/** URL-safe kebab-case identifier, unique per project. */
export const SlugSchema = v.pipe(v.string(), v.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u));
