import { profile } from '@portfolio/content';
import { NavLink, Outlet } from 'react-router';

import { useDocumentHead } from '../useDocumentHead.ts';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

export function RootLayout() {
  useDocumentHead();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <NavLink to="/" className="site-header__mark" end>
            Portfolio
          </NavLink>
          <nav aria-label="Primary">
            <ul className="site-nav">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end ?? false}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="site-main site-container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <ul className="site-nav">
            {profile.links.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p>{profile.name} · built with React, Vite, and TypeScript.</p>
        </div>
      </footer>
    </>
  );
}
