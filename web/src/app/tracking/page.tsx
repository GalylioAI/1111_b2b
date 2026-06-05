"use client";

import { motion } from "framer-motion";
import { BellPlus, TrendingDown, TrendingUp, PackageX, Flame } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { SiteBadge } from "@/components/b2b/SiteBadge";
import { TrendPill } from "@/components/b2b/TrendPill";
import { PriceHistoryChart } from "@/components/b2b/PriceHistoryChart";
import { stagger, staggerItem } from "@/components/ui/Reveal";
import { priceChanges, comparison, products, promotions, fmtTND } from "@/lib/b2b";

const miniStats = [
  { label: "Changements aujourd'hui", value: "327", icon: TrendingDown, color: "var(--accent)" },
  { label: "Baisses de prix", value: "198", icon: TrendingDown, color: "var(--good)" },
  { label: "Hausses de prix", value: "129", icon: TrendingUp, color: "var(--danger)" },
  { label: "Ruptures détectées", value: "12", icon: PackageX, color: "var(--warn)" },
];

const outOfStock = products.filter((p) => !p.inStock);

export default function TrackingPage() {
  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Suivi des prix"]}
        title="Suivi des prix en temps réel"
        description="Alertes instantanées sur toute variation de prix, rupture de stock ou promotion chez vos concurrents."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <BellPlus className="h-4 w-4" />
            Configurer une alerte
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {miniStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card card-hover flex items-center gap-3 p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color }}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-ink">{s.value}</p>
                <p className="text-xs text-ink3">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Live feed */}
        <Card
          title="Flux de changements en temps réel"
          info={false}
          action={
            <span className="flex items-center gap-1.5 text-xs font-medium text-good">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
              </span>
              En direct
            </span>
          }
        >
          <motion.ul variants={stagger} initial="hidden" animate="show" className="space-y-1">
            {priceChanges.map((c, i) => {
              const delta = ((c.newPrice - c.oldPrice) / c.oldPrice) * 100;
              return (
                <motion.li key={i} variants={staggerItem} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface2">
                  <SiteBadge name={c.site} showName={false} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{c.product}</p>
                    <p className="text-xs text-ink3">{c.brand} · {c.site} · il y a {c.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">{fmtTND(c.newPrice)}</p>
                    <p className="text-xs text-ink3 line-through">{fmtTND(c.oldPrice)}</p>
                  </div>
                  <TrendPill value={delta} />
                </motion.li>
              );
            })}
          </motion.ul>
        </Card>

        {/* Side */}
        <div className="space-y-6">
          <Card title="Ruptures de stock" info={false} delay={0.1} action={<PackageX className="h-4 w-4 text-warn" />}>
            <ul className="space-y-2.5">
              {[...outOfStock, products[4]].slice(0, 3).map((p, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-line bg-surface2 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-danger/15 text-danger">
                    <PackageX className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                    <p className="text-xs text-ink3">{p.brand} · indisponible</p>
                  </div>
                  <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-semibold text-danger">Rupture</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Promotions actives" info={false} delay={0.2} action={<Flame className="h-4 w-4 text-warn" />}>
            <ul className="space-y-2.5">
              {promotions.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <SiteBadge name={p.site} showName={false} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{p.product}</p>
                    <p className="text-xs text-ink3">{p.tag}</p>
                  </div>
                  <span className="rounded-full bg-warn/15 px-2 py-0.5 text-xs font-bold text-warn">{p.discount}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Price history */}
      <div className="mt-6">
        <Card
          title="Historique des prix — iPhone 15 Pro 256GB"
          action={
            <div className="flex items-center gap-3 text-xs text-ink2">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E2001A" }} /> Mytek</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: "#0A6CB5" }} /> Tunisianet</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E11D74" }} /> Zoom</span>
            </div>
          }
        >
          <PriceHistoryChart data={comparison.history} lines={["Mytek", "Tunisianet", "Zoom"]} />
        </Card>
      </div>
    </div>
  );
}
