import type { Paper } from '@/data/thoughtLeadership';

const SUFFIXES = new Set(['II', 'III', 'IV', 'Jr.', 'Jr', 'Sr.', 'Sr']);

/** "Tyrance Billingsley II" -> "Billingsley, T., II." */
export function apaAuthor(name: string) {
  const parts = name.trim().split(/\s+/);
  const suffix = parts.length > 2 && SUFFIXES.has(parts[parts.length - 1]) ? parts.pop()! : '';
  const last = parts.pop() ?? '';
  const initials = parts.map((p) => `${p[0]}.`).join(' ');
  const base = initials ? `${last}, ${initials}` : last;
  return suffix ? `${base}, ${suffix.replace(/\.$/, '')}.` : base;
}

/** Short SSRN URL (https://ssrn.com/abstract=ID), falling back to the DOI link. */
export function ssrnShortUrl(p: Paper) {
  try {
    const id = new URL(p.ssrnUrl).searchParams.get('abstract_id');
    if (id) return `https://ssrn.com/abstract=${id}`;
  } catch {
    /* fall through */
  }
  return `https://doi.org/${p.doi}`;
}

/** APA style citation built entirely from the publication data. */
export function apaCitation(p: Paper) {
  const year = p.publishedDate.slice(0, 4);
  return `${apaAuthor(p.author)} (${year}). ${p.title}. ${p.publisher}. ${ssrnShortUrl(p)}`;
}

/** Initials for the author badge: first letter of the first two name parts. */
export function authorInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}
