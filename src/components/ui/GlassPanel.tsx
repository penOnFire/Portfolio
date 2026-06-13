import type { ReactNode } from "react";

export const grainBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

export const grainLayerClasses =
  "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.18] mix-blend-overlay bg-[length:180px_180px]";

export const glassSurfaceClasses =
  "relative overflow-hidden backdrop-blur-md rounded-2xl ring-1 ring-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_28px_56px_rgba(0,0,0,0.4)]";

const glassSurfaceClassesDark =
  "relative overflow-hidden backdrop-blur-md rounded-2xl ring-1 ring-indigo-400/20 shadow-[inset_0_1px_1px_rgba(147,197,253,0.14),0_28px_56px_rgba(0,0,0,0.55)]";

const TINT_CLASSES = {
  sky: "bg-sky-950/30 bg-[#0066aa]/10",
  warm: "bg-amber-950/25 bg-[#fff4cc]/5",
  neutral: "bg-slate-950/25",
} as const;

const TINT_CLASSES_DARK = {
  sky: "bg-[#0a1628]/55 bg-indigo-950/35",
  warm: "bg-[#0d1a2e]/50 bg-slate-950/40",
  neutral: "bg-slate-950/45 bg-[#0a1628]/40",
} as const;

export type GlassTint = keyof typeof TINT_CLASSES;

export const glassSubPanelClasses =
  "relative overflow-hidden bg-white/[0.03] backdrop-blur-sm rounded-xl ring-1 ring-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]";

export const glassSubPanelClassesDark =
  "relative overflow-hidden bg-indigo-950/30 backdrop-blur-sm rounded-xl ring-1 ring-indigo-400/12 shadow-[inset_0_1px_0_rgba(147,197,253,0.1)]";

export const microLabelClasses =
  "text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono";

export const microLabelClassesDark =
  "text-[10px] uppercase tracking-[0.2em] text-indigo-200/55 font-mono";

export const displayTitleClasses =
  "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]";

export const displayTitleClassesDark =
  "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white [text-shadow:0_0_24px_rgba(79,195,255,0.12)]";

export const sectionShellClasses =
  "w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

export const glassPanelPadding = "p-4 sm:p-5 md:p-6 lg:p-8";

export const mobileScrollPanelClasses =
  "max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain md:max-h-none md:overflow-visible";

export const highlightTextClasses = "text-amber-200/90 font-medium";

export const highlightTextClassesDark =
  "text-[#6dd5ff] font-medium [text-shadow:0_0_10px_rgba(79,195,255,0.35)]";

export const bodyTextClasses = "text-white/65";

export const bodyTextClassesDark = "text-white/72";

export const monoPillClasses =
  "font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/5 text-gray-200";

export const monoPillClassesDark =
  "font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full bg-indigo-500/10 ring-1 ring-indigo-400/18 text-indigo-100";

export const ctaButtonClasses =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] ring-1 ring-white/10 font-medium text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-white/12 hover:ring-white/20 transition-all pointer-events-auto";

export const ctaButtonClassesDark =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/12 ring-1 ring-indigo-400/22 font-medium text-indigo-50 shadow-[inset_0_1px_0_rgba(147,197,253,0.18)] hover:bg-indigo-500/20 hover:ring-indigo-300/30 transition-all pointer-events-auto";

export function getGlassTheme(isDarkMode: boolean) {
  return {
    microLabel: isDarkMode ? microLabelClassesDark : microLabelClasses,
    displayTitle: isDarkMode ? displayTitleClassesDark : displayTitleClasses,
    highlight: isDarkMode ? highlightTextClassesDark : highlightTextClasses,
    bodyText: isDarkMode ? bodyTextClassesDark : bodyTextClasses,
    monoPill: isDarkMode ? monoPillClassesDark : monoPillClasses,
    ctaButton: isDarkMode ? ctaButtonClassesDark : ctaButtonClasses,
    subPanel: isDarkMode ? glassSubPanelClassesDark : glassSubPanelClasses,
    accentBar: isDarkMode
      ? "absolute left-0 top-8 h-24 w-1 bg-[#4fc3ff]/40 rounded-full hidden sm:block"
      : "absolute left-0 top-8 h-24 w-1 bg-amber-300/40 rounded-full hidden sm:block",
    iconAccent: isDarkMode ? "text-cyan-300/75" : "text-cyan-200/70",
    calloutBox: isDarkMode
      ? "ring-1 ring-cyan-400/20 bg-indigo-950/45 rounded-xl p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(147,197,253,0.12)]"
      : "ring-1 ring-amber-200/20 bg-amber-950/30 rounded-xl p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(255,244,204,0.15)]",
    calloutHighlight: isDarkMode
      ? "text-[#6dd5ff] font-semibold [text-shadow:0_0_10px_rgba(79,195,255,0.35)]"
      : "text-amber-200 font-semibold",
    subtitle: isDarkMode ? "text-white/85" : "text-white/80",
    roleText: isDarkMode ? "text-white/40" : "text-white/35",
    badgeSky: isDarkMode
      ? "font-mono text-[11px] px-2.5 py-1 rounded-full bg-cyan-500/12 ring-1 ring-cyan-400/22 text-cyan-100"
      : "font-mono text-[11px] px-2.5 py-1 rounded-full bg-sky-500/10 ring-1 ring-sky-400/20 text-sky-100",
    badgeAmber: isDarkMode
      ? "font-mono text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/12 ring-1 ring-indigo-400/22 text-indigo-100"
      : "font-mono text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 ring-1 ring-amber-400/20 text-amber-100",
    badgeNeutral: isDarkMode
      ? monoPillClassesDark + " px-2.5 py-1"
      : monoPillClasses + " px-2.5 py-1",
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
  const surface = isDarkMode ? glassSurfaceClassesDark : glassSurfaceClasses;
  const tintClass = isDarkMode ? TINT_CLASSES_DARK[tint] : TINT_CLASSES[tint];
  const hoverClass = hover
    ? isDarkMode
      ? "transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[inset_0_1px_1px_rgba(147,197,253,0.2),0_32px_64px_rgba(0,0,0,0.55)] md:hover:ring-indigo-300/28"
      : "transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_32px_64px_rgba(0,0,0,0.45)]"
    : "";

  return (
    <Tag className={`${surface} ${tintClass} ${hoverClass} ${className}`}>
      <GlassGrain />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
