'use client';

import React, { useState } from 'react';
import { MailIcon, CheckIcon } from '@/components/ui/Icons';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'proposition-article',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'proposition-article', message: '' });
  };

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800 py-16 md:py-24">
        <div className="container-media">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 block">
              CONTACT & RELATIONS PRESSE
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Contacter la Rédaction
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Une piste d'enquête ? Une question sur nos publications ou une proposition de partenariat éditorial ? Écrivez-nous.
            </p>
          </div>
        </div>
      </section>

      {/* Content Form & Info */}
      <section className="container-media mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Info Left */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Bureaux & Correspondances
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                27 Rue du Faubourg Saint-Honoré<br />
                75008 Paris, France
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>Standard :</strong> +33 (0)1 42 68 55 00<br />
                <strong>Email :</strong> contact@ontario-media.fr
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <h4 className="font-heading text-sm font-bold text-zinc-900 dark:text-white mb-2">
                Confidentialité des Sources
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Pour l'envoi de documents sensibles ou de fuites de données d'intérêt public, veuillez utiliser notre clé PGP ou privilégier notre canal Signal chiffré.
              </p>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3">
                    <CheckIcon size={24} />
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-1">Message envoyé avec succès</h4>
                  <p className="text-xs">
                    Notre équipe éditoriale traitera votre demande dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-bold text-emerald-700 underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                        Votre nom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                        Votre adresse email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean@domaine.fr"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Objet du message
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="proposition-article">Proposition d'article / Enquête</option>
                      <option value="partenariat">Partenariat éditorial & Affiliation</option>
                      <option value="presse">Demande Presse & Médias</option>
                      <option value="technique">Support technique du site</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Votre message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Détaillez votre demande..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer self-start mt-2"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-media">
        <NewsletterBanner />
      </div>
    </div>
  );
}
