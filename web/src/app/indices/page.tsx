"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { TrendPill } from "@/components/b2b/TrendPill";
import { GlobalIndexCard } from "@/components/indices/GlobalIndexCard";
import { IndicatorCard } from "@/components/indices/IndicatorCard";
import { CategoryTrendsChart } from "@/components/indices/CategoryTrendsChart";
import { indicators, summaryRows } from "@/lib/indices";

export default function IndicesPage() {
  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Indices Marché"]}
        title="Indices du marché"
        description="Indicateurs d'intelligence marché calculés quotidiennement à partir de plus de 15 000 SKUs e-commerce."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Download className="h-4 w-4" />
            Exporter
          </button>
        }
      />

      {/* SECTION 1 — Global Market Index */}
      <GlobalIndexCard />

      {/* SECTION 2 — Indicators grid */}
      <div className="mt-8 mb-4 flex items-center gap-3">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">Indicateurs du marché</h2>
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs text-ink3">{indicators.length} indicateurs</span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {indicators.map((ind, i) => (
          <IndicatorCard key={ind.key} ind={ind} index={i} />
        ))}
      </div>

      {/* SECTION 3 — Category analysis */}
      <div className="mt-8 mb-4 flex items-center gap-3">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">Analyse par catégorie</h2>
        <span className="h-px flex-1 bg-line" />
      </div>
      <CategoryTrendsChart />

      {/* SECTION 4 — Summary table */}
      <div className="mt-8 mb-4 flex items-center gap-3">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">Tableau récapitulatif</h2>
        <span className="h-px flex-1 bg-line" />
      </div>
      <Card info={false} bodyClassName="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink3">
              <th className="pb-3 pr-4 font-medium">Indicateur</th>
              <th className="pb-3 pr-4 font-medium">Valeur</th>
              <th className="pb-3 pr-4 font-medium">24 h</th>
              <th className="pb-3 pr-4 font-medium">7 j</th>
              <th className="pb-3 pr-4 font-medium">Formule</th>
              <th className="pb-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {summaryRows.map((row, i) => (
              <motion.tr
                key={row.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.03 }}
                className={`border-t border-line align-top transition-colors hover:bg-surface2 ${
                  row.key === "global" ? "bg-accentsoft/40" : ""
                }`}
              >
                <td className="py-3 pr-4">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    {row.key === "global" && <span className="h-2 w-2 shrink-0 rounded-full accent-gradient" />}
                    {row.name}
                  </span>
                </td>
                <td className="py-3 pr-4 font-display font-bold text-ink">{row.value}</td>
                <td className="py-3 pr-4"><TrendPill value={row.change24h} invert={row.goodUp} /></td>
                <td className="py-3 pr-4"><TrendPill value={row.change7d} invert={row.goodUp} /></td>
                <td className="py-3 pr-4">
                  <code className="whitespace-nowrap font-mono text-[11px] text-ink2">{row.formula}</code>
                </td>
                <td className="py-3 text-xs text-ink3">{row.description}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
