'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchIcon, MenuIcon, XIcon } from '@/components/ui/Icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SpotlightSearch } from '@/components/search/SpotlightSearch';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Intelligence Artificielle', href: '/category/intelligence-artificielle' },
    { label: 'Technologie', href: '/category/technologie' },
    { label: 'Guides', href: '/category/guides' },
    { label: 'Comparatifs', href: '/category/comparatifs' },
    { label: 'À Propos', href: '/about' },
  ];

  return (
    <>
      {/* WRAPPER DU HEADER FLOTTANT CONFORME AU THÈME ONTARIO */}
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 pointer-events-none transition-all duration-300">
        <div className="container-media">
          <header
            className={`pointer-events-auto header-pill h-16 sm:h-18 px-5 sm:px-7 flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled
                ? 'shadow-lg shadow-black/10'
                : ''
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

            {/* Desktop Navigation Centrale */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[#EF4248] font-bold'
                        : 'hover:text-[#EF4248]'
                    }`}
                    style={{ color: isActive ? '#EF4248' : 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions Droite */}
            <div className="flex items-center gap-2 sm:gap-3.5">
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

              {/* Bouton CTA Newsletter Pilule */}
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
                className="lg:hidden p-2 rounded-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </header>

          {/* Tiroir Mobile */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 header-pill p-6 pointer-events-auto">
              <div className="flex flex-col gap-3 font-semibold text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[#EF4248] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {link.label}
                  </Link>
                ))}
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
