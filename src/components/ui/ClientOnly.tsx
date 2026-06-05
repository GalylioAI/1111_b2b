"use client";

import { useEffect, useState } from "react";

/* Renders children only after mount. Used to wrap Recharts' ResponsiveContainer
   so it never measures a zero-size DOM during SSR (avoids the width(-1) warning)
   while keeping the reserved height to prevent layout shift. */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
