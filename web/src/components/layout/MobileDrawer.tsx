"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navItems, bottomNavItems, type NavItem } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function DrawerLink({
  item,
  active,
  onClose,
  index,
}: {
  item: NavItem;
  active: boolean;
  onClose: () => void;
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + index * 0.035 }}
    >
      <Link
        href={item.href}
        onClick={onClose}
        className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-colors ${
          active ? "text-white" : "text-ink2 hover:bg-surface2 hover:text-ink"
        }`}
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
            active ? "accent-gradient" : "bg-surface2"
          }`}
        >
          <Icon className={`h-[18px] w-[18px] ${active ? "text-white" : "text-ink2"}`} strokeWidth={2} />
        </span>
        <span className={active ? "text-accent" : ""}>{item.label}</span>
      </Link>
    </motion.div>
  );
}

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
            className="themed fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[82vw] flex-col border-r border-line bg-rail md:hidden"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo size={26} />
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface2 text-ink2"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {navItems.map((item, i) => (
                <DrawerLink
                  key={item.href}
                  item={item}
                  index={i}
                  active={isActive(pathname, item.href)}
                  onClose={onClose}
                />
              ))}
              <div className="my-2 h-px bg-line" />
              {bottomNavItems.map((item, i) => (
                <DrawerLink
                  key={item.href}
                  item={item}
                  index={navItems.length + i}
                  active={isActive(pathname, item.href)}
                  onClose={onClose}
                />
              ))}
            </nav>

            <div className="border-t border-line p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full accent-gradient text-xs font-semibold text-white">
                  BC
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">Bessie Cooper</p>
                  <p className="text-[11px] text-ink3">Administrateur</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
