"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { Donut } from "@/components/b2b/Donut";
import { heatmap, marketTrend, stabilityIndex, marketShare } from "@/lib/b2b";

function cellStyle(v: number) {
  const diff = v - 100;
  const color = diff <= 0 ? "var(--good)" : "var(--danger)";
  const intensity = Math.min(Math.abs(diff) * 7, 70);
  return {
    background: `color-mix(in srgb, ${color} ${intensity}%, var(--surface))`,
    color: intensity > 38 ? "#fff" : "var(--ink)",
  };
}

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Analytics & BI"]}
        title="Analytics & Business Intelligence"
        description="Carte de chaleur des prix, tendances marché, stabilité tarifaire et part de marché estimée."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Download className="h-4 w-4" />
            Exporter
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Heatmap */}
        <Card title="Carte de chaleur des prix" >
          <p className="mb-4 text-xs text-ink3">
            Indice 100 = moyenne marché · <span className="text-good">vert = moins cher</span> · <span className="text-danger">rouge = plus cher</span>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-separate" style={{ borderSpacing: "4px" }}>
              <thead>
                <tr>
                  <th />
                  {heatmap.sites.map((s) => (
                    <th key={s} className="pb-1 text-center text-[11px] font-medium text-ink3">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmap.cats.map((cat, r) => (
                  <tr key={cat}>
                    <td className="pr-2 text-right text-xs font-medium text-ink2 whitespace-nowrap">{cat}</td>
                    {heatmap.data[r].map((v, c) => (
                      <td key={c}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (r * heatmap.sites.length + c) * 0.02 }}
                          className="grid h-11 place-items-center rounded-lg text-xs font-semibold"
                          style={cellStyle(v)}
                        >
                          {v}
                        </motion.div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Market share */}
        <Card title="Part de marché estimée" info>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Donut segments={marketShare} centerTop="62" centerSub="sites" />
            <ul className="flex-1 space-y-3">
              {marketShare.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="flex-1 text-sm text-ink">{s.name}</span>
                  <span className="text-sm font-semibold text-ink">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Trends */}
        <Card title="Tendances marché"
          action={
            <div className="flex items-center gap-3 text-xs text-ink2">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent" /> Électronique</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent3" /> Mode</span>
            </div>
          }
        >
          <div className="h-[280px] w-full">
            <ClientOnly>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrend} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trendA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="4 6" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--ink-3)" }} dy={8} />
                  <YAxis domain={[90, 112]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--ink-3)" }} width={40} />
                  <Tooltip
                    contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 12 }}
                    labelStyle={{ color: "var(--ink)" }}
                  />
                  <Area type="monotone" dataKey="electronique" stroke="var(--accent)" strokeWidth={3} fill="url(#trendA)" animationDuration={1400} />
                  <Area type="monotone" dataKey="mode" stroke="var(--accent-3)" strokeWidth={2.5} strokeDasharray="5 5" fill="transparent" animationDuration={1400} />
                </AreaChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
        </Card>

        {/* Stability */}
        <Card title="Indice de stabilité des prix" info>
          <ul className="space-y-4">
            {stabilityIndex.map((s, i) => {
              const color = s.stability >= 80 ? "var(--good)" : s.stability >= 65 ? "var(--warn)" : "var(--danger)";
              return (
                <li key={s.site}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{s.site}</span>
                    <span className="text-xs font-medium" style={{ color }}>{s.volatility}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.stability}%` }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: color }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Benchmark */}
      <div className="mt-6">
        <Card title="Benchmark concurrentiel" info>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink3">
                  <th className="pb-3 font-medium">Site</th>
                  <th className="pb-3 font-medium">Positionnement</th>
                  <th className="pb-3 font-medium">vs Marché</th>
                  <th className="pb-3 font-medium">Profondeur catalogue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { site: "Mytek", pos: "Agressif", vs: -4, depth: 92 },
                  { site: "Tunisianet", pos: "Aligné", vs: +1, depth: 88 },
                  { site: "Zoom", pos: "Variable", vs: -2, depth: 95 },
                  { site: "Spacenet", pos: "Premium", vs: +5, depth: 71 },
                ].map((r, i) => (
                  <motion.tr key={r.site} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="border-t border-line">
                    <td className="py-3 font-medium text-ink">{r.site}</td>
                    <td className="py-3 text-ink2">{r.pos}</td>
                    <td className="py-3">
                      <span className={`font-semibold ${r.vs <= 0 ? "text-good" : "text-danger"}`}>
                        {r.vs > 0 ? "+" : ""}{r.vs}%
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface3">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${r.depth}%` }} transition={{ duration: 0.9, delay: 0.2 + i * 0.06 }} className="h-full rounded-full accent-gradient" />
                        </div>
                        <span className="text-xs text-ink3">{r.depth}%</span>
                      </div>
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
