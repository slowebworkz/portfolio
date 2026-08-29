import { getProject } from '@portfolio/content';
import { Link, useParams } from 'react-router';

import { CaseStudy } from '../components/CaseStudy.tsx';
import { formatPeriod } from '../format/period.ts';

export function WorkDetail() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project || project.publishability.status === 'private') {
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
          <dd>{formatPeriod(project.period)}</dd>
        </div>
        {project.organization && (
          <div>
            <dt>{project.organization.kind === 'employer' ? 'Employer' : 'Client'}</dt>
            <dd>{project.organization.name}</dd>
          </div>
        )}
        <div>
          <dt>Technologies</dt>
          <dd>{project.technologies.map((technology) => technology.name).join(', ')}</dd>
        </div>
      </dl>

      {project.package && (
        <p className="meta">
          <code>{project.package.name}</code> v{project.package.version} · {project.package.license}
          {project.package.downloads?.weekly != null && (
            <>
              {' · '}
              {project.package.downloads.weekly.toLocaleString()} downloads/week
              {project.package.downloads.asOf && ` (as of ${project.package.downloads.asOf})`}
            </>
          )}
        </p>
      )}

      {project.motivation && (
        <section aria-labelledby="why-heading">
          <h2 id="why-heading">Why</h2>
          <p>{project.motivation}</p>
        </section>
      )}

      {project.contributions && (
        <section aria-labelledby="did-heading">
          <h2 id="did-heading">What I did</h2>
          <ul>
            {project.contributions.did.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.contributions.didNot && project.contributions.didNot.length > 0 && (
            <>
              <h3>What I didn&rsquo;t</h3>
              <ul>
                {project.contributions.didNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {project.caseStudy && <CaseStudy study={project.caseStudy} />}

      {project.lineage && project.lineage.length > 0 && (
        <section aria-labelledby="lineage-heading">
          <h2 id="lineage-heading">How the site changed</h2>
          <ol className="lineage">
            {project.lineage.map((stage) => (
              <li key={stage.label}>
                <strong>{stage.period}</strong> — {stage.label}
                {!stage.mine && <span className="tag">not my work</span>}
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section aria-labelledby="evidence-heading">
        <h2 id="evidence-heading">Evidence</h2>
        <ul>
          {project.evidence.map((item) => (
            <li key={item.id}>
              {'url' in item || 'archiveUrl' in item ? (
                <a href={'archiveUrl' in item ? item.archiveUrl : item.url}>{item.label}</a>
              ) : (
                item.label
              )}{' '}
              <span className="tag">{item.kind}</span>{' '}
              <span className="tag">{item.confidence}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.caveats && project.caveats.length > 0 && (
        <section aria-labelledby="caveats-heading">
          <h2 id="caveats-heading">Caveats</h2>
          <ul>
            {project.caveats.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
