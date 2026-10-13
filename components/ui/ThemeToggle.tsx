'use client';

import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setIsDark(activeDark);
    if (activeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ${className}`}
    >
      {isDark ? (
        <SunIcon size={17} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <MoonIcon size={17} className="text-zinc-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
