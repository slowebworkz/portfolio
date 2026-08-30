import * as v from 'valibot';

import { ClaimConfidenceSchema, IsoDateSchema } from './common.ts';

/**
 * Evidence backing a project or a claim about it. For much of the historical
 * work the public archive is the *only* citable evidence — nothing was
 * retained. The archive is evidence, not a licence to republish an old site.
 */

/**
 * What an evidence item shows, relative to the work: the state before it, the
 * result after it, earlier `context` in the site's lineage, or `supporting`
 * material (a repo, a record).
 */
export const EvidenceRoleSchema = v.picklist(['before', 'after', 'context', 'supporting']);
export type EvidenceRole = v.InferOutput<typeof EvidenceRoleSchema>;

const base = {
  /** Stable id, unique within the project (referenced from case-study prose). */
  id: v.pipe(v.string(), v.minLength(1)),
  label: v.pipe(v.string(), v.minLength(1)),
  confidence: ClaimConfidenceSchema,
  role: v.optional(EvidenceRoleSchema),
};

/** An Internet Archive / Wayback Machine capture. */
export const WaybackEvidenceSchema = v.object({
  ...base,
  kind: v.literal('wayback'),
  originalUrl: v.pipe(v.string(), v.url()),
  archiveUrl: v.pipe(v.string(), v.url()),
  capturedAt: IsoDateSchema,
});

/** A source-code repository (optionally pointing at a specific path). */
export const SourceEvidenceSchema = v.object({
  ...base,
  kind: v.literal('source'),
  url: v.pipe(v.string(), v.url()),
  path: v.optional(v.string()),
});

/** A published package listing (npm, etc.). */
export const PackageEvidenceSchema = v.object({
  ...base,
  kind: v.literal('package'),
  url: v.pipe(v.string(), v.url()),
  registry: v.optional(v.string()),
});

/** Any other live URL: the current site, an article, an external screenshot. */
export const LinkEvidenceSchema = v.object({
  ...base,
  kind: v.literal('link'),
  url: v.pipe(v.string(), v.url()),
});

/** A file bundled in the `content` package (screenshot, PDF, exported asset). */
export const ArtifactEvidenceSchema = v.object({
  ...base,
  kind: v.literal('artifact'),
  path: v.pipe(v.string(), v.minLength(1)),
  mediaType: v.optional(v.string()),
});

/** Personal recollection or a contemporary private record (invoice, email). */
export const AccountEvidenceSchema = v.object({
  ...base,
  kind: v.literal('account'),
  detail: v.pipe(v.string(), v.minLength(1)),
});

export const EvidenceSchema = v.variant('kind', [
  WaybackEvidenceSchema,
  SourceEvidenceSchema,
  PackageEvidenceSchema,
  LinkEvidenceSchema,
  ArtifactEvidenceSchema,
  AccountEvidenceSchema,
]);
export type Evidence = v.InferOutput<typeof EvidenceSchema>;
export type EvidenceKind = Evidence['kind'];
