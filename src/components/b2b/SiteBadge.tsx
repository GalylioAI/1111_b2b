"use client";

import { sites } from "@/lib/b2b";

const siteOf = (name: string) => sites.find((s) => s.name === name);

export function SiteBadge({
  name,
  showName = true,
  size = 28,
}: {
  name: string;
  showName?: boolean;
  size?: number;
}) {
  const site = siteOf(name);
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="grid shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white shadow-sm"
        style={{ width: size, height: size }}
      >
        {site?.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.logo}
            alt={name}
            className="object-contain"
            style={{ width: "82%", height: "82%" }}
          />
        ) : (
          <span style={{ fontSize: size * 0.42 }} className="font-bold text-ink">
            {name[0]}
          </span>
        )}
      </span>
      {showName && <span className="text-sm font-medium text-ink">{name}</span>}
    </span>
  );
}
