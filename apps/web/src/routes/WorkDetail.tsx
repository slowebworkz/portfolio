import { Link, useParams } from 'react-router';

import { projectBySlug } from '../../fixtures/projects.ts';
import { formatPeriod } from '../format/period.ts';

export function WorkDetail() {
  const { slug } = useParams();
  const project = slug ? projectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <p>
          No project matches <code>{slug}</code>. <Link to="/work">Back to work</Link>.
        </p>
      </section>
    );
  }

  return (
    <article>
      <p>
        <Link to="/work">← Work</Link>
      </p>
      <h1>{project.title}</h1>
      <p className="lede">{project.summary}</p>

      <dl className="detail-meta">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>{formatPeriod(project.timeline)}</dd>
        </div>
        {project.organization && (
          <div>
            <dt>Organization</dt>
            <dd>{project.organization}</dd>
          </div>
        )}
        <div>
          <dt>Technologies</dt>
          <dd>{project.technologies.map((technology) => technology.name).join(', ')}</dd>
        </div>
      </dl>

      {project.caseStudy ? (
        <section aria-labelledby="case-study-heading">
          <h2 id="case-study-heading">Case study</h2>
          <p>{project.caseStudy.summary}</p>
          {project.caseStudy.whatIdChange && (
            <>
              <h3>What I&rsquo;d change</h3>
              <p>{project.caseStudy.whatIdChange}</p>
            </>
          )}
        </section>
      ) : (
        <p>No case study yet.</p>
      )}

      <section aria-labelledby="evidence-heading">
        <h2 id="evidence-heading">Evidence</h2>
        <ul>
          {project.evidence.map((item) => (
            <li key={item.id}>
              {item.label} <span className="tag">{item.kind}</span>{' '}
              <span className="tag">{item.confidence}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
