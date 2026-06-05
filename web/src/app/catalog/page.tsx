"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/b2b/Sparkline";
import { products, brands, categories, fmtTND } from "@/lib/b2b";

const filters = ["Tous", "Smartphones", "Laptops", "TV", "Audio"];

function Competitiveness({ value }: { value: number }) {
  const color = value >= 85 ? "var(--good)" : value >= 70 ? "var(--warn)" : "var(--danger)";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value}</span>
    </div>
  );
}

export default function CatalogPage() {
  const [filter, setFilter] = useState("Tous");

  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Catalogue"]}
        title="Catalogue & Matching produits"
        description="Regroupement automatique des variantes par NLP, gestion par marque et détection de nouveaux produits."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Upload className="h-4 w-4" />
            Importer un catalogue
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Products */}
        <Card title="Produits suivis" info={false}
          action={
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink3" />
              <input placeholder="Filtrer…" className="h-8 w-36 rounded-full border border-line bg-surface2 pl-8 pr-3 text-xs text-ink placeholder:text-ink3 outline-none focus:border-accent" />
            </div>
          }
        >
          {/* Category chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  filter === f ? "accent-gradient text-white" : "border border-line bg-surface2 text-ink2 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink3">
                  <th className="pb-3 font-medium">Produit</th>
                  <th className="pb-3 font-medium">Sites</th>
                  <th className="pb-3 font-medium">Prix bas</th>
                  <th className="pb-3 font-medium">Compétitivité</th>
                  <th className="pb-3 font-medium">Tendance</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-t border-line transition-colors hover:bg-surface2"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-ink">{p.name}</span>
                        {!p.inStock && (
                          <span className="rounded-full bg-danger/10 px-1.5 py-0.5 text-[10px] font-semibold text-danger">Rupture</span>
                        )}
                      </div>
                      <span className="text-xs text-ink3">{p.brand} · {p.category}</span>
                    </td>
                    <td className="py-3 text-ink2">{p.sites}</td>
                    <td className="py-3 font-semibold text-ink">{fmtTND(p.lowest)}</td>
                    <td className="py-3"><Competitiveness value={p.competitiveness} /></td>
                    <td className="py-3"><Sparkline data={p.spark} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Side: brands + categories + new */}
        <div className="space-y-6">
          <Card title="Marques suivies" info={false} delay={0.1}>
            <ul className="space-y-3">
              {brands.map((b) => (
                <li key={b.name} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-white" style={{ background: b.color }}>
                    {b.name[0]}
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">{b.name}</span>
                  <span className="text-xs text-ink3">{b.products} produits</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Catégories (NLP)" info={false} delay={0.2}>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((c) => (
                <li key={c.name} className="flex items-center justify-between rounded-xl border border-line bg-surface2 px-3 py-2.5">
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-ink3">{c.products}</span>
                    {c.newThisWeek > 0 && (
                      <span className="flex items-center gap-0.5 rounded-full bg-accentsoft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                        <Plus className="h-2.5 w-2.5" />{c.newThisWeek}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Nouveaux produits détectés" info={false} delay={0.3} action={<Sparkles className="h-4 w-4 text-accent" />}>
            <ul className="space-y-2.5">
              {[
                { n: "Galaxy Z Fold 6", s: "Tunisianet" },
                { n: "iPad Pro M4 11\"", s: "Mytek" },
                { n: "Sony WH-1000XM6", s: "Zoom" },
              ].map((x) => (
                <li key={x.n} className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span className="flex-1 font-medium text-ink">{x.n}</span>
                  <span className="text-xs text-ink3">{x.s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
