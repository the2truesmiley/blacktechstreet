import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

export type EmailCaptureSource = 'footer' | 'event-alerts' | 'resource-guide';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(5, { message: 'Enter your email address' })
    .max(255, { message: 'Email must be less than 255 characters' })
    .email({ message: 'Enter a valid email address' }),
  name: z
    .string()
    .trim()
    .max(120, { message: 'Name must be less than 120 characters' })
    .optional(),
});

interface EmailCaptureProps {
  source: EmailCaptureSource;
  detail?: string;
  showName?: boolean;
  buttonLabel?: string;
  successMessage?: string;
  placeholder?: string;
  className?: string;
  layout?: 'inline' | 'stacked';
  onSuccess?: () => void;
}

export function EmailCapture({
  source,
  detail,
  showName = false,
  buttonLabel = 'Keep me updated',
  successMessage = "You're on the list. We'll be in touch.",
  placeholder = 'you@example.com',
  className,
  layout = 'inline',
  onSuccess,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ email, name: showName ? name : undefined });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please check your details');
      return;
    }

    setStatus('submitting');
    const { error: insertError } = await supabase.from('email_signups').insert({
      email: parsed.data.email,
      name: parsed.data.name || null,
      source,
      detail: detail ?? null,
    });

    // Duplicate signups are treated as success — the address is already saved.
    if (insertError && insertError.code !== '23505') {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
      return;
    }

    setStatus('done');
    onSuccess?.();
  };

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4',
          className
        )}
      >
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </span>
        <p className="text-sm text-foreground">{successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <div
        className={cn(
          'flex gap-2',
          layout === 'stacked' ? 'flex-col' : 'flex-col sm:flex-row'
        )}
      >
        {showName && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name"
            maxLength={120}
            autoComplete="given-name"
            aria-label="First name"
            className="w-full rounded-lg border border-border/50 bg-secondary/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          maxLength={255}
          required
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={!!error}
          className="w-full rounded-lg border border-border/50 bg-secondary/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {buttonLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
