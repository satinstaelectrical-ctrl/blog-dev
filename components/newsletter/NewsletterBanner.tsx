'use client';

import React, { useState } from 'react';
import { MailIcon, CheckIcon } from '@/components/ui/Icons';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="w-full my-12 md:my-16">
      <div className="relative rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 p-8 md:p-12 lg:p-14 shadow-xs">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              <MailIcon size={14} />
              NEWSLETTER HEBDOMADAIRE
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
              Abonnez-vous à notre lettre d’analyse
            </h3>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Recevez les meilleures synthèses, prospectives et enquêtes chaque semaine directement dans votre boîte. Garanti 100% sans spam.
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[380px]">
            {status === 'success' ? (
              <div className="flex items-center gap-2 p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
                <CheckIcon size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span>Merci ! Vous êtes bien inscrit à la lettre d’analyse.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email..."
                    className="w-full px-5 py-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-3 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-sm transition-all shadow-sm shadow-red-500/20 disabled:opacity-60 cursor-pointer flex-shrink-0"
                >
                  {status === 'loading' ? 'Inscription...' : "S'abonner"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
