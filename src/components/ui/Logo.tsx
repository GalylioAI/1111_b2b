"use client";

/* Brand lockup. The supplied SVG is dark line-art, so we render it monochrome
   and let it adapt to the theme (brand-dark on light, crisp white on dark). */
export function Logo({
  showWordmark = true,
  size = 30,
}: {
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <span
        className="grid place-items-center rounded-xl accent-gradient shadow-[0_8px_22px_-8px_var(--accent-glow)]"
        style={{ width: size + 12, height: size + 12 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo_1111.svg"
          alt="1111"
          style={{ width: size, height: size, objectFit: "contain" }}
          className="brightness-0 invert"
        />
      </span>
      {showWordmark && (
        <div className="leading-none">
          <p className="font-display text-[15px] font-bold tracking-tight text-ink">
            1111<span className="text-accent">.tn</span>
          </p>
          <p className="mt-0.5 text-[10px] font-medium tracking-[0.16em] text-ink3">
            PRICE INTELLIGENCE
          </p>
        </div>
      )}
    </div>
  );
}
