import { experience, profile } from '@portfolio/content';
import { Link } from 'react-router';

import { ToptalBadge } from '../components/badges/toptal/Badge.tsx';
import { formatPeriod } from '../format/period.ts';

export function About() {
  const otherCredentials = (profile.credentials ?? []).filter(
    (credential) => credential.issuer !== 'Toptal',
  );

  return (
    <>
      <section>
        <h1>About</h1>
        <p className="lede">{profile.tagline}</p>
        {profile.bio.split('\n\n').map((para) => (
          <p key={para.slice(0, 32)}>{para}</p>
        ))}
        {profile.location && <p className="meta">{profile.location}</p>}
      </section>

      <section aria-labelledby="credentials-heading">
        <h2 id="credentials-heading">Credentials</h2>
        <ToptalBadge />
        {otherCredentials.length > 0 && (
          <ul>
            {otherCredentials.map((credential) => (
              <li key={credential.label}>
                <a href={credential.url}>{credential.label}</a> — {credential.issuer}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <ol className="timeline">
          {experience.map((role) => (
            <li key={`${role.organization}-${role.period.start}`}>
              <p className="timeline__head">
                <strong>{role.title}</strong>
                {' · '}
                {role.named ? role.organization : <em>{role.organization}</em>}
                {' · '}
                <span className="meta">{formatPeriod(role.period)}</span>
              </p>
              {role.domain && <p className="meta">{role.domain}</p>}
              <p>{role.summary}</p>
              {role.relatedProject && (
                <p>
                  <Link to={`/work/${role.relatedProject}`}>See the project →</Link>
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
