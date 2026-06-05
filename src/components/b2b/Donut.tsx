"use client";

import { motion } from "framer-motion";

type Segment = { name: string; pct: number; color: string };

export function Donut({
  segments,
  size = 168,
  stroke = 18,
  centerTop,
  centerSub,
}: {
  segments: Segment[];
  size?: number;
  stroke?: number;
  centerTop?: string;
  centerSub?: string;
}) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const gap = 0.018;
  let cumulative = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} opacity={0.5} />
        {segments.map((seg, i) => {
          const frac = seg.pct / 100;
          const len = Math.max(frac - gap, 0.001) * C;
          const rotation = cumulative * 360;
          cumulative += frac;
          return (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${len} ${C - len}`}
              initial={{ strokeDashoffset: len, opacity: 0 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center", transform: `rotate(${rotation}deg)` }}
            />
          );
        })}
      </svg>
      {(centerTop || centerSub) && (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            {centerTop && <p className="font-display text-xl font-bold tracking-tight text-ink">{centerTop}</p>}
            {centerSub && <p className="text-xs text-ink3">{centerSub}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
