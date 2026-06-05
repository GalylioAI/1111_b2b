"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  crumbs,
  title,
  description,
  action,
}: {
  crumbs: string[];
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <motion.nav
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink3"
        >
          {crumbs.map((c, i) => (
            <span key={c} className="flex items-center gap-1.5">
              <span className={i === crumbs.length - 1 ? "text-accent" : ""}>
                {c}
              </span>
              {i < crumbs.length - 1 && (
                <ChevronRight className="h-3 w-3 opacity-60" />
              )}
            </span>
          ))}
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-[26px] font-bold tracking-tight text-ink sm:text-[30px]"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-1 max-w-xl text-sm text-ink2"
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
