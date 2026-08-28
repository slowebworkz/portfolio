import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { metaForPath } from './meta.ts';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Keep `document.title` and the description / Open Graph tags in sync with the
 *  current route after client-side navigation. The initial values are baked in
 *  by the prerender step; this only matters once the SPA takes over. */
export function useDocumentHead(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(pathname);
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  }, [pathname]);
}
