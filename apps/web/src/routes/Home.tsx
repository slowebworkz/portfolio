import { getFeaturedProjects } from '@portfolio/content';
import { Link } from 'react-router';

export function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section>
        <h1>Engineering portfolio</h1>
        <p className="lede">
          Work presented as engineering stories — the problem, the decisions, the trade-offs, and
          the evidence — not a list of technologies.
        </p>
        <p>
          <Link to="/work">See the work</Link> · <Link to="/contact">Get in touch</Link>
        </p>
      </section>

      {featured.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading">Featured</h2>
          <ul className="card-list">
            {featured.map((project) => (
              <li key={project.slug}>
                <h3>
                  <Link to={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
