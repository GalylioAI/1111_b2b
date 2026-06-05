"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, Boxes, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { suppliers } from "@/lib/b2b";

const priceColor: Record<string, string> = {
  "Très bas": "var(--good)",
  Bas: "var(--good)",
  Compétitif: "var(--accent)",
  "Élevé": "var(--warn)",
};

export default function SuppliersPage() {
  return (
    <div className="mx-auto max-w-[1480px]">
      <PageHeader
        crumbs={["1111.tn", "Fournisseurs"]}
        title="Comparaison fournisseurs"
        description="Module dédié aux acheteurs B2B pour identifier les meilleures sources d'approvisionnement."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <Truck className="h-4 w-4" />
            Ajouter un fournisseur
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {suppliers.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card card-hover group p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl accent-gradient text-white">
                  <Truck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-ink">{s.name}</h3>
                  <p className="text-xs text-ink3">{s.products} produits référencés</p>
                </div>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink3 transition-all group-hover:border-accent group-hover:text-accent">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-line bg-surface2 p-3">
                <p className="mb-1 flex items-center gap-1 text-[11px] text-ink3"><Boxes className="h-3.5 w-3.5" /> Tarif</p>
                <p className="text-sm font-bold" style={{ color: priceColor[s.avgPrice] }}>{s.avgPrice}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface2 p-3">
                <p className="mb-1 flex items-center gap-1 text-[11px] text-ink3"><ShieldCheck className="h-3.5 w-3.5" /> Fiabilité</p>
                <p className="text-sm font-bold text-ink">{s.reliability}%</p>
              </div>
              <div className="rounded-xl border border-line bg-surface2 p-3">
                <p className="mb-1 flex items-center gap-1 text-[11px] text-ink3"><Clock className="h-3.5 w-3.5" /> Délai</p>
                <p className="text-sm font-bold text-ink">{s.lead}</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface3">
              <motion.div initial={{ width: 0 }} animate={{ width: `${s.reliability}%` }} transition={{ duration: 1, delay: 0.2 + i * 0.08 }} className="h-full rounded-full accent-gradient" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
