import { getProject, profile } from '@portfolio/content';

/** Per-page head content. Framework-neutral: a plain function of the pathname so
 *  the prerender step (Node) and the client both derive titles the same way. */
export interface PageMeta {
  /** Full `<title>` text. */
  title: string;
  description: string;
}

const SITE = profile.name;

/** "Work" -> "Work · Karsten Huehn". */
function withSite(page: string): string {
  return `${page} · ${SITE}`;
}

const WORK_DESCRIPTION =
  'Selected projects as engineering stories — the problem, the decisions, the trade-offs, and the evidence.';

export function metaForPath(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/u, '') || '/';

  if (path === '/') {
    return { title: `${SITE} — software developer`, description: profile.tagline };
  }
  if (path === '/work') {
    return { title: withSite('Work'), description: WORK_DESCRIPTION };
  }
  if (path.startsWith('/work/')) {
    const project = getProject(path.slice('/work/'.length));
    if (project && project.publishability.status !== 'private') {
      return { title: withSite(project.title), description: project.summary };
    }
    return { title: withSite('Project not found'), description: WORK_DESCRIPTION };
  }
  if (path === '/about') {
    return { title: withSite('About'), description: profile.tagline };
  }
  if (path === '/writing') {
    return {
      title: withSite('Writing'),
      description: 'Technical writing and architectural notes.',
    };
  }
  if (path === '/contact') {
    return { title: withSite('Contact'), description: `Get in touch with ${SITE}.` };
  }
  return { title: withSite('Page not found'), description: 'This page does not exist.' };
}
