"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { analyticsBars } from "@/lib/data";

function BarsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 shadow-lg">
      <p className="mb-1 text-[11px] font-semibold text-ink">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-xs text-ink2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="capitalize">{p.name}</span>
          <span className="ml-auto font-semibold text-ink">{p.value}k</span>
        </p>
      ))}
    </div>
  );
}

export function WeeklyBars() {
  return (
    <Card
      title="Web vs Mobile Traffic"
      action={
        <div className="flex items-center gap-4 text-xs text-ink2">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Web
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent3" /> Mobile
          </span>
        </div>
      }
    >
      <div className="h-[300px] w-full">
        <ClientOnly>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={analyticsBars}
            margin={{ top: 10, right: 0, left: -18, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid vertical={false} strokeDasharray="4 6" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--ink-3)" }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--ink-3)" }}
            />
            <Tooltip
              content={<BarsTooltip />}
              cursor={{ fill: "var(--accent)", fillOpacity: 0.06 }}
            />
            <Bar
              dataKey="web"
              fill="var(--accent)"
              radius={[6, 6, 0, 0]}
              maxBarSize={22}
              animationDuration={1100}
            />
            <Bar
              dataKey="mobile"
              fill="var(--accent-3)"
              radius={[6, 6, 0, 0]}
              maxBarSize={22}
              animationDuration={1100}
              animationBegin={150}
            />
          </BarChart>
        </ResponsiveContainer>
        </ClientOnly>
      </div>
    </Card>
  );
}
