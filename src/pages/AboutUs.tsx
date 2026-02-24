import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TeamSection } from '@/components/timeline/TeamSection';

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'Rebirthing Historic Black Wall Street as a world-class innovation economy rooted in AI, Cybersecurity, and Other Emerging Technologies.',
  },
  {
    icon: Lightbulb,
    title: 'Vision',
    description: 'Transforming Greenwood and the Greater Tulsa Region into the model for AI-powered societies and economies of the future.',
  },
  {
    icon: Users,
    title: 'Strategy',
    description: 'We create strategies to make 21st century Greenwood a global leader in our defined technology areas, and we partner with companies, organizations or institutions to create/secure investment, talent and programming to bring that vision to fruition.',
  },
];

const timeline = [
  {
    year: '1921',
    title: 'Black Wall Street',
    description: 'The thriving Greenwood District in Tulsa was one of the most prosperous African American communities in the United States, home to hundreds of Black-owned businesses.',
  },
  {
    year: '2020',
    title: 'Vision Born',
    description: 'Black Tech Street was founded with one question: "What could Black Wall Street have been, had it been supported and not destroyed?"',
  },
  {
    year: '2023',
    title: 'White House Cyber Roundtable',
    description: 'Tyrance served as a Panelist Speaker at a convening hosted by the White House Office of the National Cyber Director, establishing BTS\'s first White House touchpoint.',
    month: 'January',
  },
  {
    year: '2023',
    title: 'Microsoft Partnership Established',
    description: 'Black Tech Street established a foundational relationship with Microsoft for long-term AI and cybersecurity collaboration, later leading to the Microsoft Cyber and AI Co-Innovation Lab in historic Greenwood.',
    month: 'June',
  },
  {
    year: '2023',
    title: 'DEF-CON 31 & SeedAI Partnership',
    description: 'In partnership with SeedAI and the White House Office of Science and Technology Policy, BTS took 75 people to participate in the largest public red team of AI models in history.',
    month: 'July',
  },
  {
    year: '2023',
    title: 'Senate HELP Committee Testimony',
    description: 'Tyrance testified before the Senate HELP Committee about AI and the future of work, addressing workforce development and ensuring AI benefits are shared across all communities.',
    month: 'November',
  },
  {
    year: '2024',
    title: 'Tech Hubs Designation',
    description: 'Black Tech Street served on the steering committee that won both the federal Tech Hubs designation and a $51M grant for autonomous systems — one of only two cities awarded both designation and implementation funding.',
    month: 'December',
  },
  {
    year: '2024',
    title: 'Hack the Future Greenwood',
    description: 'Co-hosted with SeedAI and the White House, this event used case-based challenges across 6 focus areas: Entrepreneurship, Community Development, Social Justice, Creative Expression, Education, and more.',
    month: 'January',
  },
  {
    year: '2024',
    title: 'G-ACE Established',
    description: 'The Greenwood AI Center of Excellence (G-ACE) launched as Black Tech Street\'s national model for AI integration, governance, and adaptation at scale — America\'s testbed for democratic AI scaling.',
    month: 'May',
  },
  {
    year: '2025',
    title: 'ASPIRE AI Workshops Launch',
    description: 'ASPIRE (AI Fluency, Innovation & Research Engine) launched its first workshop series, aiming to engage 500+ community members with goals of 25-50 individuals AI fluent/certified per quarter by Year 3.',
    month: 'May',
  },
  {
    year: '2025',
    title: 'NVIDIA Partnership',
    description: 'Black Tech Street signed an MOU with NVIDIA to train up to 10,000 learners in AI, provide advanced computing resources, and expand access to NVIDIA\'s startup ecosystem including the Inception program.',
    highlight: true,
  },
  {
    year: 'Future',
    title: 'The Road Ahead',
    description: 'Transforming Greenwood and the Greater Tulsa Region into the model for AI-powered societies and economies. Helping the United States win the AI Race and thrive in the AI Age.',
  },
];

export default function AboutUs() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      
      <main className="relative">
        {/* Editorial Hero */}
        <section className="pt-32 pb-20 px-5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-8">
                Black Tech Street<br />
                <span className="text-primary">Founding Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Black Tech Street (BTS) was established in 2020 by{' '}
                <span className="whitespace-nowrap">Tyrance Billingsley II, Founder &amp; CEO</span>
                {' '}on a question and a three pronged epiphany:
              </p>

              <motion.blockquote
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 max-w-3xl mx-auto relative px-8 py-6"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full" />
                <p className="text-2xl md:text-3xl font-display font-semibold text-foreground italic leading-snug">
                  "What could Black Wall Street have been, had it been supported and not destroyed?"
                </p>
              </motion.blockquote>

              <div className="mt-12 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  {[
                    { number: '1', text: 'Tech is one of the only industries within which one can build', highlight: 'intergenerational wealth', suffix: 'in just 7–10 years.' },
                    { number: '2', text: 'Tech is the', highlight: 'core medium', suffix: 'for all global innovation.' },
                    { number: '3', text: 'By 2030, there are projected to be as many as', highlight: '4.3 million vacant high paying jobs', suffix: 'due to a tech talent shortage.' },
                  ].map((item) => (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: parseInt(item.number) * 0.15 }}
                      className="relative bg-secondary/20 border border-primary/15 rounded-2xl p-7 hover:border-primary/40 transition-all duration-300 group"
                    >
                      <span className="text-5xl font-display font-black text-primary/50 group-hover:text-primary transition-colors duration-300 block mb-4">
                        {item.number}
                      </span>
                      <p className="text-foreground leading-relaxed text-base md:text-lg">
                        {item.text} <strong className="text-primary">{item.highlight}</strong> {item.suffix}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full-width Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />


        {/* Values - Clean Grid */}
        <section className="py-24 px-5 bg-secondary/20">
          <div className="max-w-5xl mx-auto">

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                      "bg-primary/10 border border-primary/20",
                      "group-hover:bg-primary/20 transition-colors duration-300"
                    )}>
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-primary mb-2">
                        {value.title}
                      </h2>
                      <p className="text-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-block text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                A Timeline of Progress
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={cn(
                    "relative pl-12 md:pl-0 pb-12 last:pb-0",
                    index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%] md:text-left"
                  )}
                >
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute top-0 w-4 h-4 rounded-full border-4 border-background",
                    "left-0 md:left-1/2 md:-translate-x-1/2",
                    item.highlight ? "bg-accent ring-4 ring-accent/20" : "bg-primary"
                  )} />
                  
                  {/* Content */}
                  <div className={cn(
                    "md:px-12",
                    index % 2 === 0 ? "md:pr-12 md:pl-0" : "md:pl-12 md:pr-0",
                    item.highlight && "bg-primary/5 p-4 rounded-xl border border-primary/20 md:mx-4"
                  )}>
                    <div className="flex items-center gap-2 mb-2 justify-start md:justify-inherit" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <span className="text-primary font-display font-bold text-xl">
                        {item.year}
                      </span>
                      {item.month && (
                        <span className="text-muted-foreground text-sm">
                          • {item.month}
                        </span>
                      )}
                      {item.highlight && (
                        <span className="text-accent text-sm">⭐</span>
                      )}
                    </div>
                    <h3 className={cn(
                      "text-lg font-display font-bold mb-2",
                      item.highlight ? "text-primary" : "text-foreground"
                    )}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-5 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <TeamSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-5 bg-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Join the Movement
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Be part of the next chapter in Greenwood's story. Together, we're building 
                the future of technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg",
                    "bg-primary text-primary-foreground font-semibold",
                    "hover:bg-primary/90 transition-colors"
                  )}
                >
                  Get In Touch
                </Link>
                <Link
                  to="/"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg",
                    "border border-border text-foreground font-semibold",
                    "hover:bg-secondary/50 transition-colors"
                  )}
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
