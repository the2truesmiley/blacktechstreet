import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, User, ChevronDown } from 'lucide-react';
import { teamMembers, strategicAdvisors, TeamMember } from '@/data/timeline';
import tyranceHeadshot from '@/assets/team/tyrance-headshot.png';
import josephineHeadshot from '@/assets/team/josephine-headshot.png';
import allenHeadshot from '@/assets/team/allen-headshot.png';
import smileyHeadshot from '@/assets/team/smiley-headshot.png';
import tiffanyCrutcherHeadshot from '@/assets/team/tiffany-crutcher-headshot.png';
import robertThomasHeadshot from '@/assets/team/robert-thomas-headshot.png';
import kevinGriffinHeadshot from '@/assets/team/kevin-griffin-headshot.jpg';
import seanAlexanderHeadshot from '@/assets/team/sean-alexander-headshot.jpg';

// Map team member names to their photos
const teamPhotos: Record<string, string> = {
  "Tyrance Billingsley II": tyranceHeadshot,
  "Josephine Nelms": josephineHeadshot,
  "Allen Collins": allenHeadshot,
  "Smiley Elmore III": smileyHeadshot,
  "Dr. Tiffany Crutcher": tiffanyCrutcherHeadshot,
  "Robert Thomas": robertThomasHeadshot,
  "Kevin Griffin, Ph.D.": kevinGriffinHeadshot,
  "Sean Alexander": seanAlexanderHeadshot,
};

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

function normalizeBioText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shouldOmitFirstExpandedParagraph(shortBio: string, firstParagraph: string) {
  const shortTokens = new Set(normalizeBioText(shortBio).split(' ').filter((token) => token.length > 3));
  const paragraphTokens = normalizeBioText(firstParagraph)
    .split(' ')
    .filter((token) => token.length > 3);

  if (!shortTokens.size || !paragraphTokens.length) {
    return false;
  }

  const overlappingTokens = paragraphTokens.filter((token) => shortTokens.has(token));
  return overlappingTokens.length / shortTokens.size >= 0.45;
}

function getExpandedBioContent(member: TeamMember) {
  const paragraphs = member.expandedBio
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return member.expandedBio;
  }

  return shouldOmitFirstExpandedParagraph(member.shortBio, paragraphs[0])
    ? paragraphs.slice(1).join('\n\n')
    : member.expandedBio;
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedBioContent = getExpandedBioContent(member);

  return (
    <motion.div
      key={member.name + index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div 
        className="relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-300 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 p-4 sm:p-6 md:pr-14">
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-xl overflow-hidden bg-secondary border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
              {teamPhotos[member.name] ? (
                <img 
                  src={teamPhotos[member.name]} 
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <User className="w-12 h-12 text-muted-foreground/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <h3 className="text-lg sm:text-xl font-display font-bold text-foreground break-words">
                {member.name}
              </h3>
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex self-center md:self-auto items-center justify-center md:justify-start gap-2 text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-semibold">LinkedIn</span>
                </a>
              )}
            </div>
            <p className="text-sm sm:text-base text-primary font-medium mb-3">
              {member.title}
            </p>
            
            {!isExpanded && (
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {member.shortBio}
              </p>
            )}
          </div>

          {/* Expand indicator - Desktop */}
          <div className="absolute right-4 top-8 hidden md:flex items-center justify-center">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <ChevronDown className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        </div>

        {/* Expanded bio - full width below the row */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 md:px-8 pb-2 md:pr-14">
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                  {expandedBioContent}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator - Mobile */}
        <div className="flex md:hidden items-center justify-center pb-4 pt-2 gap-2 text-xs text-muted-foreground">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          <span>{isExpanded ? 'Tap to collapse' : 'Tap to read more'}</span>
        </div>

        {/* Top border glow on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section id="team-section" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          <span className="text-primary">Our</span>{' '}
          <span className="text-foreground">Team</span>
        </h2>
      </motion.div>

      <div className="grid gap-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={member.name + index} member={member} index={index} />
        ))}
      </div>

      {strategicAdvisors.length > 0 && (
        <>
          <motion.div
            id="senior-advisors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20 mb-12 scroll-mt-24"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary">Senior</span>{' '}
              <span className="text-foreground">Advisors</span>
            </h2>
          </motion.div>
          <div className="grid gap-8">
            {strategicAdvisors.map((member, index) => (
              <TeamMemberCard key={member.name + index} member={member} index={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
