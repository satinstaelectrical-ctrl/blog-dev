'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { getAuthorBySlug, AUTHORS } from '@/data/authors';
import { getArticlesByAuthor } from '@/data/articles';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import { TwitterIcon, LinkedInIcon, FacebookIcon } from '@/components/ui/Icons';
import Link from 'next/link';

export default function AuthorProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return notFound();
  }

  const articles = getArticlesByAuthor(author.slug);

  return (
    <div className="w-full pb-16">
      {/* Author Header Card */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800 py-14 md:py-20">
        <div className="container-media">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-8 ring-white dark:ring-zinc-800 shadow-xl flex-shrink-0"
            />
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
                RÉDACTEUR & CONTRIBUTEUR
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                {author.name}
              </h1>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4">
                {author.role}
              </p>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                {author.bio}
              </p>

              {/* Socials */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                {author.socials.twitter && (
                  <a
                    href={author.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-black hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <TwitterIcon size={15} />
                  </a>
                )}
                {author.socials.linkedin && (
                  <a
                    href={author.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <LinkedInIcon size={15} />
                  </a>
                )}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                >
                  <FacebookIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Publications */}
      <section className="container-media mt-12 md:mt-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Articles rédigés par {author.name} ({articles.length})
          </h2>
          <Link
            href="/blog"
            className="text-xs font-bold text-red-500 uppercase tracking-wider hover:underline"
          >
            Tous les auteurs →
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((art) => (
              <ArticleCardGrid key={art.id} article={art} badgeLabel="PUBLIÉ" />
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm text-center py-12">
            Cet auteur n'a pas encore publié d'articles.
          </p>
        )}
      </section>

      {/* Newsletter */}
      <div className="container-media">
        <NewsletterBanner />
      </div>
    </div>
  );
}
