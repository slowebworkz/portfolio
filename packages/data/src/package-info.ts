import * as v from 'valibot';

/**
 * Metadata for a project that is a published package (e.g. Praxis Kit on npm).
 * Distinct from a client site: the artifact itself is public and inspectable.
 */
export const PackageInfoSchema = v.object({
  /** Registry package name, e.g. `"praxis-kit"`. */
  name: v.pipe(v.string(), v.minLength(1)),
  registry: v.picklist(['npm', 'jsr', 'other']),
  registryUrl: v.pipe(v.string(), v.url()),
  repoUrl: v.pipe(v.string(), v.url()),
  license: v.pipe(v.string(), v.minLength(1)),
  /** Latest version at the time the content was written. */
  version: v.pipe(v.string(), v.minLength(1)),
  /** Notable subpath exports / entry points, for architecture callouts. */
  entryPoints: v.optional(v.array(v.pipe(v.string(), v.minLength(1)))),
  downloads: v.optional(
    v.object({
      weekly: v.optional(v.number()),
      monthly: v.optional(v.number()),
      asOf: v.optional(v.string()),
    }),
  ),
});
export type PackageInfo = v.InferOutput<typeof PackageInfoSchema>;
