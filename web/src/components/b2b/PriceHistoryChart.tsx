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
import { ClientOnly } from "@/components/ui/ClientOnly";
import { sites } from "@/lib/b2b";

type Row = Record<string, number>;

function colorOf(name: string) {
  return sites.find((s) => s.name === name)?.color ?? "var(--accent)";
}

function HistTooltip({
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
          {p.name}
          <span className="ml-auto font-semibold text-ink">{p.value.toLocaleString("fr-FR")}</span>
        </p>
      ))}
    </div>
  );
}

export function PriceHistoryChart({
  data,
  lines,
  height = 280,
}: {
  data: Row[];
  lines: string[];
  height?: number;
}) {
  return (
    <div className="w-full" style={{ height }}>
      <ClientOnly>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -8, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="4 6" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--ink-3)" }} dy={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--ink-3)" }}
              width={56}
              domain={["dataMin - 60", "dataMax + 60"]}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<HistTooltip />} cursor={{ stroke: "var(--accent)", strokeDasharray: "4 4", strokeOpacity: 0.4 }} />
            {lines.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colorOf(key)}
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
  );
}
