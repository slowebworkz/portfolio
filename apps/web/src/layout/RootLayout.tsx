import { profile } from '@portfolio/content';
import { NavLink, Outlet } from 'react-router';

import { useDocumentHead } from '../useDocumentHead.ts';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/writing', label: 'Writing', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export function RootLayout() {
  useDocumentHead();

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
