import React from 'react';

export interface AffiliateProductProps {
  productName: string;
  brand: string;
  description: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  imageUrl: string;
  merchantName?: string;
  affiliateUrl: string;
  buttonText?: string;
  disclaimer?: string;
}

export function AffiliateProductCard({
  productName,
  brand,
  description,
  features = [],
  pros = [],
  cons = [],
  imageUrl,
  merchantName = 'Amazon',
  affiliateUrl,
  buttonText = 'Voir l’offre sur Amazon',
  disclaimer = 'Lien affilié conforme — Nous pouvons percevoir une commission éditoriale sans surcoût pour vous.',
}: AffiliateProductProps) {
  // Sécurisation du protocole HTTPS obligatoire
  let safeUrl = '#';
  try {
    const parsed = new URL(affiliateUrl);
    if (parsed.protocol === 'https:') {
      safeUrl = parsed.toString();
    }
  } catch {
    safeUrl = '#';
  }

  return (
    <div className="affiliate-card p-6 sm:p-8 my-8 border shadow-xs" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
      {/* Badge éditorial supérieur */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4248]" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#EF4248]">
          PRODUIT RECOMMANDÉ PAR LA RÉDACTION
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Visuel Produit */}
        <div className="w-40 h-40 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 p-2 border flex-shrink-0 flex items-center justify-center shadow-xs" style={{ borderColor: 'var(--border-color)' }}>
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Détails et Caractéristiques */}
        <div className="flex-1 min-w-0">
          <h4 className="font-heading text-xl font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            {productName}
          </h4>
          <span className="text-xs font-semibold block mb-2" style={{ color: 'var(--text-muted)' }}>
            {brand} • Distributeur agréé : {merchantName}
          </span>
          <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>

          {/* Points forts */}
          {features.length > 0 && (
            <ul className="text-xs space-y-1.5 mb-4" style={{ color: 'var(--text-secondary)' }}>
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#EF4248] font-bold">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Avantages & Inconvénients facultatifs */}
          {(pros.length > 0 || cons.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
              {pros.length > 0 && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <b className="block mb-1 font-bold">Points Forts :</b>
                  <ul className="space-y-1">
                    {pros.map((p, i) => <li key={i}>+ {p}</li>)}
                  </ul>
                </div>
              )}
              {cons.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                  <b className="block mb-1 font-bold">À surveiller :</b>
                  <ul className="space-y-1">
                    {cons.map((c, i) => <li key={i}>- {c}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Bouton d'affiliation et Mention légale obligatoire */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <a
              href={safeUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {buttonText} →
            </a>
            <span className="text-[10px] leading-tight" style={{ color: 'var(--text-muted)' }}>
              {disclaimer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
