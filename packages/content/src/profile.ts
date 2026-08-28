import { parseProfile, type Profile } from '@portfolio/data';

// TODO: LinkedIn URL (Karsten to supply) and whether to publish an email
// address / résumé PDF. Contact currently points at GitHub + the Toptal résumé.

export const profile: Profile = parseProfile({
  name: 'Karsten Huehn',
  tagline: 'Software developer — 20+ years building for the web',
  location: 'San Luis Obispo, California',
  bio: 'Front-end-focused software developer with over twenty years of experience — HTML, CSS, JavaScript and TypeScript, SVG, and the tooling around them. Lately I build developer tooling: Praxis Kit, a framework-agnostic system for enforcing UI correctness. Most of my client work is under NDA, so this site shows the pieces I can — in depth — and describes the rest.',
  links: [
    { label: 'GitHub', url: 'https://github.com/slowebworkz', kind: 'github' },
    {
      label: 'Toptal résumé',
      url: 'https://www.toptal.com/developers/resume/karsten-huehn',
      kind: 'resume',
    },
  ],
  credentials: [
    {
      label: 'Top 3% — vetted member of the Toptal network',
      issuer: 'Toptal',
      url: 'https://www.toptal.com/developers/resume/karsten-huehn',
    },
  ],
});
