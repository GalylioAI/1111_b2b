"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { niceAxis } from "@/lib/axis";
import { categories, categoryColors, categoryTrends } from "@/lib/indices";

const trendAxis = niceAxis(
  categoryTrends.flatMap((row) => categories.map((cat) => row[cat as keyof typeof row] as number)),
);

function TrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a, b) => b.value - a.value);
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 shadow-lg">
      <p className="mb-1 text-[11px] font-semibold text-ink">{label}</p>
      {sorted.map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-xs text-ink2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}
          <span className="ml-auto font-semibold text-ink">{p.value.toFixed(1)}</span>
        </p>
      ))}
    </div>
  );
}

export function CategoryTrendsChart() {
  return (
    <Card
      title="Évolution des indices par catégorie"
      action={
        <div className="hidden flex-wrap items-center gap-x-3 gap-y-1.5 sm:flex">
          {categories.map((cat) => (
            <span key={cat} className="flex items-center gap-1.5 text-[11px] text-ink2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: categoryColors[cat] }} />
              {cat}
            </span>
          ))}
        </div>
      }
    >
      <div className="h-[320px] w-full">
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={categoryTrends} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 6" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--ink-3)" }} dy={8} />
              <YAxis
                domain={[trendAxis.min, trendAxis.max]}
                ticks={trendAxis.ticks}
                tickFormatter={(v: number) => v.toFixed(trendAxis.decimals)}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--ink-3)" }}
                width={40}
              />
              <Tooltip content={<TrendTooltip />} cursor={{ stroke: "var(--accent)", strokeDasharray: "4 4", strokeOpacity: 0.4 }} />
              {categories.map((cat) => (
                <Line
                  key={cat}
                  type="monotone"
                  dataKey={cat}
                  stroke={categoryColors[cat]}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                  animationDuration={1300}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
    </Card>
  );
}
