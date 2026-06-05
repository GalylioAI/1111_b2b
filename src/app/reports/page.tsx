"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, FileSpreadsheet, FileType, Download, Calendar, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

const generated = [
  { title: "Suivi des prix — hebdomadaire", date: "2 juin 2026", cat: "Prix", color: "var(--accent)" },
  { title: "Benchmark concurrentiel — Électronique", date: "1 juin 2026", cat: "BI", color: "var(--good)" },
  { title: "Intelligence SEO — comparatif sites", date: "28 mai 2026", cat: "SEO", color: "var(--warn)" },
  { title: "Part de marché estimée — Q2", date: "25 mai 2026", cat: "BI", color: "var(--accent-2)" },
  { title: "Promotions & ventes flash détectées", date: "22 mai 2026", cat: "Prix", color: "var(--danger)" },
];

const formats = [
  { id: "csv", label: "CSV", icon: FileText },
  { id: "excel", label: "Excel", icon: FileSpreadsheet },
  { id: "pdf", label: "PDF", icon: FileType },
];

export default function ReportsPage() {
  const [format, setFormat] = useState("excel");

  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Rapports"]}
        title="Rapports & Exports"
        description="Synthèses automatiques et export de vos analyses au format CSV, Excel ou PDF."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Download className="h-4 w-4" />
            Générer un rapport
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Generated reports */}
        <Card title="Rapports générés" info={false}>
          <ul className="space-y-2.5">
            {generated.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: `color-mix(in srgb, ${r.color} 15%, transparent)`, color: r.color }}>
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{r.title}</p>
                  <p className="text-xs text-ink3">{r.cat} · {r.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {formats.map((f) => {
                    const Icon = f.icon;
                    return (
                      <button key={f.id} title={f.label} className="grid h-8 w-8 place-items-center rounded-lg text-ink3 transition-colors hover:bg-surface3 hover:text-accent">
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          {/* Export config */}
          <Card title="Exporter des données" info={false} delay={0.1}>
            <p className="mb-3 text-sm text-ink2">Choisissez un format d'export.</p>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {formats.map((f) => {
                const Icon = f.icon;
                const active = format === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-sm font-medium transition-all ${
                      active ? "border-accent text-ink" : "border-line text-ink2 hover:border-line2"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? "text-accent" : "text-ink3"}`} />
                    {f.label}
                  </button>
                );
              })}
            </div>
            <button className="w-full rounded-xl accent-gradient py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.02] active:scale-95">
              Télécharger l'export
            </button>
          </Card>

          {/* Scheduled */}
          <Card title="Rapports planifiés" info={false} delay={0.2}>
            <ul className="space-y-3">
              {[
                { label: "Suivi des prix", freq: "Tous les lundis 08:00" },
                { label: "Benchmark concurrentiel", freq: "1er du mois" },
              ].map((s) => (
                <li key={s.label} className="flex items-center gap-3 rounded-xl border border-line bg-surface2 p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accentsoft text-accent">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">{s.label}</p>
                    <p className="text-xs text-ink3">{s.freq}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-good/10 px-2 py-0.5 text-[11px] font-semibold text-good">
                    <Check className="h-3 w-3" /> Actif
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
