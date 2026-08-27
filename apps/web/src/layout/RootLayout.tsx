import { NavLink, Outlet } from 'react-router';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/writing', label: 'Writing', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="site-header__mark" end>
            Portfolio
          </NavLink>
          <nav aria-label="Primary">
            <ul className="site-nav">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="site-main container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Built with React, Vite, and TypeScript. Content model in progress.</p>
        </div>
      </footer>
    </>
  );
}
