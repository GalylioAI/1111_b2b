"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { trafficSources } from "@/lib/data";

export function TrafficSources() {
  return (
    <Card title="Traffic Sources">
      <ul className="space-y-5">
        {trafficSources.map((s, i) => (
          <li key={s.name}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-ink2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name}
              </span>
              <span className="font-semibold text-ink">{s.pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full"
                style={{ background: s.color }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
