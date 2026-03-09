import { cn } from '@/lib/utils';

interface PartnerCardProps {
  name: string;
  logo?: string;
  needsLightBg?: boolean;
  link?: string;
  nofollow?: boolean;
  logoWidth?: string;
}

export function PartnerCard({ name, logo, needsLightBg, link, nofollow, logoWidth = 'w-[150px]' }: PartnerCardProps) {
  const cardContent = (
    <div className={cn(
      "relative h-52 p-8 rounded-xl",
      "bg-card/50 backdrop-blur-sm",
      "border border-border/30 hover:border-primary/40",
      "flex items-center justify-center",
      "transition-all duration-300"
    )}>
      <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={cn(
        "relative z-10 flex items-center justify-center px-4 py-3 rounded-lg",
        needsLightBg && "bg-white/90"
      )}>
        {logo ? (
          <img
            src={logo}
            alt={name}
            loading="lazy"
            className={cn(logoWidth, "h-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110")}
          />
        ) : (
          <span className="text-lg font-bold text-foreground text-center leading-tight">{name}</span>
        )}
      </div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-card border border-border/50 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
        {name}
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel={`noopener noreferrer${nofollow ? ' nofollow' : ''}`}
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
