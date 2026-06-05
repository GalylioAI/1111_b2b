"use client";

import { motion } from "framer-motion";
import { UserPlus, Shield, Eye, BarChart3, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { team, roles } from "@/lib/b2b";

const roleIcon: Record<string, typeof Shield> = {
  Administrateur: Shield,
  Analyste: BarChart3,
  Lecteur: Eye,
};
const roleColor: Record<string, string> = {
  Administrateur: "var(--accent)",
  Analyste: "var(--good)",
  Lecteur: "var(--warn)",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        crumbs={["1111.tn", "Équipe"]}
        title="Équipe & Accès"
        description="Gestion des accès multi-utilisateurs avec attribution de rôles distincts."
        action={
          <button className="inline-flex items-center gap-2 rounded-full accent-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_var(--accent-glow)] transition-transform hover:scale-[1.03] active:scale-95">
            <UserPlus className="h-4 w-4" />
            Inviter un membre
          </button>
        }
      />

      {/* Roles */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {roles.map((r, i) => {
          const Icon = roleIcon[r.name];
          const color = roleColor[r.name];
          return (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card card-hover p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-bold text-ink">{r.count}</span>
              </div>
              <h3 className="font-display text-[15px] font-semibold text-ink">{r.name}</h3>
              <p className="mt-1 text-xs text-ink3">{r.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Members */}
      <Card title="Membres de l'équipe" info={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ink3">
                <th className="pb-3 font-medium">Membre</th>
                <th className="pb-3 font-medium">Rôle</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {team.map((m, i) => {
                const Icon = roleIcon[m.role];
                const color = roleColor[m.role];
                return (
                  <motion.tr
                    key={m.email}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="border-t border-line transition-colors hover:bg-surface2"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative">
                          <span className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: m.color }}>
                            {m.initials}
                          </span>
                          {m.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-good" />}
                        </span>
                        <div>
                          <p className="font-medium text-ink">{m.name}</p>
                          <p className="text-xs text-ink3">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
                        <Icon className="h-3.5 w-3.5" /> {m.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-medium ${m.online ? "text-good" : "text-ink3"}`}>
                        {m.online ? "En ligne" : "Hors ligne"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink3 transition-colors hover:bg-surface3 hover:text-ink">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
