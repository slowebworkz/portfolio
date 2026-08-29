import { Link } from 'react-router';

export function NotFound() {
  return (
    <section data-testid="not-found">
      <h1>Page not found</h1>
      <p>
        That page doesn&rsquo;t exist. <Link to="/">Go home</Link>.
      </p>
    </section>
  );
}
