import * as v from 'valibot';

import {
  LinkSchema,
  PeriodSchema,
  PublishabilitySchema,
  SlugSchema,
  TechnologySchema,
} from './common.ts';
import { CaseStudySchema } from './case-study.ts';
import { EvidenceSchema } from './evidence.ts';
import { LineageStageSchema } from './lineage.ts';
import { PackageInfoSchema } from './package-info.ts';

/** How the work was done. */
export const ProjectCategorySchema = v.picklist([
  'employment',
  'contract',
  'open-source',
  'personal',
  'experiment',
]);
export type ProjectCategory = v.InferOutput<typeof ProjectCategorySchema>;

/** Where the work is now. */
export const ProjectStatusSchema = v.picklist(['active', 'live', 'gone', 'archived', 'private']);
export type ProjectStatus = v.InferOutput<typeof ProjectStatusSchema>;

export const OrganizationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  kind: v.picklist(['employer', 'client']),
  location: v.optional(v.string()),
});
export type Organization = v.InferOutput<typeof OrganizationSchema>;

/** What the portfolio owner did — and, deliberately, what they did not. */
export const ContributionsSchema = v.object({
  did: v.array(v.pipe(v.string(), v.minLength(1))),
  didNot: v.optional(v.array(v.pipe(v.string(), v.minLength(1)))),
});
export type Contributions = v.InferOutput<typeof ContributionsSchema>;

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
  status: ProjectStatusSchema,
  period: PeriodSchema,
  role: v.pipe(v.string(), v.minLength(1)),
  /** `null` for personal / open-source work. */
  organization: v.nullable(OrganizationSchema),
  /** Why the work was undertaken — the case-study hook. */
  motivation: v.optional(v.string()),
  technologies: v.array(TechnologySchema),
  contributions: v.optional(ContributionsSchema),
  /** Multi-stage history — used by the redesign projects. */
  lineage: v.optional(v.array(LineageStageSchema)),
  /** Set when the project is itself a published package. */
  package: v.optional(PackageInfoSchema),
  links: v.array(LinkSchema),
  media: v.optional(v.array(MediaItemSchema)),
  evidence: v.array(EvidenceSchema),
  /** How much of the original work the owner still has. */
  retainedArtifacts: v.picklist(['none', 'partial', 'full']),
  /** Where evidence and recollection diverge, or a claim is deliberately soft. */
  caveats: v.optional(v.array(v.pipe(v.string(), v.minLength(1)))),
  publishability: PublishabilitySchema,
  caseStudy: v.nullable(CaseStudySchema),
  featured: v.boolean(),
});
export type Project = v.InferOutput<typeof ProjectSchema>;
