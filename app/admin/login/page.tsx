'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  authenticateAdmin,
  getAdminSession,
  checkLockout,
  resetPasswordWithRecoveryCode,
} from '@/lib/auth';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lockoutSec, setLockoutSec] = useState(0);

  // Vue Mot de passe oublié
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  // Redirection automatique si déjà connecté
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      router.replace('/admin/dashboard');
    }

    const lockout = checkLockout();
    if (lockout.locked) {
      setLockoutSec(lockout.remainingSec);
    }
  }, [router]);

  // Décompte de verrouillage
  useEffect(() => {
    if (lockoutSec <= 0) return;
    const interval = setInterval(() => {
      setLockoutSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMessage('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSec]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await authenticateAdmin(email, password);
      if (res.success && res.session) {
        // Redirection immédiate vers le Dashboard CMS
        router.replace('/admin/dashboard');
      } else {
        setErrorMessage(res.error || 'Identifiants invalides');
        const lockout = checkLockout();
        if (lockout.locked) {
          setLockoutSec(lockout.remainingSec);
        }
      }
    } catch {
      setErrorMessage('Une erreur inattendue est survenue lors de la connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (demoRole: 'admin' | 'editor') => {
    if (demoRole === 'admin') {
      setEmail('admin@ontario.com');
      setPassword('admin2026!');
    } else {
      setEmail('editor@ontario.com');
      setPassword('editor2026!');
    }
    setErrorMessage('');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setIsForgotLoading(true);

    try {
      const res = await resetPasswordWithRecoveryCode(forgotEmail, recoveryCode, newPassword);
      if (res.success) {
        setForgotSuccess('Mot de passe mis à jour avec succès ! Vous pouvez maintenant vous connecter.');
        setTimeout(() => {
          setIsForgotModalOpen(false);
          setPassword(newPassword);
          setEmail(forgotEmail);
          setForgotSuccess('');
        }, 1500);
      } else {
        setForgotError(res.error || 'Erreur lors de la réinitialisation');
      }
    } catch {
      setForgotError('Erreur de réinitialisation.');
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#071426] text-white p-4 relative overflow-hidden font-sans selection:bg-[#EF4248] selection:text-white">
      {/* Arrière-plan décoratif subtil */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#EF4248]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Conteneur principal centré */}
      <div className="w-full max-w-md relative z-10">
        {/* En-tête Marque */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-2.5 group mb-3">
            <div className="w-10 h-10 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
              <span className="font-heading text-xl">O</span>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
              ONTARIO
            </span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase text-zinc-300 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#EF4248] animate-pulse" />
            Portail CMS Administrateur
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Espace de gestion éditoriale, publication et personnalisation du site
          </p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-[#0E2137]/90 backdrop-blur-xl border border-[#28445E] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/60 relative">
          {/* Alerte Verrouillage */}
          {lockoutSec > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
              <span className="text-base">⏳</span>
              <div>
                <p className="font-bold">Accès temporairement verrouillé</p>
                <p className="text-[11px] text-amber-200/80 mt-0.5">
                  Veuillez patienter <b>{lockoutSec} secondes</b> avant de réessayer.
                </p>
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {errorMessage && lockoutSec === 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-3 animate-shake">
              <span className="text-base">⚠️</span>
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Adresse Email Administrateur
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  disabled={isLoading || lockoutSec > 0}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ontario.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#122B45] border border-[#28445E] text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#EF4248] focus:ring-1 focus:ring-[#EF4248] transition-all disabled:opacity-50"
                />
                <span className="absolute right-4 top-3.5 text-zinc-400 text-sm">✉️</span>
              </div>
            </div>

            {/* Champ Mot de passe avec toggle Masquer/Afficher */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Mot de Passe
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-[#EF4248] hover:text-red-400 font-semibold transition-colors cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLoading || lockoutSec > 0}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#122B45] border border-[#28445E] text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#EF4248] focus:ring-1 focus:ring-[#EF4248] transition-all disabled:opacity-50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-white transition-colors p-1"
                  aria-label={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Se souvenir de moi */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-[#EF4248] bg-[#122B45] border-[#28445E]"
              />
              <label htmlFor="remember" className="text-xs text-zinc-400 cursor-pointer select-none">
                Maintenir ma session active sur cet appareil (24h)
              </label>
            </div>

            {/* Bouton de Soumission */}
            <button
              type="submit"
              disabled={isLoading || lockoutSec > 0}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#EF4248] hover:bg-[#DA343A] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Authentification en cours...</span>
                </>
              ) : (
                <>
                  <span>Accéder au Dashboard CMS</span>
                  <span className="text-base">→</span>
                </>
              )}
            </button>
          </form>

          {/* Raccourcis de test rapide */}
          <div className="mt-8 pt-6 border-t border-[#28445E]/70 text-center">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
              Identifiants de démonstration autorisés
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 font-medium transition-colors"
              >
                👑 <b>Admin :</b> admin@ontario.com
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('editor')}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 font-medium transition-colors"
              >
                ✏️ <b>Éditeur :</b> editor@ontario.com
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">
              Mot de passe par défaut : <code className="text-zinc-400">admin2026!</code> ou <code className="text-zinc-400">editor2026!</code>
            </p>
          </div>
        </div>

        {/* Pied de page & retour site public */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-[#EF4248] transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Retour au site public ONTARIO</span>
          </Link>
        </div>
      </div>

      {/* MODALE MOT DE PASSE OUBLIÉ */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0E2137] border border-[#28445E] rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-lg">Récupération d'Accès Sécurisé</h3>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs">
                ✓ {forgotSuccess}
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Entrez votre email administrateur, votre code de récupération système (<code className="text-[#EF4248]">ONTARIO-2026-ROOT</code> ou <code className="text-[#EF4248]">ONTARIO-RESET</code>), et choisissez votre nouveau mot de passe.
                </p>

                {forgotError && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
                    {forgotError}
                  </div>
                )}

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Email Administrateur</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@ontario.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Code de Récupération Sécurisé</label>
                  <input
                    type="text"
                    required
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    placeholder="ONTARIO-2026-ROOT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Nouveau Mot de Passe (min. 8 caractères)</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {isForgotLoading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
