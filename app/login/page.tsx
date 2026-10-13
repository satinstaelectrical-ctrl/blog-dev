'use client';

// ==============================================================================
// ONTARIO — ESPACE LECTEUR DÉDIÉ (/login)
// Gestion de compte lecteur, articles enregistrés, profil et newsletter
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContentStore, ContentStoreState } from '@/lib/contentStore';
import { Article } from '@/types';

interface ReaderSession {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[]; // slugs
  newsletterSubscribed: boolean;
  frequency: 'daily' | 'weekly';
  topics: string[];
}

const DEFAULT_READER: ReaderSession = {
  id: 'reader-1',
  name: 'Alexandre Rivière',
  email: 'lecteur@ontario.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  favorites: [
    'next-gen-marketing-innovative-strategies',
    'advanced-techniques-abstract-digital-design',
    'colorful-packaging-crypto-branding',
  ],
  newsletterSubscribed: true,
  frequency: 'weekly',
  topics: ['Intelligence Artificielle', 'Technologie', 'Design & Culture'],
};

export default function ReaderLoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [reader, setReader] = useState<ReaderSession | null>(null);
  const [store, setStore] = useState<ContentStoreState | null>(null);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNewsletter, setRegNewsletter] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setStore(getContentStore());
    const saved = localStorage.getItem('ontario_reader_user');
    if (saved) {
      try {
        setReader(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    // Démo : accepte ou initialise le compte lecteur
    const existing: ReaderSession = reader || {
      ...DEFAULT_READER,
      email: loginEmail,
      name: loginEmail.split('@')[0],
    };
    existing.email = loginEmail;

    localStorage.setItem('ontario_reader_user', JSON.stringify(existing));
    setReader(existing);
    setMessage('✓ Bienvenue sur votre Espace Lecteur.');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;

    const newReader: ReaderSession = {
      id: `reader-${Date.now()}`,
      name: regName,
      email: regEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      favorites: ['next-gen-marketing-innovative-strategies'],
      newsletterSubscribed: regNewsletter,
      frequency: 'weekly',
      topics: ['Intelligence Artificielle', 'Technologie'],
    };

    localStorage.setItem('ontario_reader_user', JSON.stringify(newReader));
    setReader(newReader);
    setMessage('✓ Votre compte lecteur a été créé avec succès.');
  };

  const handleDemoFill = () => {
    setLoginEmail('lecteur@ontario.com');
    setLoginPassword('lecteur2026');
  };

  const handleLogout = () => {
    localStorage.removeItem('ontario_reader_user');
    setReader(null);
    setMessage('Vous êtes déconnecté de votre compte lecteur.');
  };

  const handleToggleNewsletter = () => {
    if (!reader) return;
    const updated = { ...reader, newsletterSubscribed: !reader.newsletterSubscribed };
    setReader(updated);
    localStorage.setItem('ontario_reader_user', JSON.stringify(updated));
    setMessage(`Préférences newsletter mises à jour : ${updated.newsletterSubscribed ? 'Abonné' : 'Désabonné'}.`);
  };

  const handleRemoveFavorite = (slug: string) => {
    if (!reader) return;
    const updated = { ...reader, favorites: reader.favorites.filter((f) => f !== slug) };
    setReader(updated);
    localStorage.setItem('ontario_reader_user', JSON.stringify(updated));
  };

  const favoriteArticles: Article[] = (store?.articles || []).filter((a) =>
    reader?.favorites?.includes(a.slug)
  );

  return (
    <div className="w-full min-h-[85vh] py-12 md:py-20 flex flex-col justify-center">
      <div className="container-media max-w-4xl mx-auto">
        {/* Navigation fil d'Ariane */}
        <div className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:text-[#EF4248] transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>Espace Lecteur</span>
        </div>

        {/* Message d'état */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage(null)} className="text-sm font-bold">✕</button>
          </div>
        )}

        {/* VUE 1 : LECTEUR CONNECTÉ (DASHBOARD LECTEUR) */}
        {reader ? (
          <div className="rounded-3xl border p-6 sm:p-10 shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            {/* Profil Top Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img
                  src={reader.avatar}
                  alt={reader.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-[#EF4248]/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold font-heading" style={{ color: 'var(--text-primary)' }}>
                      {reader.name}
                    </h1>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4248]/10 text-[#EF4248] uppercase">
                      Lecteur Vérifié
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {reader.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full border text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all cursor-pointer"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  Se Déconnecter
                </button>
              </div>
            </div>

            {/* Grille 2 Colonnes : Favoris & Préférences Newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              {/* Colonne 1 : Articles Enregistrés (7 cols) */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span>📑 Mes Articles Enregistrés</span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] text-[#EF4248] font-bold">
                      {favoriteArticles.length}
                    </span>
                  </h2>
                </div>

                {favoriteArticles.length === 0 ? (
                  <div className="p-8 rounded-2xl border text-center text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    <p className="text-2xl mb-2">🔖</p>
                    <p className="font-semibold">Aucun article enregistré pour le moment.</p>
                    <p className="mt-1">Cliquez sur le signet d’un article pour le conserver ici et le lire plus tard.</p>
                    <Link href="/blog" className="inline-block mt-4 text-[#EF4248] hover:underline font-bold">
                      Explorer les articles récents →
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {favoriteArticles.map((art) => (
                      <div
                        key={art.id}
                        className="flex items-center gap-4 p-3 rounded-2xl border transition-all hover:border-[#EF4248]/40 group"
                        style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}
                      >
                        <img
                          src={art.coverImage}
                          alt={art.title}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#EF4248] uppercase tracking-wider">
                            {art.category.name}
                          </span>
                          <Link href={`/article/${art.slug}`}>
                            <h3 className="font-heading font-bold text-xs truncate group-hover:text-[#EF4248] transition-colors" style={{ color: 'var(--text-primary)' }}>
                              {art.title}
                            </h3>
                          </Link>
                          <span className="text-[10px] text-zinc-400">
                            {art.readingTime} min de lecture
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(art.slug)}
                          title="Retirer des favoris"
                          className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Colonne 2 : Newsletter & Paramètres (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
                  <h3 className="font-heading font-bold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span>✉️ Abonnement Newsletter</span>
                  </h3>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Recevez nos analyses prospectives et veilles technologiques directement dans votre boîte mail.
                  </p>

                  <div className="flex items-center justify-between p-3 rounded-xl border bg-white dark:bg-zinc-900" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Alertes Éditoriales ONTARIO
                    </span>
                    <button
                      onClick={handleToggleNewsletter}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        reader.newsletterSubscribed ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          reader.newsletterSubscribed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t text-[11px] space-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    <p>Fréquence : <b>{reader.frequency === 'weekly' ? 'Hebdomadaire (Vendredi)' : 'Quotidienne'}</b></p>
                    <p>Statut : <b className={reader.newsletterSubscribed ? 'text-emerald-500' : 'text-zinc-400'}>{reader.newsletterSubscribed ? 'Actif' : 'Inactif'}</b></p>
                  </div>
                </div>

                {/* Lien Séparé vers l'administration pour l'administrateur */}
                <div className="p-5 rounded-2xl border bg-gradient-to-br from-[#071426] to-[#0E2137] text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#EF4248] uppercase tracking-wider mb-1">
                    <span>👑 Équipe Rédactionnelle</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm mb-1">
                    Espace Administrateur CMS
                  </h4>
                  <p className="text-[11px] text-zinc-300 mb-3">
                    Vous possédez des droits d’administrateur ou d’éditeur ? Accédez à la console WordPress complète pour gérer le site et les publicités.
                  </p>
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>Accéder au CMS Administrateur</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VUE 2 : FORMULAIRE DE CONNEXION / INSCRIPTION DÉDIÉ (SANS POPUP) */
          <div className="max-w-md mx-auto w-full rounded-3xl border p-8 sm:p-10 shadow-xl" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            {/* Logo & Titre */}
            <div className="text-center mb-8">
              <span className="font-heading font-black text-2xl tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                ONTARIO<span className="text-[#EF4248]">.</span>
              </span>
              <h1 className="font-heading font-bold text-xl mt-2" style={{ color: 'var(--text-primary)' }}>
                Espace Lecteur Privilégié
              </h1>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Sauvegardez vos lectures et participez aux échanges éditoriaux
              </p>
            </div>

            {/* Onglets Connexion / Inscription */}
            <div className="flex p-1 rounded-2xl mb-6 border" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[#EF4248] text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
                }`}
              >
                Se Connecter
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-[#EF4248] text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
                }`}
              >
                Créer un Compte
              </button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="lecteur@ontario.com"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
                    style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                    Mot de Passe
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
                    style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm transition-all shadow-md mt-2 cursor-pointer"
                >
                  Accéder à mon Espace Lecteur
                </button>

                {/* Accès Démo Rapide */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="w-full py-2 rounded-xl border text-xs font-semibold text-zinc-500 hover:text-[#EF4248] hover:border-[#EF4248]/30 transition-all cursor-pointer"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    ⚡ Remplir avec les identifiants Lecteur Démo
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
                    style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="jean.dupont@email.fr"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
                    style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                    Créer un Mot de Passe
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimum 8 caractères"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
                    style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={regNewsletter}
                    onChange={(e) => setRegNewsletter(e.target.checked)}
                    className="mt-0.5 rounded text-[#EF4248] focus:ring-[#EF4248]"
                  />
                  <span>Je souhaite m’abonner à la newsletter hebdomadaire ONTARIO.</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm transition-all shadow-md mt-2 cursor-pointer"
                >
                  Créer mon Compte Lecteur
                </button>
              </form>
            )}

            {/* Séparation étanche vers l'Administration */}
            <div className="mt-8 pt-6 border-t text-center text-xs space-y-2" style={{ borderColor: 'var(--border-color)' }}>
              <p style={{ color: 'var(--text-muted)' }}>
                Vous êtes membre de l'équipe éditoriale ou administrateur ?
              </p>
              <Link
                href="/admin/login"
                className="text-[#EF4248] hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>🔐 Connexion Administrateur CMS (/admin/login) →</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
