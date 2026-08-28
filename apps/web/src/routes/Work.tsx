import { projects } from '@portfolio/content';
import { Link } from 'react-router';

import { formatPeriod } from '../format/period.ts';

export function Work() {
  const shown = projects.filter((project) => project.publishability.status !== 'private');

  return (
    <section>
      <h1>Work</h1>
      <ul className="card-list">
        {shown.map((project) => (
          <li key={project.slug}>
            <h2>
              <Link to={`/work/${project.slug}`}>{project.title}</Link>
            </h2>
            <p className="meta">
              {project.role} · {formatPeriod(project.period)}
            </p>
            <p>{project.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
