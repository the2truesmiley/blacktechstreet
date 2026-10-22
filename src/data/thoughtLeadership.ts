/**
 * Thought Leadership publications.
 *
 * Paper page URLs (/thought-leadership/<slug>) are linked from op-eds and
 * press. Never rename a published slug.
 */

export interface PaperPillar {
  count: string;
  title: string;
  items?: string[];
  body: string;
}

export interface Paper {
  slug: string;
  title: string;
  shortTitle: string;
  author: string;
  authorTitle: string;
  publishedDate: string; // ISO date
  publisher: string;
  doi: string;
  ssrnUrl: string;
  /**
   * PDF download target. Points at SSRN's download endpoint until the PDF is
   * hosted on blacktechstreet.ai (then set to e.g. '/papers/value-native-ai.pdf').
   */
  pdfUrl: string;
  pdfHostedLocally: boolean;
  summary: string;
  abstract: string[];
  keyStats: { value: string; label: string }[];
  pillars: PaperPillar[];
  prediction: string;
}

export const papers: Paper[] = [
  {
    slug: 'value-native-ai',
    title:
      'Value-Native AI: Infrastructure for Creating, Identifying, and Capturing Value in the Age of AI',
    shortTitle: 'Value-Native AI',
    author: 'Tyrance Billingsley II',
    authorTitle: 'Founder & CEO',
    publishedDate: '2026-10-16',
    publisher: 'SSRN',
    doi: '10.2139/ssrn.7621738',
    ssrnUrl: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7621738',
    pdfUrl: 'https://papers.ssrn.com/sol3/Delivery.cfm?abstractid=7621738&mirid=1',
    pdfHostedLocally: false,
    summary:
      'A framework for maximizing the return on AI for any individual and any organization, built on value creation rather than AI adoption as the organizing principle.',
    abstract: [
      'The world is making the largest concentrated capital bet of our lifetimes on artificial intelligence: more than $750 billion in 2026 capital spending by four technology companies alone, and $2.7 trillion in forecast worldwide AI spending. Yet 56 percent of chief executives report no significant financial benefit from AI to date. Whether this investment produces real economic value, and who captures it, is the central economic question of the AI era.',
      'We are measuring the wrong thing. Investment in AI is tracked in seats, licenses, and utilization by organizations, and in tools tried and hours spent by individuals, none of which is denominated in anything a CFO, a funder, a public budget, or a career actually counts. The result is motion without return: the tool becomes the anchor, and value is left to appear as a byproduct. It does not appear, because value has never been a byproduct.',
      'This paper introduces Value-Native AI, an approach in which value creation, not AI adoption, is the organizing principle, and presents a framework for maximizing the return on AI, for any individual and any organization. Because every organization, and every working person, exists to create value and differs only in the currency counted, the framework functions as a shared substrate across firms, nonprofits, research institutions, public agencies, and the individual career.',
      'The framework also resolves a puzzle the industry has misdiagnosed. Slow workforce adoption is largely rational behavior under missing reward infrastructure rather than a skills deficit, which makes it an organizational design problem rather than a training one. Drawing on field experience training more than four hundred professionals through the Greenwood AI Center of Excellence, a federally designated Tech Hub initiative, and on the empirical literature, the paper states a falsifiable prediction.',
    ],
    keyStats: [
      { value: '$750B+', label: '2026 AI capital spending by four technology companies' },
      { value: '$2.7T', label: 'Forecast worldwide AI spending' },
      { value: '56%', label: 'Of chief executives report no significant financial benefit from AI to date' },
    ],
    pillars: [
      {
        count: '4',
        title: 'Human capabilities',
        items: ['Augmentation', 'Orchestration', 'Synthesis', 'Translation'],
        body: 'Operating on a substrate of judgment:',
      },
      {
        count: '6',
        title: 'Forms of economic value',
        items: ['Pre-registered baselines', 'Evidence in systems of record', 'Attestation'],
        body: 'Every value claim is held to three credibility disciplines:',
      },
      {
        count: '8',
        title: 'Forms of capture',
        body: 'Available to professionals and organizations, so the value created is the value kept.',
      },
    ],
    prediction:
      'Matched organizations sorted by whether their primary AI metric is an outcome denomination or a utilization metric will diverge on sustained adoption and realized returns within twenty-four months.',
  },
];

export const getPaper = (slug: string) => papers.find((p) => p.slug === slug);

export const paperPath = (slug: string) => `/thought-leadership/${slug}`;

/** Longer two-sentence summary for the featured card, taken from the paper's abstract. */
export const featuredSummaries: Record<string, string> = {
  'value-native-ai':
    'The world is making the largest concentrated capital bet of our lifetimes on artificial intelligence, yet 56 percent of chief executives report no significant financial benefit from AI to date. This paper introduces Value-Native AI, an approach in which value creation, not AI adoption, is the organizing principle, and presents a framework for maximizing the return on AI for any individual and any organization.',
};

/* ------------------------------------------------------------------ */
/* Library: every piece shown in the "More from our team" grid.        */
/* To add a paper, article, talk, or framework, add one object here.   */
/* ------------------------------------------------------------------ */

export type LibraryType = 'Paper' | 'Article' | 'Talk' | 'Framework';

export interface LibraryItem {
  title: string;
  author: string;
  date: string; // ISO date
  type: LibraryType;
  summary: string;
  /** Internal path (e.g. /thought-leadership/slug) or full external URL. */
  href: string;
}

export const library: LibraryItem[] = [
  {
    title: 'Value-Native AI: Infrastructure for Creating, Identifying, and Capturing Value in the Age of AI',
    author: 'Tyrance Billingsley II',
    date: '2026-10-16',
    type: 'Paper',
    summary:
      'A framework for maximizing the return on AI for any individual and any organization, built on value creation rather than AI adoption as the organizing principle.',
    href: '/thought-leadership/value-native-ai',
  },
];

export const isExternalHref = (href: string) => /^https?:\/\//.test(href);

/** Filter chips, in display order, and the item type each one matches. */
export const LIBRARY_FILTERS = [
  { label: 'All', type: null },
  { label: 'Papers', type: 'Paper' },
  { label: 'Articles', type: 'Article' },
  { label: 'Talks', type: 'Talk' },
] as const satisfies readonly { label: string; type: LibraryType | null }[];

export type LibraryFilterLabel = (typeof LIBRARY_FILTERS)[number]['label'];

/** "All" always shows; every other chip shows only once it has at least one item. */
export function visibleFilters(items: LibraryItem[]): LibraryFilterLabel[] {
  return LIBRARY_FILTERS.filter((f) => f.type === null || items.some((i) => i.type === f.type)).map((f) => f.label);
}

export function filterLibrary(items: LibraryItem[], label: LibraryFilterLabel): LibraryItem[] {
  const f = LIBRARY_FILTERS.find((x) => x.label === label);
  if (!f || f.type === null) return items;
  return items.filter((i) => i.type === f.type);
}

/** The grid always shows at least this many cards; missing slots become "Coming soon" placeholders. */
export const MIN_GRID_SLOTS = 3;

export const placeholderCount = (itemCount: number) => Math.max(0, MIN_GRID_SLOTS - itemCount);

export const sortByNewest = (items: LibraryItem[]) => [...items].sort((a, b) => b.date.localeCompare(a.date));

export function formatPaperDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function paperCitation(p: Paper) {
  const year = p.publishedDate.slice(0, 4);
  return `Billingsley II, T. (${year}). ${p.title}. ${p.publisher}. https://doi.org/${p.doi}`;
}
