"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, LayoutGrid } from "lucide-react";
import { sectors } from "@/lib/b2b";

export function SectorSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(sectors[0]);

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface2 py-2 pl-3 pr-2.5 text-sm font-medium text-ink transition-colors hover:border-line2"
      >
        <LayoutGrid className="h-4 w-4 text-accent" />
        {active}
        <ChevronDown className={`h-4 w-4 text-ink3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            className="absolute left:0 top-[120%] z-30 w-48 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-lg"
          >
            <li className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink3">
              Secteur
            </li>
            {sectors.map((s) => (
              <li key={s}>
                <button
                  onMouseDown={() => { setActive(s); setOpen(false); }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink2 transition-colors hover:bg-surface2"
                >
                  {s}
                  {s === active && <Check className="h-4 w-4 text-accent" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
