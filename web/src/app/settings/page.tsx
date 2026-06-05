"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { User, Palette, Bell, KeyRound, LayoutGrid, Check, Sun, Moon, Copy, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { sectors } from "@/lib/b2b";

const tabs = [
  { id: "profile", label: "Profil", icon: User },
  { id: "appearance", label: "Apparence", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API & Accès", icon: KeyRound },
  { id: "sectors", label: "Secteurs", icon: LayoutGrid },
];

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink3">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-xl border border-line bg-surface2 px-4 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-soft"
      />
    </label>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [notifs, setNotifs] = useState({ price: true, weekly: true, stock: true, seo: false });
  const [secActive, setSecActive] = useState(sectors.map((_, i) => i < 3));

  const apiKey = "1111_sk_live_8f3a92c7d4e1b6a05f2c9e7d";

  const copy = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        crumbs={["1111.tn", "Paramètres"]}
        title="Paramètres"
        description="Profil, apparence, notifications, accès API et secteurs suivis."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[230px_1fr]">
        <nav className="card h-fit p-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors ${active ? "text-ink" : "text-ink3 hover:text-ink2"}`}
              >
                {active && <motion.span layoutId="settings-tab" className="absolute inset-0 rounded-xl bg-surface2" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                <Icon className="relative z-10 h-[18px] w-[18px]" />
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            {tab === "profile" && (
              <Card title="Profil" info={false}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-full accent-gradient text-xl font-bold text-white">BC</span>
                  <div>
                    <button className="rounded-full border border-line bg-surface2 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">Changer l'avatar</button>
                    <p className="mt-2 text-xs text-ink3">JPG ou PNG. Max 2 Mo.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nom complet" defaultValue="Bessie Cooper" />
                  <Field label="Société" defaultValue="Galylio" />
                  <Field label="E-mail" type="email" defaultValue="bessie@galylio.com" />
                  <Field label="Téléphone" defaultValue="+216 24 000 111" />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink2 transition-colors hover:text-ink">Annuler</button>
                  <button className="rounded-full accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">Enregistrer</button>
                </div>
              </Card>
            )}

            {tab === "appearance" && (
              <Card title="Apparence" info={false}>
                <p className="mb-4 text-sm text-ink2">Choisissez le thème de l'interface.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "light", label: "Clair", icon: Sun, bg: "#f5f6f9", fg: "#ffffff" },
                    { id: "dark", label: "Sombre", icon: Moon, bg: "#14161e", fg: "#1b1e28" },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const selected = theme === opt.id;
                    return (
                      <button key={opt.id} onClick={() => setTheme(opt.id)} className={`relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all ${selected ? "border-accent" : "border-line hover:border-line2"}`}>
                        <div className="mb-3 flex h-20 items-end gap-1.5 rounded-xl p-2" style={{ background: opt.bg }}>
                          <span className="h-full w-6 rounded-md" style={{ background: opt.fg }} />
                          <span className="flex-1 space-y-1.5">
                            <span className="block h-2 w-full rounded-full accent-gradient" />
                            <span className="block h-2 w-2/3 rounded-full" style={{ background: opt.fg }} />
                            <span className="block h-2 w-1/2 rounded-full" style={{ background: opt.fg }} />
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Icon className="h-4 w-4" /> {opt.label}</span>
                          {selected && <span className="grid h-5 w-5 place-items-center rounded-full accent-gradient text-white"><Check className="h-3 w-3" strokeWidth={3} /></span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            )}

            {tab === "notifications" && (
              <Card title="Notifications" info={false}>
                <ul className="divide-y divide-line">
                  {[
                    { key: "price", label: "Variations de prix", desc: "Alertes sur les changements de prix concurrents." },
                    { key: "weekly", label: "Rapport hebdomadaire", desc: "Synthèse de votre veille tarifaire." },
                    { key: "stock", label: "Ruptures de stock", desc: "Quand un produit suivi devient indisponible." },
                    { key: "seo", label: "Changements SEO", desc: "Modifications de méta-données concurrentes." },
                  ].map((n) => (
                    <li key={n.key} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-ink">{n.label}</p>
                        <p className="text-xs text-ink3">{n.desc}</p>
                      </div>
                      <Toggle checked={notifs[n.key as keyof typeof notifs]} onChange={(v) => setNotifs((s) => ({ ...s, [n.key]: v }))} />
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {tab === "api" && (
              <Card title="API & Accès" info={false}>
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-accent/30 bg-accentsoft p-3 text-sm text-ink2">
                  <KeyRound className="h-4 w-4 text-accent" />
                  Accès API REST inclus avec les plans <span className="font-semibold text-accent">Business</span> et <span className="font-semibold text-accent">Enterprise</span>.
                </div>

                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink3">Clé API</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 truncate rounded-xl border border-line bg-surface2 px-4 py-3 font-mono text-sm text-ink">{apiKey}</code>
                  <button onClick={copy} className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface2 text-ink2 transition-colors hover:border-accent hover:text-accent">
                    {copied ? <Check className="h-4 w-4 text-good" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface2 text-ink2 transition-colors hover:border-accent hover:text-accent">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-surface2 p-4">
                    <p className="text-xs uppercase tracking-wider text-ink3">Endpoint</p>
                    <code className="font-mono text-sm text-ink">https://api.1111.tn/v1</code>
                  </div>
                  <div className="rounded-xl border border-line bg-surface2 p-4">
                    <p className="text-xs uppercase tracking-wider text-ink3">Limite</p>
                    <p className="text-sm font-medium text-ink">10 000 requêtes / jour</p>
                  </div>
                </div>
              </Card>
            )}

            {tab === "sectors" && (
              <Card title="Segmentation par secteur" info={false}>
                <p className="mb-4 text-sm text-ink2">Sélectionnez les verticaux à suivre — l'interface et les données s'adaptent.</p>
                <ul className="space-y-2.5">
                  {sectors.map((s, i) => (
                    <li key={s} className="flex items-center justify-between rounded-xl border border-line bg-surface2 px-4 py-3.5">
                      <span className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accentsoft text-accent"><LayoutGrid className="h-4 w-4" /></span>
                        <span className="text-sm font-medium text-ink">{s}</span>
                      </span>
                      <Toggle checked={secActive[i]} onChange={(v) => setSecActive((arr) => arr.map((x, j) => (j === i ? v : x)))} />
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
