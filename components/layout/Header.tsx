'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchIcon, MenuIcon, XIcon, ChevronDownIcon } from '@/components/ui/Icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SpotlightSearch } from '@/components/search/SpotlightSearch';
import { CATEGORIES } from '@/data/categories';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* WRAPPER DU HEADER FLOTTANT CONFORME AU THÈME ONTARIO (CAPTURE 4) */}
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 pointer-events-none transition-all duration-300">
        <div className="container-media">
          <header
            className={`pointer-events-auto header-pill h-16 sm:h-18 px-5 sm:px-7 flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled ? 'shadow-xl shadow-black/15 bg-white/95 dark:bg-[#0e2137]/95' : ''
            }`}
          >
            {/* Logo Brand Officiel Ontario */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform">
                <span className="font-heading text-lg tracking-tighter">O</span>
                <span className="absolute w-2 h-2 rounded-full bg-white top-1.5 right-1.5" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
                ONTARIO
              </span>
            </Link>

            {/* Desktop Navigation Centrale Conforme Capture 4 */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3 text-xs font-semibold">
              {/* Home - Active pill pill-white */}
              <Link
                href="/"
                className={`px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-all ${
                  pathname === '/'
                    ? 'bg-white dark:bg-[#122b45] text-zinc-900 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-[#EF4248]'
                }`}
              >
                <span>Accueil</span>
                <ChevronDownIcon size={12} className="opacity-60" />
              </Link>

              {/* Blog avec Menu Déroulant Catégories */}
              <div
                className="relative"
                onMouseEnter={() => setBlogDropdownOpen(true)}
                onMouseLeave={() => setBlogDropdownOpen(false)}
              >
                <Link
                  href="/blog"
                  className={`px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
                    pathname.startsWith('/blog') || pathname.startsWith('/category')
                      ? 'text-[#EF4248] font-bold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-[#EF4248]'
                  }`}
                >
                  <span>Blog</span>
                  <ChevronDownIcon size={12} className="opacity-60" />
                </Link>

                {blogDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 p-2 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xl z-50">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-zinc-50 dark:hover:bg-[#122b45] transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">{cat.count}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Features / Dossiers */}
              <Link
                href="/category/intelligence-artificielle"
                className="px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 hover:text-[#EF4248] transition-colors"
              >
                <span>Features</span>
                <ChevronDownIcon size={12} className="opacity-60" />
              </Link>

              {/* À Propos */}
              <Link
                href="/about"
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  pathname === '/about' ? 'text-[#EF4248] font-bold' : 'text-zinc-600 dark:text-zinc-300 hover:text-[#EF4248]'
                }`}
              >
                À Propos
              </Link>

              {/* Shop / Comparatifs */}
              <Link
                href="/category/comparatifs"
                className="px-3 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-[#EF4248] transition-colors"
              >
                Shop
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  pathname === '/contact' ? 'text-[#EF4248] font-bold' : 'text-zinc-600 dark:text-zinc-300 hover:text-[#EF4248]'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Actions Droite */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Recherche Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                style={{ color: 'var(--text-primary)' }}
              >
                <SearchIcon size={17} />
              </button>

              {/* Sélecteur Mode Sombre Bleu Nuit */}
              <ThemeToggle />

              {/* Bouton CTA S'abonner Pilule Conforme Ontario */}
              <a
                href="#newsletter-section"
                className="hidden md:inline-flex text-xs font-bold px-5 py-2.5 rounded-full bg-[#17191D] dark:bg-white text-white dark:text-[#17191D] hover:bg-[#EF4248] dark:hover:bg-[#EF4248] dark:hover:text-white transition-all shadow-sm"
              >
                S'abonner
              </a>

              {/* Bouton Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu Mobile"
                className="lg:hidden p-2 rounded-lg cursor-pointer"
                style={{ color: 'var(--text-primary)' }}
              >
                {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </header>

          {/* Tiroir Mobile Complet */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 header-pill p-6 pointer-events-auto shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex flex-col gap-3 font-semibold text-sm">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Tous les Articles
                </Link>
                <div className="pl-3 py-1 flex flex-col gap-1 border-l-2 border-red-500/30">
                  {CATEGORIES.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#EF4248] py-1"
                    >
                      • {c.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  À Propos
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Contact
                </Link>
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <a
                    href="#newsletter-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center rounded-full bg-[#EF4248] text-white text-xs font-bold"
                  >
                    S'abonner à la Newsletter
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modale de recherche Spotlight */}
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
