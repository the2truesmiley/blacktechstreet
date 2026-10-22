# AGENTS.md

- Thought Leadership papers are data entries in `src/data/thoughtLeadership.ts`, rendered by one shared paper page at `/thought-leadership/:slug`. Why: adding a paper should never need a new page file, and published slugs stay stable for op-ed links.
- Hosted PDFs go in `public/papers/` and the entry's `pdfUrl`/`pdfHostedLocally` are updated. Why: the download button switches from an external link to a direct download automatically.
- The Thought Leadership hub grid is driven only by the `library` array in `src/data/thoughtLeadership.ts`; filter chips and "Coming soon" fillers are derived from it. Why: adding a paper, article, talk, or framework is a single array edit.
