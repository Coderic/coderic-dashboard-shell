import { useId, type CSSProperties } from "react";
import type { DashboardBrandAccent, DashboardBrandConfig } from "../brand-types.js";

export type BrandMarkProps = DashboardBrandConfig;

const DEFAULT_ACCENT = { start: "#fec963", mid: "#fea032", end: "#ff5c0a" };

export function BrandMark({ logoSrc, logoAlt, title, subtitle, homeHref, accent }: BrandMarkProps) {
  const uid = useId().replace(/:/g, "");
  const metalId = `dsh-metal-${uid}`;
  const brandId = `dsh-brand-${uid}`;
  const colors = accent ?? DEFAULT_ACCENT;
  const label = subtitle?.trim();
  const ariaLabel = label ? `${title} ${label}` : title;
  const content = (
    <span className="dsh-brand" role="img" aria-label={ariaLabel}>
      {logoSrc ? (
        <img className="dsh-brand__logo" src={logoSrc} alt={logoAlt ?? title} width={48} height={48} />
      ) : null}
      <svg
        className="dsh-brand__wordmark"
        viewBox="0 0 220 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={metalId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(0,0%,58%)" />
            <stop offset="47%" stopColor="hsl(0,0%,80%)" />
            <stop offset="53%" stopColor="hsl(0,0%,38%)" />
            <stop offset="100%" stopColor="hsl(0,0%,58%)" />
          </linearGradient>
          <linearGradient id={brandId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="50%" stopColor={colors.mid ?? colors.end} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>
        <text x="0" y="35" fill={`url(#${metalId})`} className="dsh-brand__title-svg">
          {title}
        </text>
        {label ? (
          <text x="0" y="52" fill={`url(#${brandId})`} className="dsh-brand__subtitle-svg">
            {label}
          </text>
        ) : null}
      </svg>
    </span>
  );
  if (homeHref) {
    return (
      <a className="dsh-brand-link" href={homeHref}>
        {content}
      </a>
    );
  }
  return content;
}

export function brandThemeStyle(accent?: DashboardBrandAccent): CSSProperties {
  const colors = accent ?? DEFAULT_ACCENT;
  return {
    "--dsh-accent-start": colors.start,
    "--dsh-accent-mid": colors.mid ?? colors.end,
    "--dsh-accent-end": colors.end,
    "--pf-t--global--color--brand--default": colors.end,
    "--pf-t--global--color--brand--hover": colors.mid ?? colors.end,
  } as CSSProperties;
}
