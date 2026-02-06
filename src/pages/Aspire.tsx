import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, Target, Zap, Users, Brain } from 'lucide-react';
import teamGroupPhoto from '@/assets/team_group_photo.jpg';
import btsLogo from '@/assets/logo_b_circuit.png';

const Aspire = () => {
  useEffect(() => {
    document.title = 'ASPIRE | Black Tech Street';
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Lightbulb,
      title: "AI Confidence, Without the Complexity",
      description: "Get hands-on with today's most powerful AI tools, like ChatGPT, Claude, and Microsoft Copilot, and learn to use them with creativity, clarity, and confidence."
    },
    {
      icon: Zap,
      title: "Real-Life Results, Powered By AI",
      description: "Discover how to automate routine tasks, spark better ideas, accelerate your writing, and solve problems faster. You'll turn AI into a daily advantage, not a distant concept."
    },
    {
      icon: Target,
      title: "Responsible AI In Action",
      description: "Learn how to use AI responsibly, from spotting bias and misinformation to building trust and transparency in your work. You won't just use AI, you'll shape how it's used."
    },
    {
      icon: Users,
      title: "Custom AI Workflows That Work For You",
      description: "Design AI-powered systems tailored to your goals. Whether you're scaling a business, teaching a class, or launching a side project, you'll build tools that fit your life."
    },
    {
      icon: Brain,
      title: "Lead The Change, Don't Chase It",
      description: "Walk away with a clear, personal blueprint for using AI to lead, innovate, and uplift your team, community, or career. You won't just keep up, you'll move ahead."
    }
  ];

  const pillars = [
    {
      title: "Learn By Doing",
      description: "Learn through hands-on demos, challenges, and real-world tools"
    },
    {
      title: "Think Critically",
      description: "Build the mindset to think critically, not just follow blindly"
    },
    {
      title: "Build Your System",
      description: "Design AI-powered systems that fit your life, work, or mission"
    }
  ];

  const audienceList = [
    { label: "small business owner", desc: "ready to scale smarter, not harder" },
    { label: "teacher", desc: "who wants to inspire, not just instruct" },
    { label: "creative", desc: "looking to break new ground with bold tools" },
    { label: "community leader", desc: "driven to amplify your mission" },
    { label: "curious", desc: "about the future..." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />

      {/* Hero Section - Black background */}
      <section className="bg-background text-foreground pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
          >
            ASPIRE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Gen AI Fluency & Responsible Innovation for Life, Work, and Community
          </motion.p>
        </div>
      </section>

      {/* What is ASPIRE Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6 uppercase tracking-tight">
                What is ASPIRE?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ASPIRE is a flagship initiative from Black Tech Street and the Greenwood AI Center of Excellence. 
                It offers a structured learning experience that blends high-quality AI training with real-world application. 
                No fluff, no jargon—just the mindset, tools, and workflows to help you lead confidently in a world shaped by intelligent systems.
              </p>
              <div className="w-full h-px bg-border mt-8" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-full h-full bg-primary/20 rounded-lg" />
                <img 
                  src={teamGroupPhoto}
                  alt="ASPIRE participants group photo"
                  className="relative z-10 w-full h-auto rounded-lg shadow-xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section - Dark */}
      <section className="py-20 px-6 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-tight"
          >
            What You'll Get From ASPIRE
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/aspire/events">
                Join our next ASPIRE experience
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes ASPIRE Different */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6 uppercase tracking-tight">
              What Makes ASPIRE Different?
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-muted-foreground"
          >
            <p className="text-xl leading-relaxed mb-6 text-card-foreground">
              While others teach you how to use tools, <strong>we teach you how to think with them.</strong>
            </p>
            <p className="leading-relaxed mb-6">
              ASPIRE is built on the belief that technology doesn't change the world—people do. 
              And in this AI-powered era, the most valuable skill isn't technical know-how, but <em>adaptive intelligence</em>: 
              the mindset to question, create, lead, and collaborate alongside intelligent systems.
            </p>
            <p className="leading-relaxed mb-8">
              This isn't about memorizing prompts or chasing the latest app. 
              It's about building judgment, ethics, and vision—so you're ready not just for today's tools, but for tomorrow's possibilities.
            </p>
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
              <p className="font-semibold text-card-foreground mb-4">ASPIRE equips you to:</p>
              <ul className="space-y-2 text-card-foreground">
                <li>Use AI with purpose, not just productivity.</li>
                <li>Lead conversations, not just follow trends.</li>
                <li>Shape change, not just survive it.</li>
              </ul>
            </div>
            <div className="mt-10 bg-primary/15 border border-primary/30 rounded-xl p-6 md:p-8 flex gap-4 items-center">
              <img 
                src={btsLogo} 
                alt="Black Tech Street" 
                className="shrink-0 w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <p className="text-lg md:text-xl font-semibold text-card-foreground leading-relaxed">
                You are not a passive user. You are a co-creator of what comes next.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">
              Who It's For
            </h2>
            <p className="text-xl text-muted-foreground">
              <strong className="text-foreground">ASPIRE is for anyone ready to lead in the age of AI.</strong>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {audienceList.map((item, index) => (
              <div 
                key={item.label}
                className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-primary font-semibold">A {item.label}</span>
                <span className="text-muted-foreground"> {item.desc}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curriculum Pillars */}
      <section className="py-20 px-6 bg-background text-foreground">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <span className="text-primary">ASPIRE</span> Curriculum Pillars
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8 bg-card/50 rounded-xl border border-border"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-background text-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight"
          >
            Innovate in Tulsa, Lead It Everywhere
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground space-y-4 mb-12 max-w-2xl mx-auto"
          >
            <p>AI isn't coming—it's already here.</p>
            <p>The question isn't <em>if</em> it will impact the world. It's <em>who</em> will shape the impact.</p>
            <p className="font-semibold text-foreground">Those who learn first, lead first. Those who wait, follow.</p>
            <p>
              ASPIRE isn't just about skill-building. It's about future-shaping. 
              This is your chance to put Tulsa at the forefront—not as a follower of innovation, but as a builder of it.
            </p>
            <p className="text-xl font-bold text-primary mt-6">
              The tools are here. The moment is now. The future is what we make it.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="https://tally.so/r/EkWBo2" target="_blank" rel="noopener noreferrer">
                Join The Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:contact@blacktechstreet.com">
                Partner With Us
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/about">
                About Black Tech Street
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 px-5 max-w-5xl mx-auto bg-background">
        <Footer />
      </div>
    </div>
  );
};

export default Aspire;
