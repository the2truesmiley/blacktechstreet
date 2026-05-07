## Add Sean Alexander as Strategic Advisor #4

Add Sean Alexander to the Strategic Advisors section on the Team page (`/about#team-section`), following the exact pattern used for Tiffany Crutcher, Robert Thomas, and Kevin Griffin.

### Source
Bio pulled from https://seanalexander.com/about-2/

### Data entry (`src/data/timeline.ts`)
Append a new `seanAlexander` entry to the `strategicAdvisors` array:

- **name:** "Sean Alexander"
- **title:** "Independent Advisor & Board Member, Former Microsoft Executive"
- **shortBio:** "Former Microsoft Executive and Independent Consultant who led global launches of Azure, Windows, Xbox, Industry Clouds, and Microsoft AI — including the first collaboration with OpenAI that laid the groundwork for ChatGPT and Copilots."
- **expandedBio:** Full multi-paragraph bio covering:
  - NACD member, Independent Consultant & Board Advisor
  - MIT AI for Business executive program; Microsoft & Northwestern Kellogg Leadership Bench Executive MBA
  - 25+ years at Microsoft leading global teams across Azure, Windows, Media Platforms, Xbox, Industry Clouds, and Microsoft AI
  - Multiple patents and a technical Emmy Award for media platforms work
  - Led the first Microsoft–OpenAI collaboration (foundation for ChatGPT, Copilots, Plugins)
  - Keynote work alongside Bill Gates, Steve Ballmer, Satya Nadella, Scott Guthrie, Ray Ozzie, and Dr. Harry Shum
  - Trustee & Executive Committee member, The University of Tulsa
  - Executive Committee, Tulsa Innovation Labs (George Kaiser Family Foundation)
  - Executive Committee, Board of Trustees, Philbrook Museum of Art & Gardens
- **linkedIn:** Will ask user to provide (not listed on his About page); fall back to omitting if not given.

### Asset
Headshot is not available on the public About page (only group/event photos). Will ask user to upload a headshot. Once uploaded:
- Copy to `src/assets/team/sean-alexander-headshot.{png|jpg}`

### Component update (`src/components/timeline/TeamSection.tsx`)
- Import `seanAlexanderHeadshot`
- Add `"Sean Alexander": seanAlexanderHeadshot` to the `teamPhotos` map

### Open questions before implementing
1. LinkedIn URL for Sean Alexander?
2. Please upload a headshot image.
