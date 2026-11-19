// Per-route link preview tags baked into static HTML at build time,
// so social crawlers (which do not run JavaScript) see each page's own preview.
export const SITE = "https://blacktechstreet.ai";
export const routeMeta: Record<string, { title: string; description: string }> = {
  "/aspire": { title: "ASPIRE | Black Tech Street", description: "ASPIRE offers GenAI fluency and responsible innovation training for life, work, and community in Greenwood, Tulsa." },
  "/aspire/events": { title: "ASPIRE GenAI Workshops | Black Tech Street", description: "Register for ASPIRE GenAI Fluency Workshops in Tulsa. Hands-on AI training, free childcare, and community networking." },
  "/aspire/events/december-2026": { title: "December 2026 ASPIRE Workshop | Black Tech Street", description: "Register for the December 2026 ASPIRE GenAI Fluency Workshop in Greenwood, Tulsa. Hands-on AI training with free childcare." },
  "/free-ai-workshop": { title: "Free AI Workshop in Tulsa | Black Tech Street ASPIRE", description: "Free hands-on AI training in Tulsa, Oklahoma. No experience needed. Free childcare and laptops. Register now." },
  "/free-ai-training-faq": { title: "Free AI Training FAQ | Black Tech Street", description: "Answers about ASPIRE AI Workshops: eligibility, childcare, what you will learn, and how to register." },
  "/partners": { title: "Partners | Black Tech Street", description: "Microsoft, NVIDIA, MIT, NYU Tulsa, OU Polytechnic, and 20+ Tulsa organizations partnering with Black Tech Street in Historic Greenwood." },
  "/news": { title: "BTS In The News | Black Tech Street", description: "Press coverage of Black Tech Street's mission to rebuild Black Wall Street through technology, from CNN to Forbes." },
  "/gallery": { title: "Gallery | Black Tech Street", description: "Photos from Black Tech Street workshops, events, and community gatherings in Greenwood, Tulsa." },
  "/contact": { title: "Contact Us | Black Tech Street", description: "Get in touch with Black Tech Street about programs, partnerships, or how to get involved in Tulsa's AI innovation economy." },
  "/donate": { title: "Support Black Tech Street | Donate", description: "Support Black Tech Street and help build the future of AI innovation rooted in Tulsa's Greenwood District." },
  "/about": { title: "About | Black Tech Street", description: "Meet the team rebirthing Historic Black Wall Street as a world-class AI innovation economy in Greenwood, Tulsa." },
  "/thought-leadership": { title: "Thought Leadership | Black Tech Street", description: "Research, frameworks, and ideas from the Black Tech Street team on building technology that serves our communities." },
  "/privacy": { title: "Privacy Policy | Black Tech Street", description: "How Black Tech Street collects, uses, and protects your information." },
  "/terms": { title: "Terms of Use | Black Tech Street", description: "Terms for using the Black Tech Street website." },
};
