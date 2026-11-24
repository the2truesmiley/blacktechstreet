// Per-route link preview tags baked into static HTML at build time,
// so social crawlers (which do not run JavaScript) see each page's own preview.
import { aspireNearbyCities, nearbyCityPath, nearbyCityTitle, nearbyCityDescription } from '../src/data/aspireNearbyCities';
import { decemberWorkshopPath, decemberWorkshopSeo } from '../src/data/decemberWorkshopSeo';
export const SITE = "https://blacktechstreet.ai";
export const routeMeta: Record<string, { title: string; description: string }> = {
  ...Object.fromEntries(aspireNearbyCities.map(city => [nearbyCityPath(city.slug), { title: nearbyCityTitle(city.name), description: nearbyCityDescription(city.name) }])),
  "/aspire": { title: "ASPIRE | Black Tech Street", description: "ASPIRE offers GenAI fluency and responsible innovation training for life, work, and community in Greenwood, Tulsa." },
  "/aspire/events": { title: "ASPIRE GenAI Workshops | Black Tech Street", description: "Register for ASPIRE GenAI Fluency Workshops in Tulsa. Hands-on AI training, free childcare, and community networking." },
  [decemberWorkshopPath]: decemberWorkshopSeo,
  "/free-ai-workshop": { title: "Free AI Workshop in Tulsa | Black Tech Street ASPIRE", description: "Free hands-on AI training in Tulsa, Oklahoma. No experience needed. Free childcare and laptops. Register now." },
  "/free-ai-training-faq": { title: "Free AI Training FAQ | Black Tech Street", description: "Answers about ASPIRE AI Workshops: eligibility, childcare, what you will learn, and how to register." },
  "/partners": { title: "Partners | Black Tech Street", description: "Microsoft, NVIDIA, MIT, NYU Tulsa, OU Polytechnic, and 20+ Tulsa organizations partnering with Black Tech Street in Historic Greenwood." },
  "/news": { title: "BTS In The News | Black Tech Street", description: "Press coverage of Black Tech Street's mission to rebuild Black Wall Street through technology, from CNN to Forbes." },
  "/gallery": { title: "Gallery | Black Tech Street", description: "Photos from Black Tech Street workshops, events, and community gatherings in Greenwood, Tulsa." },
  "/contact": { title: "Contact Us | Black Tech Street", description: "Get in touch with Black Tech Street about programs, partnerships, or how to get involved in Tulsa's AI innovation economy." },
  "/donate": { title: "Support Black Tech Street | Donate", description: "Support Black Tech Street and help build the future of AI innovation rooted in Tulsa's Greenwood District." },
  "/about": { title: "About | Black Tech Street", description: "Meet the team rebirthing Historic Black Wall Street as a world-class AI innovation economy in Greenwood, Tulsa." },
  "/thought-leadership": { title: "Thought Leadership | Black Tech Street", description: "Research, frameworks, and ideas from the Black Tech Street team on building technology that serves our communities." },
  "/aspire/events/september-2026": { title: "ASPIRE AI Workshop | September 19, 2026 | Tulsa", description: "Free full-day ASPIRE AI Workshop in Tulsa on September 19, 2026. Beginner-friendly, free childcare, and laptops provided." },
  "/aspire/events/september-2026/register": { title: "Register | ASPIRE AI Workshop September 19, 2026", description: "Reserve your free seat at the September 19, 2026 ASPIRE AI Workshop in Tulsa." },
  "/aspire/events/april-2026": { title: "ASPIRE AI Workshop | April 18, 2026 | Black Tech Street", description: "Details from the April 18, 2026 ASPIRE AI Workshop in Tulsa: hands-on AI training for the community." },
  "/aspire-typros": { title: "AI Fluency Workshop | Black Tech Street x TYPROS", description: "Free, beginner-friendly AI Fluency Workshop with Black Tech Street and TYPROS at OSU-Tulsa North Hall." },
  "/aspire/parking": { title: "ASPIRE Parking | Black Tech Street", description: "Parking directions and map for ASPIRE AI Workshop attendees in Tulsa." },
  "/hqgrandopeningphotos": { title: "HQ Grand Opening Photos | Black Tech Street", description: "Photos from the Black Tech Street headquarters grand opening in Greenwood, Tulsa." },
  "/resources/ai-at-work": { title: "AI at Work Guide | Black Tech Street", description: "A free practical guide to using AI effectively and responsibly at work from Black Tech Street." },
  "/thought-leadership/value-native-ai": { title: "Value-Native AI | Tyrance Billingsley II | Black Tech Street", description: "Value-Native AI, a research paper by Tyrance Billingsley II, Founder & CEO of Black Tech Street." },
  "/privacy": { title: "Privacy Policy | Black Tech Street", description: "How Black Tech Street collects, uses, and protects your information." },
  "/terms": { title: "Terms of Use | Black Tech Street", description: "Terms for using the Black Tech Street website." },
};
