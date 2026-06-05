"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown, Zap, Menu } from "lucide-react";
import { topTabs } from "@/lib/nav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { SectorSwitcher } from "./SectorSwitcher";

function tabActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Topbar({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();

  return (
    <header className="themed sticky top-0 z-30 border-b border-line bg-app/80 backdrop-blur-xl">
      <div className="flex h-[68px] items-center gap-3 px-5 sm:px-7">
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
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-ink" : "text-ink3 hover:text-ink2"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-surface2"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
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
              className="h-10 w-52 rounded-full border border-line bg-surface2 pl-10 pr-4 text-sm text-ink placeholder:text-ink3 outline-none transition-all duration-300 focus:w-72 focus:border-accent focus:ring-soft"
            />
          </div>

          <ThemeToggle />

          {/* Plan + upgrade */}
          <Link
            href="/pricing"
            className="hidden items-center gap-1.5 rounded-full accent-gradient px-3.5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95 md:flex"
          >
            <Zap className="h-4 w-4" />
            Plan Pro
          </Link>

          <span className="hidden h-7 w-px bg-line lg:block" />

          <button className="group flex items-center gap-2.5 rounded-full border border-transparent py-1 pl-1 pr-2 transition-colors hover:border-line hover:bg-surface2">
            <span className="relative">
              <span className="grid h-9 w-9 place-items-center rounded-full accent-gradient text-xs font-semibold text-white">
                BC
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-app bg-good" />
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
