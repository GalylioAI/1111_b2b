"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, Tag, FileText, AlertCircle, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { seoScores, keywordOpportunities, seoChanges } from "@/lib/b2b";

function MiniBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 text-[11px] text-ink3">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface3">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full accent-gradient" />
      </div>
      <span className="w-6 text-right text-[11px] font-semibold text-ink2">{value}</span>
    </div>
  );
}

const diffColor: Record<string, string> = {
  Faible: "var(--good)",
  Moyenne: "var(--warn)",
  "Élevée": "var(--danger)",
};

export default function SeoPage() {
  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "SEO Intelligence"]}
        title="SEO & Metadata Intelligence"
        description="Comparez titres, méta-descriptions et balises de vos concurrents, détectez les opportunités de mots-clés."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Search className="h-4 w-4" />
            Analyser un site
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Comparative SEO scores */}
        <Card title="Analyse SEO comparative" info>
          <ul className="space-y-3">
            {seoScores.map((s, i) => {
              const you = s.site.startsWith("Vous");
              return (
                <motion.li
                  key={s.site}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`rounded-2xl border p-4 ${you ? "border-accent/40 bg-accentsoft" : "border-line bg-surface2"}`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-ink">{s.score}</span>
                    <span className="text-xs text-ink3">/100</span>
                    <span className={`text-sm font-semibold ${you ? "text-accent" : "text-ink"}`}>{s.site}</span>
                    {you && <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">VOUS</span>}
                  </div>
                  <div className="space-y-2">
                    <MiniBar label="Titres" value={s.titles} />
                    <MiniBar label="Méta-desc" value={s.meta} />
                    <MiniBar label="Mots-clés" value={s.keywords} />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </Card>

        <div className="space-y-6">
          {/* SEO change detection */}
          <Card title="Détection de changements SEO" info={false} delay={0.1}>
            <ul className="space-y-3">
              {seoChanges.map((c, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warn/15 text-warn">
                    <AlertCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm text-ink">{c.change}</p>
                    <p className="text-xs text-ink3">{c.site} · il y a {c.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* SEO score summary */}
          <Card title="Score SEO global" info={false} delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Fiches analysées", value: "1,842", icon: FileText },
                { label: "Opportunités", value: "37", icon: TrendingUp },
                { label: "Mots-clés suivis", value: "412", icon: Tag },
                { label: "Score moyen", value: "79", icon: Search },
              ].map((x) => {
                const Icon = x.icon;
                return (
                  <div key={x.label} className="rounded-2xl border border-line bg-surface2 p-3.5">
                    <Icon className="mb-2 h-4 w-4 text-accent" />
                    <p className="font-display text-xl font-bold text-ink">{x.value}</p>
                    <p className="text-xs text-ink3">{x.label}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Keyword opportunities */}
      <div className="mt-6">
        <Card title="Opportunités de mots-clés" info>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink3">
                  <th className="pb-3 font-medium">Mot-clé</th>
                  <th className="pb-3 font-medium">Volume / mois</th>
                  <th className="pb-3 font-medium">Difficulté</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {keywordOpportunities.map((k, i) => (
                  <motion.tr key={k.keyword} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="border-t border-line">
                    <td className="py-3 font-medium text-ink">{k.keyword}</td>
                    <td className="py-3 text-ink2">{k.volume}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: diffColor[k.difficulty] }}>
                        <span className="h-2 w-2 rounded-full" style={{ background: diffColor[k.difficulty] }} />
                        {k.difficulty}
                      </span>
                    </td>
                    <td className="py-3">
                      {k.used ? (
                        <span className="rounded-full bg-surface3 px-2.5 py-1 text-xs font-medium text-ink2">Déjà exploité</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accentsoft px-2.5 py-1 text-xs font-semibold text-accent">
                          <Plus className="h-3 w-3" /> Opportunité
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
