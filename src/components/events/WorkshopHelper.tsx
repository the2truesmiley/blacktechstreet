import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Msg = { role: 'user' | 'assistant'; content: string; needsTeam?: boolean; question?: string };

const SUGGESTIONS = ['Is it really free?', 'Do I need a laptop?', 'Is there childcare?', 'Where do I park?'];
const GREETING: Msg = {
  role: 'assistant',
  content: 'Hi! Ask me anything about the December 5 ASPIRE AI Workshop. If I don\u2019t know, I\u2019ll pass your question to our team.',
};

function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return (
    <>
      {parts.map((p, i) => {
        const url = p.replace(/[.,;:]+$/, '');
        if (/^https?:\/\//.test(p)) {
          const label = url.includes('tally.so') ? 'Register here' : url.includes('/aspire/parking') ? 'Parking details' : url.includes('google.com/maps') ? 'Get directions' : url;
          return <span key={i}><a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 break-words">{label}</a>{p.slice(url.length)}</span>;
        }
        if (/@/.test(p) && /^[\w.+-]+@/.test(p)) return <a key={i} href={`mailto:${url}`} className="font-medium text-primary underline underline-offset-2">{url}</a>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function ForwardForm({ question }: { question: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    const { data, error: err } = await supabase.functions.invoke('workshop-assistant', { body: { action: 'forward', question, name, email } });
    if (err || !data?.ok) { setState('error'); setError(data?.error ?? 'Could not send. Please email contact@blacktechstreet.com.'); return; }
    setState('sent');
  };

  if (state === 'sent') {
    return <p className="mt-3 flex items-center gap-2 text-sm text-primary"><CheckCircle2 className="h-4 w-4 shrink-0" />Sent. Our team will reply by email.</p>;
  }
  return (
    <form onSubmit={submit} className="mt-3 space-y-2 rounded-lg border border-border/60 bg-background/60 p-3">
      <p className="text-xs font-medium text-foreground">Want the team to reply? Leave your email.</p>
      <Input aria-label="Your name (optional)" placeholder="Name (optional)" value={name} onChange={e => setName(e.target.value)} maxLength={100} className="h-9 text-sm" />
      <div className="flex gap-2">
        <Input aria-label="Your email" type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} maxLength={200} className="h-9 text-sm" />
        <Button type="submit" size="sm" disabled={state === 'sending'} className="h-9 shrink-0">
          {state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </div>
      {state === 'error' && <p role="alert" className="text-xs text-destructive">{error}</p>}
    </form>
  );
}

export function WorkshopHelper() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (q: string) => {
    const question = q.trim();
    if (!question || loading) return;
    const history = messages.slice(1).map(({ role, content }) => ({ role, content }));
    setMessages(m => [...m, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('workshop-assistant', { body: { question, history } });
    setLoading(false);
    if (error || !data?.answer) {
      const content = data?.error ?? 'Sorry, I couldn\u2019t answer just now. Please try again, or email contact@blacktechstreet.com.';
      setMessages(m => [...m, { role: 'assistant', content }]);
      return;
    }
    setMessages(m => [...m, { role: 'assistant', content: data.answer, needsTeam: data.status === 'needs_team', question }]);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <MessageCircle className="h-5 w-5" />
          Questions? Ask here
        </button>
      )}
      {open && (
        <section
          role="dialog"
          aria-label="Workshop questions"
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(640px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border bg-primary/10 px-4 py-3">
            <div>
              <h2 className="font-display text-base font-semibold">Workshop questions</h2>
              <p className="text-xs text-muted-foreground">ASPIRE AI Workshop · December 5</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close questions">
              <X className="h-5 w-5" />
            </Button>
          </header>

          <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  m.role === 'user' ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm bg-muted text-foreground')}>
                  {m.role === 'assistant' ? <Linkified text={m.content} /> : m.content}
                  {m.needsTeam && m.question && <ForwardForm question={m.question} />}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" aria-label="Answering">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                  {[0, 150, 300].map(d => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: `${d}ms` }} />)}
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map(s => (
                  <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={e => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-border p-3">
            <Input ref={inputRef} aria-label="Your question" placeholder="Type your question..." value={input} onChange={e => setInput(e.target.value)} maxLength={600} disabled={loading} className="text-base sm:text-sm" />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send question" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="px-4 pb-2 text-[11px] text-muted-foreground">Answers come from our workshop details. Questions are saved so our team can help.</p>
        </section>
      )}
    </>
  );
}
