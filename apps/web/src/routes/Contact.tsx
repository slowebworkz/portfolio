import { profile } from '@portfolio/content';

export function Contact() {
  return (
    <section>
      <h1>Contact</h1>
      <p className="lede">
        {profile.name}
        {profile.location ? ` · ${profile.location}` : ''}
      </p>
      <ul>
        {profile.email && (
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
        )}
        {profile.links.map((link) => (
          <li key={link.url}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
      <p>Most of my client work is under NDA. For the full history, see the résumé.</p>
    </section>
  );
}
