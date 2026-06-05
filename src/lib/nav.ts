import {
  LayoutGrid,
  Tag,
  Scale,
  Boxes,
  Bell,
  ChartColumnIncreasing,
  Search,
  Truck,
  FileText,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/", icon: LayoutGrid },
  { label: "Suivi des prix", href: "/tracking", icon: Tag },
  { label: "Comparaison", href: "/comparison", icon: Scale },
  { label: "Catalogue", href: "/catalog", icon: Boxes },
  { label: "Alertes & Watchlist", href: "/alerts", icon: Bell },
  { label: "Analytics & BI", href: "/analytics", icon: ChartColumnIncreasing },
  { label: "SEO Intelligence", href: "/seo", icon: Search },
  { label: "Fournisseurs", href: "/suppliers", icon: Truck },
  { label: "Rapports", href: "/reports", icon: FileText },
];

export const bottomNavItems: NavItem[] = [
  { label: "Équipe", href: "/team", icon: Users },
  { label: "Paramètres", href: "/settings", icon: Settings },
];

/* Top-bar tabs */
export const topTabs = [
  { label: "Vue d'ensemble", href: "/" },
  { label: "Suivi des prix", href: "/tracking" },
  { label: "Analytics", href: "/analytics" },
  { label: "Tarifs", href: "/pricing" },
];
