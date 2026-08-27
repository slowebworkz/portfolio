import * as v from 'valibot';

import { LinkSchema, SlugSchema, TechnologySchema, YearMonthSchema } from './common.js';
import { CaseStudySchema } from './case-study.js';
import { EvidenceSchema } from './evidence.js';

export const ProjectCategorySchema = v.picklist([
  'current',
  'professional',
  'client',
  'personal',
  'open-source',
  'experiment',
]);
export type ProjectCategory = v.InferOutput<typeof ProjectCategorySchema>;

/** What may be shown publicly. `private` entries stay in the inventory only. */
export const PublishabilitySchema = v.picklist([
  'public',
  'anonymized',
  'needs-permission',
  'private',
]);
export type Publishability = v.InferOutput<typeof PublishabilitySchema>;

/** `end: null` means the work is ongoing. */
export const TimelineSchema = v.object({
  start: YearMonthSchema,
  end: v.nullable(YearMonthSchema),
});
export type Timeline = v.InferOutput<typeof TimelineSchema>;

export const MediaItemSchema = v.object({
  /** Path to an asset in the `content` package. */
  path: v.pipe(v.string(), v.minLength(1)),
  alt: v.pipe(v.string(), v.minLength(1)),
  kind: v.picklist(['image', 'video']),
  caption: v.optional(v.string()),
});
export type MediaItem = v.InferOutput<typeof MediaItemSchema>;

export const ProjectSchema = v.object({
  slug: SlugSchema,
  title: v.pipe(v.string(), v.minLength(1)),
  /** One-line positioning statement. */
  summary: v.pipe(v.string(), v.minLength(1)),
  category: ProjectCategorySchema,
  timeline: TimelineSchema,
  role: v.pipe(v.string(), v.minLength(1)),
  /** Client or employer; `null` for personal / open-source work. */
  organization: v.nullable(v.string()),
  technologies: v.array(TechnologySchema),
  links: v.array(LinkSchema),
  media: v.array(MediaItemSchema),
  evidence: v.array(EvidenceSchema),
  publishability: PublishabilitySchema,
  caseStudy: v.nullable(CaseStudySchema),
  featured: v.boolean(),
});
export type Project = v.InferOutput<typeof ProjectSchema>;
