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
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { niceAxis } from "@/lib/axis";
import { priceIndex, priceIndexPeak } from "@/lib/b2b";

const piAxis = niceAxis(priceIndex.flatMap((d) => [d.market, d.you]));

function Callout() {
  return (
    <div className="relative rounded-2xl border border-line bg-surface px-4 py-2.5 text-center shadow-lg">
      <p className="text-[10px] font-medium uppercase tracking-wider text-ink3">
        {priceIndexPeak.label}
      </p>
      <p className="font-display text-lg font-bold tracking-tight text-ink">
        {priceIndexPeak.value}
      </p>
      <p className="text-[11px] text-ink2">{priceIndexPeak.sub}</p>
      <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-surface" />
    </div>
  );
}

function TooltipBox({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 shadow-lg">
      <p className="mb-1 text-[11px] font-semibold text-ink">Jour {label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-xs text-ink2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name === "you" ? "Vos prix" : "Marché"}</span>
          <span className="ml-auto font-semibold text-ink">{p.value}</span>
        </p>
      ))}
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

export function PriceIndexChart() {
  const [range, setRange] = useState(ranges[0]);
  const [open, setOpen] = useState(false);

  return (
    <Card
      feature
      title="Indice de prix du marché"
      action={
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-3 text-xs text-ink3 sm:flex">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Marché
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent3" /> Vos prix
            </span>
          </span>
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
          <button className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink3 transition-colors hover:text-ink">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <div className="chart-glow relative h-[290px] w-full">
        <div className="pointer-events-none absolute left-[58%] top-1 z-10 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 240, damping: 18 }}
          >
            <Callout />
          </motion.div>
        </div>

        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceIndex} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="mktFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.38} />
                  <stop offset="55%" stopColor="var(--accent)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mktStroke" x1="0" y1="0" x2="1" y2="0">
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
                domain={[piAxis.min, piAxis.max]}
                ticks={piAxis.ticks}
                tickFormatter={(v: number) => v.toFixed(piAxis.decimals)}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--ink-3)" }}
                width={44}
              />
              <Tooltip content={<TooltipBox />} cursor={{ stroke: "var(--accent)", strokeDasharray: "4 4", strokeOpacity: 0.5 }} />
              <ReferenceLine x={priceIndexPeak.day} stroke="var(--accent)" strokeDasharray="5 5" strokeOpacity={0.45} />
              <Area
                type="monotone"
                dataKey="you"
                stroke="var(--accent-3)"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                fill="transparent"
                animationDuration={1400}
              />
              <Area
                type="monotone"
                dataKey="market"
                stroke="url(#mktStroke)"
                strokeWidth={3}
                fill="url(#mktFill)"
                animationDuration={1600}
                activeDot={{ r: 5, fill: "var(--surface)", stroke: "var(--accent)", strokeWidth: 3 }}
              />
              <ReferenceDot x={priceIndexPeak.day} y={priceIndex[priceIndexPeak.day - 1].market} shape={<PulseDot />} />
            </AreaChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
    </Card>
  );
}
