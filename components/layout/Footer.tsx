'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  ArrowUpIcon,
} from '@/components/ui/Icons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t py-14 lg:py-20 transition-colors" style={{ backgroundColor: 'var(--footer-bg, #f4f6f9)', borderColor: 'var(--border-color)' }}>
      <div className="container-media">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Col 1 : Marque & Présentation */}
          <div className="lg:col-span-2 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-bold shadow-sm shadow-red-500/30">
                <span className="font-heading text-base">O</span>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                ONTARIO
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Média numérique francophone de référence dédié à l’intelligence artificielle, aux ruptures technologiques, au design contemporain et aux prospectives éditoriales.
            </p>

            {/* Liens Réseaux Sociaux */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#EF4248] hover:text-white transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <TwitterIcon size={13} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#EF4248] hover:text-white transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <LinkedInIcon size={13} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#EF4248] hover:text-white transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <FacebookIcon size={13} />
              </a>
            </div>
          </div>

          {/* Col 2 : Catégories */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              CATÉGORIES
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#EF4248] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 : Rédaction & Adresse Ontario */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              NOUS TROUVER
            </h4>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>27 Division St, New York, NY 10002, United States</p>
              <a
                href="mailto:hello@mysite.com"
                className="font-semibold text-xs pt-1 hover:text-[#EF4248] transition-colors"
              >
                hello@mysite.com
              </a>
              <p className="font-semibold text-xs">0400 2345 254</p>
              <div className="pt-3">
                <Link
                  href="/admin"
                  className="text-xs font-medium text-zinc-400 hover:text-[#EF4248] transition-colors"
                >
                  Espace Éditeur Privé (/admin)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne Inférieure Copyright */}
        <div className="pt-8 mt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <p>© 2026 — ONTARIO Magazine. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#EF4248] transition-colors">
              À Propos
            </Link>
            <Link href="/contact" className="hover:text-[#EF4248] transition-colors">
              Contact
            </Link>
            <a href="/feed.xml" className="hover:text-[#EF4248] transition-colors">
              Flux RSS
            </a>
            <a href="/sitemap.xml" className="hover:text-[#EF4248] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Bouton de retour en haut de page */}
      <button
        onClick={scrollToTop}
        aria-label="Retour en haut"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border shadow-lg hover:bg-[#EF4248] hover:text-white flex items-center justify-center transition-all group cursor-pointer"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
      >
        <ArrowUpIcon size={18} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}
