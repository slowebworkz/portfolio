import * as v from 'valibot';

import { ClaimConfidenceSchema, IsoDateSchema } from './common.js';

/**
 * Evidence backing a project or a specific claim about it. The archive is
 * *evidence*, not a licence to republish an old site — see the plan's
 * historical-work section.
 */

const base = {
  /** Stable id, unique within the project (referenced from case-study prose). */
  id: v.pipe(v.string(), v.minLength(1)),
  label: v.pipe(v.string(), v.minLength(1)),
  confidence: ClaimConfidenceSchema,
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
  LinkEvidenceSchema,
  ArtifactEvidenceSchema,
  AccountEvidenceSchema,
]);
export type Evidence = v.InferOutput<typeof EvidenceSchema>;
export type EvidenceKind = Evidence['kind'];
