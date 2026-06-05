"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { plans } from "@/lib/b2b";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        crumbs={["1111.tn", "Tarifs"]}
        title="Plans & Abonnement"
        description="Choisissez le plan adapté à votre activité — de l'indépendant aux grands groupes."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col rounded-[var(--radius)] border p-6 transition-all ${
              p.highlight
                ? "border-accent bg-surface shadow-[0_30px_70px_-30px_var(--accent-glow)] xl:-translate-y-3"
                : "border-line bg-surface card-hover"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full accent-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                <Sparkles className="h-3 w-3" /> Populaire
              </span>
            )}

            <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
            <p className="mt-0.5 text-xs text-ink3">{p.target}</p>

            <div className="mt-4 flex items-end gap-1">
              {p.price === "Sur devis" ? (
                <span className="font-display text-2xl font-bold text-ink">Sur devis</span>
              ) : (
                <>
                  <span className="font-display text-4xl font-bold text-ink">{p.price}</span>
                  <span className="mb-1 text-sm text-ink3">TND / mois</span>
                </>
              )}
            </div>

            <ul className="mt-5 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink2">
                  <span className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full ${p.highlight ? "accent-gradient" : "bg-accentsoft"}`} style={{ width: 18, height: 18 }}>
                    <Check className={`h-3 w-3 ${p.highlight ? "text-white" : "text-accent"}`} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95 ${
                p.highlight
                  ? "accent-gradient text-white shadow-[0_12px_28px_-10px_var(--accent-glow)]"
                  : "border border-line bg-surface2 text-ink hover:border-accent hover:text-accent"
              }`}
            >
              {p.price === "Sur devis" ? "Nous contacter" : "Choisir ce plan"}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink3">
        Pour toute information commerciale :{" "}
        <a href="mailto:company@galylio.com" className="font-medium text-accent">company@galylio.com</a>
        {" · "}
        <span className="text-ink2">1111.tn par Galylio</span>
      </p>
    </div>
  );
}
