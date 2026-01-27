export type TimelineCategory = 
  | 'Policy' 
  | 'Partnerships' 
  | 'Community' 
  | 'Research' 
  | 'Events' 
  | 'Infrastructure';

export interface TimelineItem {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  category: TimelineCategory;
  longDescription?: string;
}

export const timelineItems: TimelineItem[] = [
  {
    id: 'white-house-cyber-2023',
    date: '2023-02',
    year: 2023,
    title: 'White House Cyber Roundtable',
    description: 'Tyrance spoke as a panelist at the White House Office of the National Cyber Director convening.',
    longDescription: 'Tyrance was a Panelist Speaker at a convening of leaders in the Cyber Industry, hosted by the White House Office of the National Cyber Director. This marked Black Tech Street\'s first White House touchpoint, establishing critical relationships at the highest levels of federal cybersecurity policy.',
    category: 'Policy',
  },
  {
    id: 'microsoft-partnership-2023',
    date: '2023-07',
    year: 2023,
    title: 'Microsoft Partnership Established',
    description: 'BTS established a foundational relationship with Microsoft for long-term AI and cybersecurity collaboration.',
    longDescription: 'Black Tech Street established a foundational relationship with Microsoft for long-term AI and cybersecurity collaboration. Robert F. Smith highlighted the Microsoft announcement in August 2023. This partnership would later lead to the Microsoft Cyber and AI Co-Innovation Lab in historic Greenwood.',
    category: 'Partnerships',
  },
  {
    id: 'defcon-seedai-2023',
    date: '2023-08',
    year: 2023,
    title: 'Responsible AI: DEF-CON 31 & SeedAI',
    description: 'Public red team of AI models with 75 participants, partnered with White House Office of Science and Technology Policy.',
    longDescription: 'BTS, in partnership with SeedAI and the White House Office of Science and Technology Policy, took 75 people to participate in the largest public red team of AI models in history at that time. This event demonstrated BTS\'s commitment to responsible AI development and community engagement in emerging technology governance.',
    category: 'Research',
  },
  {
    id: 'ai-executive-order-2023',
    date: '2023-10',
    year: 2023,
    title: 'AI Executive Order Signing under the Biden Administration',
    description: 'Biden Administration signs executive order on responsible AI development.',
    longDescription: 'The Biden Administration signed a landmark executive order on responsible AI development. Black Tech Street\'s advocacy and engagement at the federal level contributed to shaping policies that prioritize safety, security, and civil rights in AI systems.',
    category: 'Policy',
  },
  {
    id: 'democratic-caucus-2023',
    date: '2023-12',
    year: 2023,
    title: 'Democratic Caucus Interview on AI & Civil Rights',
    description: 'Tyrance interviewed on the Democratic Caucus on AI and civil rights.',
    longDescription: 'Tyrance was interviewed by the Democratic Caucus on the intersection of AI and civil rights, discussing how emerging technologies can either reinforce or help dismantle systemic inequities, and the importance of inclusive AI policy development.',
    category: 'Policy',
  },
  {
    id: 'senate-civil-rights-2023',
    date: '2023-12',
    year: 2023,
    title: 'AI and the Future of Work: Moving Forward Together',
    description: 'Testified before Senate HELP Committee on AI and the future of work.',
    longDescription: 'Tyrance testified in front of the Senate HELP Committee about AI and the future of work, addressing how AI will transform employment, the need for workforce development, and ensuring that the benefits of AI-driven productivity are shared across all communities.',
    category: 'Policy',
  },
  {
    id: 'tech-hubs-2024',
    date: '2024-01',
    year: 2024,
    title: 'Tech Hubs Designation',
    description: 'Steering committee wins federal Tech Hubs designation with $51M grant.',
    longDescription: 'Black Tech Street served on the steering committee that won both the federal Tech Hubs designation and a $51M grant for autonomous systems. Tulsa was one of only two cities that were awarded both the designation and implementation funding, as part of the CHIPS and Science Act initiative.',
    category: 'Infrastructure',
  },
  {
    id: 'hack-the-future-2024',
    date: '2024-02',
    year: 2024,
    title: 'Hack the Future Greenwood',
    description: 'Community-based AI challenge areas across entrepreneurship, economic development, justice, and education.',
    longDescription: 'Co-hosted with SeedAI and the White House Office of Science and Technology Policy, Hack the Future Greenwood used case-based challenges across 6 focus areas: Entrepreneurship, Community & Economic Development, Spirituality & Religion, Social & Criminal Justice, Creative Expression, and Education & Learning.',
    category: 'Events',
  },
  {
    id: 'gace-2024',
    date: '2024-06',
    year: 2024,
    title: 'G-ACE Established',
    description: 'Greenwood AI Center of Excellence established with $10.6M BTS sub-award.',
    longDescription: 'The Greenwood AI Center of Excellence (G-ACE) is Black Tech Street\'s national model for AI integration, governance, and adaptation at scale. Core thesis: "The winner of the AI Race will determine the outcome of human civilization, and the country that wins will be the one that successfully integrates AI across society, not just who develops the most powerful models."',
    category: 'Infrastructure',
  },
  {
    id: 'cyber-director-visit-2024',
    date: '2024-06',
    year: 2024,
    title: 'White House National Cyber Director Visit',
    description: 'Hosted the White House National Cyber Director during Juneteenth.',
    longDescription: 'BTS hosted the White House National Cyber Director during Juneteenth to discuss cybersecurity workforce development, community engagement, and the unique opportunity to build cyber capacity in historically underserved communities.',
    category: 'Policy',
  },
  {
    id: 'aspire-launch-2025',
    date: '2025-06',
    year: 2025,
    title: 'Launch: ASPIRE AI Workshops',
    description: 'First ASPIRE GenAI Fluency & Responsibility Lab launched in Greenwood.',
    longDescription: 'ASPIRE (AI Fluency, Innovation & Research Engine) launched its first workshop series. Program goals include engaging 500+ community members, hosting 2-4 large marquee events per year and 4-8+ educational events per year, with outcomes of 25-50 individuals AI fluent/certified per quarter by Year 3.',
    category: 'Events',
  },
  {
    id: 'nvidia-partnership-2025',
    date: '2025-09',
    year: 2025,
    title: 'NVIDIA Partnership Established',
    description: 'MOU signed to scale training, compute access, and innovation in Greenwood.',
    longDescription: 'Black Tech Street signed an MOU with NVIDIA establishing shared goals and aspirations to: train up to 10,000 learners in AI through collaborations with universities and community organizations; provide advanced computing resources (NVIDIA GPUs and cloud platforms) to power local AI projects, startups, and applied research.',
    category: 'Partnerships',
  },
];

export interface TeamMember {
  name: string;
  title: string;
  shortBio: string;
  expandedBio: string;
  linkedIn?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Tyrance Billingsley II",
    title: "Founder & CEO",
    shortBio: "Tyrance Billingsley II is a Tulsa-born entrepreneur, technologist, and ecosystem builder. Under his leadership, Black Tech Street has brokered a citywide alliance with Microsoft to establish 21st-century Greenwood and secured federal Tech Hubs designation with an eight-figure award.",
    expandedBio: `Tyrance Billingsley II is a Tulsa-born and raised entrepreneur, technologist and ecosystem builder. Tyrance is the founder and executive director of Black Tech Street, an organization dedicated to rebirthing historic Black Wall Street as the nation's premiere black innovation economy rooted in the critical technology areas of cybersecurity, data analytics and responsible artificial intelligence.

Under his leadership, Black Tech Street has, in just three years, brokered a citywide alliance with Microsoft to establish 21st-century Greenwood and, as a leader in cyber and AI, served on the Tulsa Tech Hub steering committee that secured both a federal Tech Hubs designation and funding from the Economic Development Administration, with an eight-figure award being allocated to Black Tech Street's work.

Tyrance has given a TEDx talk and been featured in publications like Forbes, Blavity, CNN Business and Black Enterprise. His thought leadership on AI and emerging technologies has led to him testifying before the United States Senate HELP committee on AI and the Future of Work, attending the historic signing of the AI Executive Order at the White House, addressing a caucus meeting on AI and civil rights, and hosting the White House National Cyber Director Harry Coker Jr. and his team in historic Greenwood.`,
    linkedIn: "https://www.linkedin.com/in/tyrance-billingsley-ii-ab0683123/"
  },
  {
    name: "Josephine Nelms",
    title: "Chief Operating Officer",
    shortBio: "Josephine Nelms leads the operational strategy, partnerships and organizational systems that power Black Tech Street's mission. With more than 15 years of experience in operations, HR and organizational leadership.",
    expandedBio: `Josephine Nelms is the Chief Operating Officer of Black Tech Street, an organization committed to rebirthing Black Wall Street as the nation's premiere innovative economy, with a strategic focus on responsible AI, cybersecurity and emerging technologies. As COO, Josephine leads the operational strategy, partnerships and organizational systems that power Black Tech Street's mission.

Prior to joining Black Tech Street, Josephine served as Director of Operations at Atento Capital, where she was recognized with the Atent-Awesome award in 2023. She also spent a decade with Girl Scouts of Eastern Oklahoma, earning Supervisor of the Year in 2018 and the Youth at Heart award in 2019.`,
    linkedIn: "https://www.linkedin.com/in/josephine-nelms-108b87173/"
  },
  {
    name: "Allen Collins",
    title: "Chief of Staff",
    shortBio: "Allen Collins transforms BTS initiatives into high-impact experiences that strengthen Tulsa's innovation ecosystem. He oversees program execution, community engagements, and manages logistics.",
    expandedBio: `Allen Collins is a Tulsa-born and community-centered leader who serves as the Chief of Staff for Black Tech Street (BTS). In this role, Allen is responsible for transforming BTS initiatives into high-impact experiences that strengthen Tulsa's innovation ecosystem.

Allen's background includes roles at City Year Tulsa, Hunger Free Oklahoma, Tahlequah Chamber, and inTulsa. He is an active volunteer with My Brother's Keeper Sports and a graduate of Leadership Tulsa New Voices Class 12.`,
    linkedIn: "https://www.linkedin.com/in/allen-collins/"
  },
  {
    name: "Smiley Elmore III",
    title: "Communications Manager",
    shortBio: "Smiley Elmore III leads all organizational communications, marketing, and brand execution across digital, email, and public platforms.",
    expandedBio: `Smiley Elmore III is a Tulsa-based communications strategist and creative technologist who serves as the Communications Manager for Black Tech Street (BTS). In this role, Smiley leads all organizational communications, marketing, and brand execution across digital, email, and public platforms.

Before joining BTS, Smiley founded Eminent Media and worked with digital agencies across various industries. His work includes leading communications for the ASPIRE program, collaborating with NVIDIA on partnership announcements, and architecting CRM systems for community engagement.`,
    linkedIn: "https://www.linkedin.com/in/smiley-elmore-iii/"
  }
];

export const testimonials = [
  {
    quote: "I get excited when I'm learning new and interesting things—especially when the experience stretches both my imagination and my intellect. Black Tech Street delivered just that: a challenging, fun, and thought-provoking event that deepened my understanding of AI and expanded my creative toolkit.",
    author: "Angela A."
  },
  {
    quote: "Discovering what AI can do with the simplest of instructions given to it was mind-blowing for me. One little sentence could create a beautiful presentation, an app, give answers to the most random questions. It's insane!",
    author: "India M."
  },
  {
    quote: "Confidence, inspiration, and relief. That's how I feel as I'm now able to scale myself and create better outcomes.",
    author: "Michelle S."
  },
  {
    quote: "I learned not only about AI, but also about how I relate to it—and how I can integrate it into my life and work in a thoughtful, ethical way.",
    author: "Judie W."
  },
  {
    quote: "It was so inspiring and enlightening to be able to explore and learn about so many great tools!",
    author: "Michelle B."
  },
  {
    quote: "I feel that blinders have been removed.",
    author: "Nadette C."
  },
  {
    quote: "This experience taught me that there is community and help for people wanting to learn and grow businesses in the ai/tech world.",
    author: "Solei W."
  }
];

export const aboutContent = {
  mission: 'Rebirthing Historic Black Wall Street as a world class innovation economy rooted in AI, Cybersecurity, and Other Emerging Technologies.',
  vision: 'Transforming Greenwood and the Greater Tulsa Region (GTR) into the model for AI powered societies and economies of the future. Helping the United States win the AI Race and thrive in the AI Age.',
  whatWeDo: 'We design and deliver programs at the intersection of education, innovation, and research to ensure communities can participate in, and shape, the AI economy.',
  origin: {
    question: 'What could Black Wall Street have been, had it been supported and not destroyed?',
    epiphanies: [
      'Tech is one of the only industries within which one can build intergenerational wealth in just 7 to 10 years.',
      'Tech is the core medium for all global innovation.',
      'By the year 2030, there are projected to be as many as 4.3 million high paying tech jobs due to a tech talent shortage.',
    ],
  },
};

export const categories: TimelineCategory[] = [
  'Policy',
  'Partnerships', 
  'Community',
  'Research',
  'Events',
  'Infrastructure',
];

export const years = [...new Set(timelineItems.map(item => item.year))].sort();
