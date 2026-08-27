import * as v from 'valibot';

/**
 * Domain model for portfolio content. Designed against the real work inventory
 * (`inventory/projects.md`): the McMillan and AP Logic redesigns (evidence is
 * Wayback-only, multi-stage site lineage, "what I did / didn't") and Praxis Kit
 * (a published npm package). Presentation- and storage-agnostic — no React,
 * no database.
 */

/**
 * How well-supported a factual claim is. Historical projects mix all three:
 * source in hand (confirmed), details read off an archived page (inferred), and
 * things remembered but not evidenced (recollection).
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
  kind: v.picklist(['repo', 'package', 'live', 'archive', 'writeup', 'other']),
});
export type Link = v.InferOutput<typeof LinkSchema>;

/** ISO year or year-month, e.g. `"2014"` or `"2014-06"`. */
export const YearMonthSchema = v.pipe(v.string(), v.regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/u));

/** ISO calendar date, e.g. `"2014-06-21"`. Used for archive capture dates. */
export const IsoDateSchema = v.pipe(v.string(), v.isoDate());

/** URL-safe kebab-case identifier, unique per project. */
export const SlugSchema = v.pipe(v.string(), v.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u));

/**
 * When the work happened. `end: null` means ongoing. `approximate` flags a
 * fuzzy range; `note` carries phrasing the dates can't ("3-month contract",
 * "phased, page by page").
 */
export const PeriodSchema = v.object({
  start: YearMonthSchema,
  end: v.nullable(YearMonthSchema),
  approximate: v.optional(v.boolean()),
  note: v.optional(v.string()),
});
export type Period = v.InferOutput<typeof PeriodSchema>;

/**
 * Whether a project may be shown, and any caveat. Mirrors the inventory:
 * `public` (already public / cleared), `likely` (no known blocker, not formally
 * checked), `needs-review` (a term or permission to confirm first), `private`
 * (inventory only — never rendered).
 */
export const PublishabilitySchema = v.object({
  status: v.picklist(['public', 'likely', 'needs-review', 'private']),
  notes: v.optional(v.string()),
});
export type Publishability = v.InferOutput<typeof PublishabilitySchema>;
