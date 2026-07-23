"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";

type CardProps = {
  title?: string;
  info?: boolean;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
  /* Adds the glowing animated gradient ring for hero / spotlight cards */
  feature?: boolean;
};

export function Card({
  title,
  info = true,
  action,
  className = "",
  bodyClassName = "",
  children,
  delay = 0,
  hover = true,
  feature = false,
}: CardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`card ${feature ? "card-feature" : ""} ${hover ? "card-hover" : ""} p-5 sm:p-6 ${className}`}
    >
      {(title || action) && (
        <header className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {title && (
              <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink">
                {title}
              </h3>
            )}
            {info && title && (
              <Info className="h-3.5 w-3.5 text-ink3" strokeWidth={2} />
            )}
          </div>
          {action}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </motion.section>
  );
}
