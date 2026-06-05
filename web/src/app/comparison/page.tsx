"use client";

import { motion } from "framer-motion";
import { ChevronDown, Check, Truck, BadgeCheck, Crown, Flame } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { SiteBadge } from "@/components/b2b/SiteBadge";
import { PriceHistoryChart } from "@/components/b2b/PriceHistoryChart";
import { comparison, fmtTND } from "@/lib/b2b";

export default function ComparisonPage() {
  const prices = comparison.rows.map((r) => r.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const spread = (((max - min) / min) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Comparaison"]}
        title="Comparaison multi-sites"
        description="Comparez un même produit sur l'ensemble des sites scrapés, côte à côte."
        action={
          <button className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
            {comparison.product}
            <ChevronDown className="h-4 w-4 text-ink3" />
          </button>
        }
      />

      {/* Product hero */}
      <Card className="mb-6" hover={false} info={false}>
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-surface2 text-3xl">📱</div>
          <div className="flex-1">
            <span className="rounded-full bg-accentsoft px-2.5 py-0.5 text-xs font-semibold text-accent">
              {comparison.category}
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-ink">
              {comparison.product}
            </h2>
            <p className="text-sm text-ink3">{comparison.brand} · suivi sur {comparison.rows.length} sites</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink3">Meilleur prix</p>
              <p className="font-display text-2xl font-bold text-good">{fmtTND(min)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink3">Prix le plus haut</p>
              <p className="font-display text-2xl font-bold text-ink">{fmtTND(max)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink3">Écart marché</p>
              <p className="font-display text-2xl font-bold text-accent">{spread}%</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Side-by-side table */}
        <Card title="Prix par site" info={false}>
          <ul className="space-y-2.5">
            {comparison.rows.map((r, i) => (
              <motion.li
                key={r.site}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`relative flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                  r.best
                    ? "border-good/40 bg-good/5"
                    : "border-line bg-surface2 hover:border-line2"
                }`}
              >
                {r.best && (
                  <span className="absolute -top-2 left-4 flex items-center gap-1 rounded-full bg-good px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Crown className="h-3 w-3" /> Meilleur prix
                  </span>
                )}
                <SiteBadge name={r.site} size={40} />
                <div className="ml-auto flex items-center gap-6">
                  <span className={`flex items-center gap-1.5 text-xs ${r.stock ? "text-good" : "text-danger"}`}>
                    <span className={`h-2 w-2 rounded-full ${r.stock ? "bg-good" : "bg-danger"}`} />
                    {r.stock ? "En stock" : "Rupture"}
                  </span>
                  <span className="hidden items-center gap-1.5 text-xs text-ink2 sm:flex">
                    <Truck className="h-3.5 w-3.5" /> {r.delivery}
                  </span>
                  {r.promo && (
                    <span className="hidden items-center gap-1 rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-semibold text-warn sm:flex">
                      <Flame className="h-3 w-3" /> {r.promo}
                    </span>
                  )}
                  <span className={`font-display text-lg font-bold ${r.best ? "text-good" : "text-ink"}`}>
                    {fmtTND(r.price)}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>

        {/* Competitiveness + matching */}
        <div className="space-y-6">
          <Card title="Score de compétitivité" info={false}>
            <div className="flex items-center gap-5">
              <div className="relative grid h-24 w-24 place-items-center">
                <svg className="h-24 w-24 -rotate-90">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="var(--surface-3)" strokeWidth="9" />
                  <motion.circle
                    cx="48" cy="48" r="40" fill="none" stroke="var(--good)" strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 40}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - 0.92) }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <span className="absolute font-display text-xl font-bold text-ink">92</span>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-good">
                  <BadgeCheck className="h-4 w-4" /> Très compétitif
                </p>
                <p className="mt-1 text-xs text-ink2">
                  Votre prix se situe parmi les 8 % les moins chers du marché pour ce produit.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Produits équivalents (matching)" info={false}>
            <ul className="space-y-2.5">
              {[
                { n: "iPhone 15 Pro 128GB", m: "98% similaire" },
                { n: "iPhone 15 Pro Max 256GB", m: "91% similaire" },
                { n: "iPhone 15 256GB", m: "87% similaire" },
              ].map((x) => (
                <li key={x.n} className="flex items-center justify-between rounded-xl border border-line bg-surface2 p-3">
                  <span className="text-sm font-medium text-ink">{x.n}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-accent">
                    <Check className="h-3.5 w-3.5" /> {x.m}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card title="Évolution des prix (14 jours)">
          <PriceHistoryChart data={comparison.history} lines={["Mytek", "Tunisianet", "Zoom"]} />
        </Card>
      </div>
    </div>
  );
}
