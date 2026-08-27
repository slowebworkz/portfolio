import type { Timeline } from '@portfolio/data';

/** "2022 – present" / "2022-01 – 2023-06" from a project timeline. */
export function formatPeriod(timeline: Timeline): string {
  return `${timeline.start} – ${timeline.end ?? 'present'}`;
}
