import type { Period } from '@portfolio/data';

/** "2022 – present" / "~2013" / "2016 – 2017" from a project period. */
export function formatPeriod(period: Period): string {
  const end = period.end ?? 'present';
  const range = period.end === period.start ? period.start : `${period.start} – ${end}`;
  return period.approximate ? `~${range}` : range;
}
