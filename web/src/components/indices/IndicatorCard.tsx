"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Info } from "lucide-react";
import { Sparkline } from "@/components/b2b/Sparkline";
import { TrendPill } from "@/components/b2b/TrendPill";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { niceAxis } from "@/lib/axis";
import type { Indicator } from "@/lib/indices";

/* Rééchantillonne le spark (9 pts) en ~30 pts pour le graphique détaillé. */
function expand(spark: number[], n = 30) {
  const seg = (n - 1) / (spark.length - 1);
  const amp = (Math.abs(spark[spark.length - 1] - spark[0]) || Math.abs(spark[0]) || 1) * 0.05;
  return Array.from({ length: n }, (_, i) => {
    const t = i / seg;
    const lo = Math.floor(t);
    const hi = Math.min(lo + 1, spark.length - 1);
    const v = spark[lo] + (spark[hi] - spark[lo]) * (t - lo) + Math.sin(i / 2.2) * amp;
    return { day: i + 1, value: Math.round(v * 1000) / 1000 };
  });
}

function DetailTooltip({
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
    <div className="rounded-lg border border-line bg-surface px-2.5 py-1.5 shadow-lg">
      <p className="text-[10px] text-ink3">Jour {label}</p>
      <p className="font-display text-xs font-bold text-ink">{payload[0].value}</p>
    </div>
  );
}

export function IndicatorCard({ ind, index = 0 }: { ind: Indicator; index?: number }) {
  const isGood = ind.goodUp ? ind.change24h > 0 : ind.change24h < 0;
  const color = isGood ? "var(--good)" : "var(--danger)";
  const [open, setOpen] = useState(false);
  const [showDef, setShowDef] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const gid = `ind-${ind.key}`;

  const enter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => {
      setOpen(false);
      setShowDef(false);
    }, 90);
  };

  const series = expand(ind.spark);
  const axis = niceAxis(series.map((d) => d.value));

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {/* Carte de base */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={`card card-hover flex flex-col p-5 transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[14px] font-semibold leading-snug tracking-tight text-ink">
            {ind.name}
          </h3>
          <TrendPill value={ind.change24h} invert={ind.goodUp} />
        </div>
        <code className="mt-2 block overflow-x-auto whitespace-nowrap rounded-lg border border-line bg-surface2 px-2 py-1.5 font-mono text-[10.5px] text-ink2">
          {ind.formula}
        </code>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="font-display text-[28px] font-bold leading-none tracking-tight text-ink">
            {ind.value}
          </p>
          <Sparkline data={ind.spark} width={88} height={34} positive={!isGood} />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink3">{ind.description}</p>
      </motion.div>

      {/* Détail au survol */}
      <AnimatePresence>
        {open && (
          <motion.div
            onMouseEnter={enter}
            onMouseLeave={leave}
            initial={{ opacity: 0, y: -2, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -2, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="card absolute inset-x-0 top-0 z-40 p-5 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.55)]"
            style={{ borderColor: "var(--line-2)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-[14px] font-semibold leading-snug tracking-tight text-ink">
                {ind.name}
              </h3>
              <TrendPill value={ind.change24h} invert={ind.goodUp} />
            </div>

            {/* Formule — survol pour révéler la définition (survol dans le survol) */}
            <div
              className="mt-2"
              onMouseEnter={() => setShowDef(true)}
              onMouseLeave={() => setShowDef(false)}
            >
              <code
                className={`flex cursor-help items-center justify-between gap-2 overflow-x-auto whitespace-nowrap rounded-lg border px-2 py-1.5 font-mono text-[10.5px] transition-colors ${
                  showDef ? "border-accent/50 bg-accentsoft text-ink" : "border-line bg-surface2 text-ink2"
                }`}
              >
                <span>{ind.formula}</span>
                <span className="flex shrink-0 items-center gap-1 font-sans text-[10px] font-medium text-accent">
                  <Info className="h-3 w-3" /> Définition
                </span>
              </code>

              <AnimatePresence>
                {showDef && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-accent/30 bg-accentsoft p-3">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                        Définition
                      </p>
                      <p className="text-xs leading-relaxed text-ink2">{ind.definition}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-ink3">Valeur actuelle</p>
                <p className="font-display text-[26px] font-bold leading-none tracking-tight text-ink">
                  {ind.value}
                </p>
              </div>
              <span className="text-[11px] text-ink3">30 derniers jours</span>
            </div>

            {/* Graphique détaillé */}
            <div className="mt-3 h-[130px] w-full">
              <ClientOnly>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series} margin={{ top: 6, right: 4, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.32} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="4 6" />
                    <XAxis dataKey="day" ticks={[1, 10, 20, 30]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--ink-3)" }} dy={6} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--ink-3)" }} width={42} domain={[axis.min, axis.max]} ticks={axis.ticks} tickFormatter={(v: number) => v.toFixed(axis.decimals)} />
                    <Tooltip content={<DetailTooltip />} cursor={{ stroke: color, strokeDasharray: "4 4", strokeOpacity: 0.5 }} />
                    <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill={`url(#${gid})`} animationDuration={700} activeDot={{ r: 4, fill: "var(--surface)", stroke: color, strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </ClientOnly>
            </div>

            {/* Variations */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between rounded-lg border border-line bg-surface2 px-2.5 py-1.5">
                <span className="text-[11px] text-ink3">24 h</span>
                <TrendPill value={ind.change24h} invert={ind.goodUp} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-surface2 px-2.5 py-1.5">
                <span className="text-[11px] text-ink3">7 j</span>
                <TrendPill value={ind.change7d} invert={ind.goodUp} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
