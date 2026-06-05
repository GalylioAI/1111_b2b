"use client";

import { motion } from "framer-motion";

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-colors duration-300 ${
        checked ? "accent-gradient" : "bg-surface3"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 600, damping: 34 }}
        className="block h-5 w-5 rounded-full bg-white shadow-sm"
        style={{ marginLeft: checked ? "auto" : 0 }}
      />
    </button>
  );
}
