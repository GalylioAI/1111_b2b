"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Bell, Mail, Calendar, Globe, PackageX, TrendingDown, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { SiteBadge } from "@/components/b2b/SiteBadge";
import { watchlist, alertFeed } from "@/lib/b2b";

const alertTypes = [
  { key: "threshold", label: "Seuil de prix atteint", desc: "Quand un prix passe sous votre seuil", icon: TrendingDown },
  { key: "stock", label: "Changement de disponibilité", desc: "Rupture ou retour en stock", icon: PackageX },
  { key: "competitor", label: "Nouveau concurrent", desc: "Un site commence à vendre un produit suivi", icon: UserPlus },
  { key: "seo", label: "Changement SEO / Metadata", desc: "Modification des titres ou méta-descriptions", icon: Globe },
];

export default function AlertsPage() {
  const [lists, setLists] = useState(watchlist.map((w) => w.active));
  const [types, setTypes] = useState({ threshold: true, stock: true, competitor: false, seo: true });
  const [report, setReport] = useState("weekly");

  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Alertes & Watchlist"]}
        title="Alertes & Monitoring personnalisé"
        description="Sélectionnez les sites et produits à surveiller, configurez vos déclencheurs et recevez des rapports automatiques."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Plus className="h-4 w-4" />
            Nouvelle watchlist
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          {/* Watchlists */}
          <Card title="Mes watchlists" info={false}>
            <ul className="space-y-3">
              {watchlist.map((w, i) => (
                <motion.li
                  key={w.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface2 p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accentsoft text-accent">
                    <Bell className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{w.name}</p>
                    <p className="text-xs text-ink3">{w.sites} sites · {w.products} produits · {w.rule}</p>
                  </div>
                  <Toggle checked={lists[i]} onChange={(v) => setLists((s) => s.map((x, j) => (j === i ? v : x)))} />
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* Alert types config */}
          <Card title="Types d'alertes configurables" info={false}>
            <ul className="divide-y divide-line">
              {alertTypes.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.key} className="flex items-center gap-4 py-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface2 text-ink2">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">{t.label}</p>
                      <p className="text-xs text-ink3">{t.desc}</p>
                    </div>
                    <Toggle
                      checked={types[t.key as keyof typeof types]}
                      onChange={(v) => setTypes((s) => ({ ...s, [t.key]: v }))}
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Feed */}
          <Card title="Flux d'alertes" info={false} delay={0.1}>
            <ul className="space-y-1">
              {alertFeed.map((a, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface2"
                >
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: `color-mix(in srgb, ${a.color} 16%, transparent)`, color: a.color }}>
                    <Bell className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-ink">{a.title}</p>
                    <p className="text-xs text-ink3">{a.site} · il y a {a.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* Reports */}
          <Card title="Rapports automatiques" info={false} delay={0.2}>
            <p className="mb-3 text-sm text-ink2">Synthèse envoyée par e-mail ou consultable dans le dashboard.</p>
            <div className="mb-4 grid grid-cols-2 gap-2">
              {[
                { id: "weekly", label: "Hebdomadaire", icon: Calendar },
                { id: "monthly", label: "Mensuel", icon: Calendar },
              ].map((r) => {
                const Icon = r.icon;
                const active = report === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setReport(r.id)}
                    className={`flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all ${
                      active ? "border-accent text-ink" : "border-line text-ink2 hover:border-line2"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-accent" : "text-ink3"}`} />
                    {r.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface2 p-3 text-sm">
              <Mail className="h-4 w-4 text-accent" />
              <span className="text-ink2">Envoyé à</span>
              <span className="font-medium text-ink">bessie@galylio.com</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
