"use client";

import { motion } from "framer-motion";
import { Download, Flame, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/analytics/KpiCard";
import { PriceIndexChart } from "@/components/b2b/PriceIndexChart";
import { SiteBadge } from "@/components/b2b/SiteBadge";
import { TrendPill } from "@/components/b2b/TrendPill";
import { stagger, staggerItem } from "@/components/ui/Reveal";
import {
  b2bKpis,
  priceChanges,
  brands,
  topMovers,
  promotions,
  alertFeed,
  fmtTND,
} from "@/lib/b2b";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1480px]">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_330px]">
        {/* Main column */}
        <div>
          <PageHeader
            crumbs={["1111.tn", "Tableau de bord"]}
            title="Vue d'ensemble"
            description="Intelligence tarifaire B2B pour commerçants — 62 sites e-commerce tunisiens suivis en temps réel."
            action={
              <button className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                <Download className="h-4 w-4" />
                Exporter
              </button>
            }
          />

          {/* KPIs */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {b2bKpis.map((k, i) => (
              <KpiCard key={k.label} {...k} index={i} />
            ))}
          </div>

          {/* Hero chart */}
          <div className="mb-6">
            <PriceIndexChart />
          </div>

          {/* Recent changes + brand competitiveness */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card title="Changements de prix récents" info={false}
              action={
                <Link href="/tracking" className="flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80">
                  Tout voir <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <motion.ul variants={stagger} initial="hidden" animate="show" className="space-y-1">
                {priceChanges.slice(0, 6).map((c, i) => {
                  const delta = ((c.newPrice - c.oldPrice) / c.oldPrice) * 100;
                  return (
                    <motion.li
                      key={i}
                      variants={staggerItem}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface2"
                    >
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

            <Card title="Compétitivité par marque" info={false}>
              <ul className="space-y-4">
                {brands.map((b, i) => (
                  <li key={b.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-ink2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                        {b.name}
                      </span>
                      <span className="text-ink3">{b.products} produits</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.share * 3.4}%` }}
                        transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: b.color }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Right insights panel */}
        <aside className="space-y-6 xl:pt-[92px]">
          <Card title="Top mouvements" info={false} delay={0.1}>
            <ul className="space-y-3">
              {topMovers.map((m, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{m.product}</p>
                    <p className="text-xs text-ink3">{m.site}</p>
                  </div>
                  <TrendPill value={m.deltaPct} />
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Promotions détectées"
            info={false}
            delay={0.2}
            action={<Flame className="h-4 w-4 text-warn" />}
          >
            <ul className="space-y-2.5">
              {promotions.map((p, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-line bg-surface2 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-warn/15 text-warn">
                    <Flame className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{p.product}</p>
                    <p className="text-xs text-ink3">{p.site} · {p.tag}</p>
                  </div>
                  <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">
                    {p.discount}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Alertes récentes"
            info={false}
            delay={0.3}
            action={
              <Link href="/alerts" className="flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80">
                <Bell className="h-3.5 w-3.5" /> Gérer
              </Link>
            }
          >
            <ul className="space-y-3">
              {alertFeed.slice(0, 4).map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: a.color }} />
                  <div>
                    <p className="text-sm text-ink">{a.title}</p>
                    <p className="text-xs text-ink3">{a.site} · il y a {a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
