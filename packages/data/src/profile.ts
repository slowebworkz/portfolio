import * as v from 'valibot';

/** A link on the profile — the small, deliberate set, not a badge wall. */
export const ProfileLinkSchema = v.object({
  label: v.pipe(v.string(), v.minLength(1)),
  url: v.pipe(v.string(), v.url()),
  kind: v.picklist(['github', 'linkedin', 'resume', 'email', 'other']),
});
export type ProfileLink = v.InferOutput<typeof ProfileLinkSchema>;

/** A third-party credential worth showing (e.g. a vetted-network membership). */
export const CredentialSchema = v.object({
  label: v.pipe(v.string(), v.minLength(1)),
  issuer: v.pipe(v.string(), v.minLength(1)),
  url: v.pipe(v.string(), v.url()),
  note: v.optional(v.string()),
});
export type Credential = v.InferOutput<typeof CredentialSchema>;

/** The person. One per site. */
export const ProfileSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  /** One line under the name. */
  tagline: v.pipe(v.string(), v.minLength(1)),
  location: v.optional(v.string()),
  /** Markdown paragraph(s). */
  bio: v.pipe(v.string(), v.minLength(1)),
  email: v.optional(v.pipe(v.string(), v.email())),
  links: v.array(ProfileLinkSchema),
  credentials: v.optional(v.array(CredentialSchema)),
});
export type Profile = v.InferOutput<typeof ProfileSchema>;
