'use client';

// ==============================================================================
// ONTARIO CMS — UNITÉ PUBLICITAIRE GOOGLE ADSENSE DYNAMIQUE & CONFORME
// Gère l'activation, le chargement asynchrone, les formats et l'aperçu test
// ==============================================================================

import React, { useEffect, useState } from 'react';
import { getContentStore, subscribeToContentStore, AdSenseSlotConfig, AdSenseConfig } from '@/lib/contentStore';

interface AdSenseBannerProps {
  slotId: string;
  className?: string;
  customLabel?: string;
}

export function AdSenseBanner({ slotId, className = '', customLabel }: AdSenseBannerProps) {
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig | null>(null);

  useEffect(() => {
    // Initialiser depuis le store réactif
    const store = getContentStore();
    if (store?.customization?.adsense) {
      setAdsenseConfig(store.customization.adsense);
    }

    // Écouter les modifications en direct depuis le Dashboard Admin
    const unsubscribe = subscribeToContentStore((newStore) => {
      if (newStore?.customization?.adsense) {
        setAdsenseConfig(newStore.customization.adsense);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!adsenseConfig || !adsenseConfig.enabled) {
    return null;
  }

  const slot: AdSenseSlotConfig | undefined = adsenseConfig.slots?.[slotId];
  if (!slot || !slot.enabled) {
    return null;
  }

  // Chargement asynchrone sécurisé du script officiel AdSense en mode Production
  const isTestMode = adsenseConfig.testMode;
  const publisherId = adsenseConfig.publisherId || 'ca-pub-9842187654321098';

  // Format styles & dimensions
  const getFormatClass = () => {
    switch (slot.format) {
      case 'leaderboard':
        return 'w-full max-w-[728px] min-h-[90px] mx-auto';
      case 'rectangle':
        return 'w-full max-w-[300px] min-h-[250px] mx-auto';
      case 'skyscraper':
        return 'w-full max-w-[300px] min-h-[600px] mx-auto';
      case 'fluid':
      case 'responsive':
      default:
        return 'w-full min-h-[110px] sm:min-h-[140px]';
    }
  };

  return (
    <div
      data-adsense-slot={slotId}
      className={`relative my-6 overflow-hidden rounded-2xl border transition-all ${getFormatClass()} ${className}`}
      style={{
        backgroundColor: 'var(--surface-soft)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Barre Supérieure d'Identification Pub / AdSense */}
      <div
        className="flex items-center justify-between px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider border-b"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-muted)',
          backgroundColor: 'rgba(0,0,0,0.02)',
        }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {customLabel || slot.label || 'PUBLICITÉ RECOMMANDÉE'}
        </span>
        <span className="flex items-center gap-1 text-[9px] lowercase font-semibold opacity-75">
          <span>Annonces par</span>
          <span className="font-bold text-[#4285F4]">G</span>
          <span className="font-bold text-[#EA4335]">o</span>
          <span className="font-bold text-[#FBBC05]">o</span>
          <span className="font-bold text-[#4285F4]">g</span>
          <span className="font-bold text-[#34A853]">l</span>
          <span className="font-bold text-[#EA4335]">e</span>
        </span>
      </div>

      {/* Rendu : Soit Script Réel AdSense, Soit Aperçu Éditorial Conforme */}
      {isTestMode ? (
        <div className="p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[90px]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
              AdSense Slot: {slot.adSlot}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              Format: {slot.format.toUpperCase()}
            </span>
          </div>

          <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            {slot.name}
          </p>

          <p className="text-[11px] max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            Espace monétisé actif. Les bannières Google AdSense ciblées s’afficheront dynamiquement dès l’approbation de votre identifiant éditeur <code className="text-xs font-mono">{publisherId}</code>.
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-center py-2">
          {/* Tag Officiel AdSense */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client={publisherId}
            data-ad-slot={slot.adSlot}
            data-ad-format={slot.format === 'responsive' ? 'auto' : undefined}
            data-full-width-responsive="true"
          />
        </div>
      )}
    </div>
  );
}
