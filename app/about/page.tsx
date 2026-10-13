import React from 'react';
import { AUTHORS } from '@/data/authors';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="w-full pb-16">
      {/* Header */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800 py-16 md:py-24">
        <div className="container-media">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 block">
              MANIFESTE ÉDITORIAL
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
              À Propos d’ONTARIO
            </h1>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Un média numérique indépendant fondé pour analyser avec rigueur et hauteur de vue les bouleversements technologiques, l’intelligence artificielle et la mutation des industries créatives.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-media mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-2xl mb-4 block">🔍</span>
            <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Indépendance Critique
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Nos enquêtes et bancs d’essai ne sont soumis à aucune validation par les constructeurs. Nos avis sont motivés par des tests reproductibles et objectifs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-2xl mb-4 block">⚡</span>
            <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Profondeur d'Analyse
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Nous fuyons le piège du clic rapide et des réécritures de communiqués de presse pour offrir des formats longs, documentés et prospectifs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-2xl mb-4 block">🎨</span>
            <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Excellence Visuelle
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Nous croyons que le journalisme exigeant mérite un écrin visuel d’exception : typographies soignées, mise en page aérée et zéro distraction invasive.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="container-media mt-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 block">
            ÉQUIPE
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
            La Rédaction ONTARIO
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUTHORS.map((author) => (
            <div
              key={author.id}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col items-center text-center group"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-zinc-100 dark:ring-zinc-800 group-hover:scale-105 transition-transform"
              />
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
                {author.name}
              </h3>
              <span className="text-xs font-semibold text-red-500 mb-3">
                {author.role}
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4">
                {author.bio}
              </p>
              <Link
                href={`/author/${author.slug}`}
                className="mt-auto text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-red-500 transition-colors"
              >
                Lire ses articles →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="container-media">
        <NewsletterBanner />
      </div>
    </div>
  );
}
