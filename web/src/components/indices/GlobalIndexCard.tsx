"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { ChevronDown, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { TrendPill } from "@/components/b2b/TrendPill";
import { niceAxis } from "@/lib/axis";
import { globalIndex, globalIndexSeries, globalIndexPeak } from "@/lib/indices";

const giAxis = niceAxis(globalIndexSeries.map((d) => d.value));

function TooltipBox({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 shadow-lg">
      <p className="mb-0.5 text-[11px] font-semibold text-ink">Jour {label}</p>
      <p className="flex items-center gap-2 text-xs text-ink2">
        <span className="h-2 w-2 rounded-full bg-accent" />
        Indice
        <span className="ml-auto font-semibold text-ink">{payload[0].value}</span>
      </p>
    </div>
  );
}

const PulseDot = ({ cx, cy }: { cx?: number; cy?: number }) => {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill="var(--accent)" opacity={0.14} />
      <circle cx={cx} cy={cy} r={6.5} fill="var(--surface)" stroke="var(--accent)" strokeWidth={3} />
    </g>
  );
};

const ranges = ["30 derniers jours", "3 mois", "6 mois", "1 an"];

export function GlobalIndexCard() {
  const [range, setRange] = useState(ranges[0]);
  const [open, setOpen] = useState(false);
  const bullish = globalIndex.weekly >= 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card card-feature relative overflow-hidden p-5 sm:p-6"
    >
      {/* ambient glow */}
      <span className="animate-glow-pulse pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      {/* header */}
      <header className="relative mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl accent-gradient text-white shadow-[0_8px_22px_-8px_var(--accent-glow)]">
              <Activity className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-ink">
                {globalIndex.title}
              </h2>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-good" />
                </span>
                Mise à jour quotidienne · 15 000+ SKUs
              </span>
            </div>
          </div>
          <code className="inline-block max-w-full rounded-lg border border-line bg-surface2 px-2.5 py-1.5 font-mono text-[11px] leading-relaxed text-ink2">
            {globalIndex.formula}
          </code>
        </div>

        {/* range selector */}
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="flex items-center gap-2 rounded-full border border-line bg-surface2 px-3.5 py-1.5 text-xs font-medium text-ink2 transition-colors hover:text-ink"
          >
            {range}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-[120%] z-20 w-40 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-lg"
            >
              {ranges.map((r) => (
                <li key={r}>
                  <button
                    onMouseDown={() => { setRange(r); setOpen(false); }}
                    className={`w-full rounded-lg px-3 py-1.5 text-left text-xs transition-colors hover:bg-surface2 ${r === range ? "text-accent" : "text-ink2"}`}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </header>

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* value panel */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-wider text-ink3">Valeur actuelle</p>
          <div className="mt-1 flex items-end gap-3">
            <span className="gradient-text font-display text-[52px] font-bold leading-none tracking-tight">
              {globalIndex.value.toFixed(1)}
            </span>
            <span
              className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                bullish ? "bg-good/10 text-good" : "bg-danger/10 text-danger"
              }`}
            >
              {bullish ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {bullish ? "Haussier" : "Baissier"}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-surface2 p-3.5">
              <p className="mb-1.5 text-[11px] uppercase tracking-wider text-ink3">24 h</p>
              <TrendPill value={globalIndex.daily} invert />
            </div>
            <div className="rounded-2xl border border-line bg-surface2 p-3.5">
              <p className="mb-1.5 text-[11px] uppercase tracking-wider text-ink3">7 jours</p>
              <TrendPill value={globalIndex.weekly} invert />
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink2">{globalIndex.description}</p>
        </div>

        {/* chart */}
        <div className="chart-glow relative h-[260px] w-full">
          <div className="pointer-events-none absolute left-[78%] top-1 z-10 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 240, damping: 18 }}
              className="relative rounded-2xl border border-line bg-surface px-3.5 py-2 text-center shadow-lg"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-ink3">{globalIndexPeak.label}</p>
              <p className="font-display text-base font-bold tracking-tight text-ink">{globalIndexPeak.value}</p>
              <p className="text-[11px] text-ink2">{globalIndexPeak.sub}</p>
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-surface" />
            </motion.div>
          </div>

          <ClientOnly>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={globalIndexSeries} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="giFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="55%" stopColor="var(--accent)" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="giStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--accent-2)" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 6" />
                <XAxis
                  dataKey="day"
                  ticks={[1, 5, 10, 15, 20, 25, 30]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--ink-3)" }}
                  dy={8}
                />
                <YAxis
                  domain={[giAxis.min, giAxis.max]}
                  ticks={giAxis.ticks}
                  tickFormatter={(v: number) => v.toFixed(giAxis.decimals)}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--ink-3)" }}
                  width={42}
                />
                <Tooltip content={<TooltipBox />} cursor={{ stroke: "var(--accent)", strokeDasharray: "4 4", strokeOpacity: 0.5 }} />
                <ReferenceLine x={globalIndexPeak.day} stroke="var(--accent)" strokeDasharray="5 5" strokeOpacity={0.45} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="url(#giStroke)"
                  strokeWidth={3}
                  fill="url(#giFill)"
                  animationDuration={1600}
                  activeDot={{ r: 5, fill: "var(--surface)", stroke: "var(--accent)", strokeWidth: 3 }}
                />
                <ReferenceDot x={globalIndexPeak.day} y={globalIndexSeries[globalIndexPeak.day - 1].value} shape={<PulseDot />} />
              </AreaChart>
            </ResponsiveContainer>
          </ClientOnly>
        </div>
      </div>
    </motion.section>
  );
}
