"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function KpiCard({
  label,
  value,
  delta,
  up,
  index = 0,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group card card-hover relative overflow-hidden p-5"
    >
      <span
        className={`animate-glow-pulse pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${
          up ? "bg-good/20" : "bg-danger/25"
        }`}
      />
      <p className="text-xs font-medium uppercase tracking-wider text-ink3">
        {label}
      </p>
      <p className="mt-2 font-display text-[27px] font-bold tracking-tight text-ink">
        {value}
      </p>
      <span
        className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
          up
            ? "bg-good/10 text-good ring-1 ring-good/20"
            : "bg-danger/10 text-danger ring-1 ring-danger/20"
        }`}
      >
        {up ? (
          <ArrowUpRight className="h-3.5 w-3.5" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5" />
        )}
        {delta}
      </span>
    </motion.div>
  );
}
