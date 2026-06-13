import type { ReactNode } from "react";
import {
  getGlassHover,
  getGlassSurface,
  getLandscapeTheme,
  getPanelTint,
  PANEL_TINTS,
} from "../../utils/uiLandscapeTokens";

export const grainBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

export const grainLayerClasses =
  "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.18] mix-blend-overlay bg-[length:180px_180px]";

export type GlassTint = keyof typeof PANEL_TINTS.day;

export const sectionShellClasses =
  "w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

export const glassPanelPadding = "p-4 sm:p-5 md:p-6 lg:p-8";

export const mobileScrollPanelClasses =
  "max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain md:max-h-none md:overflow-visible";

/** @deprecated Use getLandscapeTheme — kept for gradual migration */
export function getGlassTheme(isDarkMode: boolean) {
  const theme = getLandscapeTheme(isDarkMode);
  return {
    microLabel: theme.microLabel,
    displayTitle: theme.displayTitle,
    highlight: theme.highlight,
    bodyText: theme.bodyText,
    monoPill: theme.monoPill,
    ctaButton: theme.ctaButton,
    subPanel: theme.subPanel,
    accentBar: theme.accentBar,
    iconAccent: theme.iconAccent,
    calloutBox: theme.calloutBox,
    calloutHighlight: theme.calloutHighlight,
    subtitle: theme.subtitle,
    roleText: theme.roleText,
    badgeSky: theme.badgeSky,
    badgeAmber: theme.badgeAmber,
    badgeNeutral: theme.badgeNeutral,
  };
}

function GlassGrain() {
  return (
    <div
      className={grainLayerClasses}
      style={{ backgroundImage: grainBg }}
      aria-hidden="true"
    />
  );
}

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tint?: GlassTint;
  isDarkMode?: boolean;
  as?: "div" | "article";
};

export default function GlassPanel({
  children,
  className = "",
  hover = false,
  tint = "neutral",
  isDarkMode = false,
  as: Tag = "div",
}: GlassPanelProps) {
  const surface = getGlassSurface(isDarkMode);
  const tintClass = getPanelTint(tint, isDarkMode);
  const hoverClass = hover ? getGlassHover(isDarkMode) : "";

  return (
    <Tag className={`${surface} ${tintClass} ${hoverClass} ${className}`}>
      <GlassGrain />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
