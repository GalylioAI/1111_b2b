"use client";

import { Flame, Sparkles, ShieldCheck, TrendingUp } from "lucide-react";

const tickerItems = [
  { icon: TrendingUp, label: "Indice marché", value: "108.7", trend: "+1.2%", up: true },
  { icon: Flame, label: "Promos actives", value: "152" },
  { icon: ShieldCheck, label: "Fausses promos", value: "37" },
  { icon: Sparkles, label: "Économisés aujourd'hui", value: "48 000 DT" },
];

/* Live market strip — mirrors the 1111.tn client header ticker. */
export function LiveTicker() {
  return (
    <div className="border-b border-white/5 bg-gradient-to-r from-app/90 via-rail/80 to-app/90">
      <div className="flex h-7 items-center justify-between gap-3 px-5 text-[11px] sm:px-7">
        <div className="flex items-center gap-1.5 text-good">
          <span className="live-dot" />
          <span className="font-semibold uppercase tracking-wider">En direct</span>
          <span className="hidden text-ink3 sm:inline">·</span>
          <span className="hidden text-ink2 sm:inline">Marché Tunisien</span>
        </div>

        <div className="hidden items-center gap-5 text-ink2 md:flex">
          {tickerItems.map((t) => (
            <div key={t.label} className="flex items-center gap-1.5">
              <t.icon className="h-3 w-3 text-gold/80" />
              <span className="text-ink3">{t.label}</span>
              <span className="font-semibold tabular-nums text-ink">{t.value}</span>
              {t.trend && (
                <span className={`tabular-nums ${t.up ? "text-good" : "text-danger"}`}>
                  {t.up ? "▲" : "▼"} {t.trend}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 text-ink3 lg:flex">
          <span>Tunis · 28°C ☀️</span>
          <span className="opacity-50">·</span>
          <span>62 sites suivis</span>
        </div>
      </div>
    </div>
  );
}
