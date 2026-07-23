"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems, bottomNavItems, type NavItem } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function RailLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-label={item.label}
      className="group/link relative flex h-11 w-full items-center gap-3 rounded-2xl pl-[18px] pr-3 transition-colors hover:bg-surface2/70"
    >
      {active && (
        <motion.span
          layoutId="rail-active"
          className="absolute inset-0 rounded-2xl accent-gradient shadow-[0_12px_28px_-8px_var(--accent-glow),inset_0_1px_0_rgba(255,255,255,0.18)]"
          transition={{ type: "spring", stiffness: 480, damping: 38 }}
        />
      )}
      <Icon
        className={`relative z-10 h-[19px] w-[19px] shrink-0 transition-colors ${
          active ? "text-white" : "text-ink3 group-hover/link:text-ink"
        }`}
        strokeWidth={2}
      />
      <span
        className={`relative z-10 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
          active ? "text-white" : "text-ink2 group-hover/link:text-ink"
        }`}
      >
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="group themed fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col overflow-hidden border-r border-line bg-rail py-5 transition-[width,box-shadow] duration-300 ease-out [background-image:radial-gradient(220px_200px_at_18px_28px,var(--accent-soft),transparent_72%)] hover:w-[244px] hover:shadow-[20px_0_50px_-20px_rgba(0,0,0,0.35)] md:flex">
      {/* Brand */}
      <Link href="/" aria-label="1111.tn" className="mb-7 flex items-center gap-3 pl-[18px] pr-3">
        <motion.span
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl accent-gradient shadow-[0_10px_26px_-8px_var(--accent-glow)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_1111.svg" alt="1111" className="h-6 w-6 object-contain brightness-0 invert" />
        </motion.span>
        <span className="whitespace-nowrap leading-none opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="block font-display text-[15px] font-bold tracking-tight text-ink">
            1111<span className="gradient-text-gold">.tn</span>
          </span>
          <span className="mt-0.5 block text-[10px] font-medium tracking-[0.16em] text-ink3">
            PRICE INTELLIGENCE
          </span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col items-stretch gap-1.5 overflow-y-auto overflow-x-hidden px-2.5">
        {navItems.map((item) => (
          <RailLink key={item.href} item={item} active={isActive(pathname, item.href)} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-stretch gap-1.5 px-2.5 pt-3">
        <span className="mx-[18px] mb-2 h-px bg-line" />
        {bottomNavItems.map((item) => (
          <RailLink key={item.href} item={item} active={isActive(pathname, item.href)} />
        ))}
      </div>
    </aside>
  );
}
