"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/* For prices, a drop is "good" for the buyer-facing comparison context.
   `invert` flips the colour semantics when an increase should read positive. */
export function TrendPill({
  value,
  invert = false,
  className = "",
}: {
  value: number;
  invert?: boolean;
  className?: string;
}) {
  const up = value > 0;
  const positive = invert ? up : !up;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
        positive ? "bg-good/10 text-good" : "bg-danger/10 text-danger"
      } ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {up ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}
