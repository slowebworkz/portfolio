import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { canonicalUrl, metaForPath } from './meta.ts';

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/** Keep `document.title` and the description / Open Graph / canonical tags in
 *  sync with the current route after client-side navigation. The initial values
 *  are baked in by the prerender step; this only matters once the SPA takes over
 *  — in particular so the canonical link doesn't stay pointed at the entry page. */
export function useDocumentHead(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(pathname);
    const canonical = canonicalUrl(pathname, window.location.origin, import.meta.env.BASE_URL);

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);

    if (canonical) {
      setCanonical(canonical);
      setMeta('property', 'og:url', canonical);
    }
  }, [pathname]);
}
