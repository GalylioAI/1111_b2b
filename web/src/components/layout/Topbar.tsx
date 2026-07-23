"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown, Zap, Menu } from "lucide-react";
import { topTabs } from "@/lib/nav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { SectorSwitcher } from "./SectorSwitcher";
import { LiveTicker } from "./LiveTicker";

function tabActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Topbar({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();

  return (
    <header className="themed sticky top-0 z-30 border-b border-line bg-app/70 backdrop-blur-xl backdrop-saturate-150">
      <LiveTicker />
      <div className="gold-hairline" />
      <div className="flex h-[64px] items-center gap-3 px-5 sm:px-7">
        <button
          onClick={onMenu}
          aria-label="Menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface2 text-ink2 transition-colors hover:text-ink md:hidden"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <div className="md:hidden">
          <Logo showWordmark={false} size={22} />
        </div>

        {/* Tabs */}
        <nav className="hidden items-center gap-1 lg:flex">
          {topTabs.map((tab) => {
            const active = tabActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-ink" : "text-ink2 hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-white/[0.04] ring-1 ring-inset ring-white/10"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                {active && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent via-gold to-accent shadow-[0_0_8px_rgba(246,196,83,0.6)]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <SectorSwitcher />

          <div className="group relative hidden items-center sm:flex">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink3" />
            <input
              placeholder="Rechercher produits, marques, sites…"
              className="h-10 w-52 rounded-xl border border-line bg-surface2 pl-10 pr-4 text-sm text-ink placeholder:text-ink3 outline-none transition-all duration-300 focus:w-72 focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <ThemeToggle />

          {/* Plan + upgrade */}
          <Link
            href="/pricing"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-xl accent-gradient px-3.5 py-2 text-sm font-bold text-white shadow-[0_0_24px_var(--accent-glow)] ring-1 ring-white/10 transition hover:ring-gold/40 active:scale-95 md:flex"
          >
            <span className="sheen-sweep" />
            <Zap className="relative z-10 h-4 w-4" />
            <span className="relative z-10">Plan Pro</span>
          </Link>

          <span className="hidden h-7 w-px bg-line lg:block" />

          <button className="group flex items-center gap-2.5 rounded-full border border-transparent py-1 pl-1 pr-2 transition-colors hover:border-line hover:bg-surface2">
            <span className="relative">
              <span className="grid h-9 w-9 place-items-center rounded-full accent-gradient text-xs font-semibold text-white shadow-[0_6px_18px_-8px_var(--accent-glow)]">
                BC
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full border-2 border-app bg-app">
                <span className="live-dot" />
              </span>
            </span>
            <span className="hidden text-left leading-tight lg:block">
              <span className="block text-sm font-semibold text-ink">Bessie Cooper</span>
              <span className="block text-[11px] text-ink3">Administrateur</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-ink3 lg:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
