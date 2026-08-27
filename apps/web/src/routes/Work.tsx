import { Link } from 'react-router';

import { projects } from '../../fixtures/projects.ts';
import { formatPeriod } from '../format/period.ts';

export function Work() {
  return (
    <section>
      <h1>Work</h1>
      <p className="lede">Placeholder entries — real projects land once the inventory is done.</p>
      <ul className="card-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <h2>
              <Link to={`/work/${project.slug}`}>{project.title}</Link>
            </h2>
            <p className="meta">
              {project.role} · {formatPeriod(project.timeline)}
            </p>
            <p>{project.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
