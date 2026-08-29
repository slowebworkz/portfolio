import type { CaseStudy as CaseStudyData } from '@portfolio/data';

import { Markdown } from './Markdown.tsx';

/** The long-form write-up for a project, rendered below the structured facts on
 *  the work-detail page. Every section but the summary is optional — a study can
 *  grow into the structure over time. */
export function CaseStudy({ study }: { study: CaseStudyData }) {
  return (
    <section aria-labelledby="case-study-heading">
      <h2 id="case-study-heading">Case study</h2>
      <p className="lede">{study.summary}</p>

      {study.context && (
        <>
          <h3>Context</h3>
          <Markdown>{study.context}</Markdown>
        </>
      )}

      {study.problem && (
        <>
          <h3>Problem</h3>
          <Markdown>{study.problem}</Markdown>
        </>
      )}

      {study.goals && study.goals.length > 0 && (
        <>
          <h3>Goals</h3>
          <ul>
            {study.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </>
      )}

      {study.architecture && (
        <>
          <h3>Architecture</h3>
          <Markdown>{study.architecture}</Markdown>
        </>
      )}

      {study.keyDecisions && study.keyDecisions.length > 0 && (
        <>
          <h3>Key decisions</h3>
          <ol className="decisions">
            {study.keyDecisions.map((item) => (
              <li key={item.decision}>
                <p className="decisions__head">
                  <strong>{item.decision}</strong>
                </p>
                <Markdown>{item.rationale}</Markdown>
                {item.tradeoffs && (
                  <p className="meta">
                    <strong>Trade-offs:</strong> {item.tradeoffs}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </>
      )}

      {study.implementation && (
        <>
          <h3>Implementation</h3>
          <Markdown>{study.implementation}</Markdown>
        </>
      )}

      {study.challenges && (
        <>
          <h3>Challenges</h3>
          <Markdown>{study.challenges}</Markdown>
        </>
      )}

      {study.results && (
        <>
          <h3>Results</h3>
          <Markdown>{study.results}</Markdown>
        </>
      )}

      {study.whatIdChange && (
        <>
          <h3>What I&rsquo;d change</h3>
          <Markdown>{study.whatIdChange}</Markdown>
        </>
      )}

      {study.links && study.links.length > 0 && (
        <>
          <h3>Further reading</h3>
          <ul>
            {study.links.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
