/** CSS tokens derived from nightPalettes.ts — keep in sync with 3D scene colors */

export const LANDSCAPE = {
  sky: { day: "#0066aa", night: "#0d1b2a" },
  skyEmissive: { day: "#003355", night: "#111933" },
  sunWarm: { day: "#fff4cc", night: "#88bbff" },
  sunGold: { day: "#FFD65A", night: "#b89d24" },
  sunBody: { day: "#ffcc00", night: "#8898aa" },
  moonGlow: { day: "#88bbff", night: "#88bbff" },
  starGlow: { day: "#6dd5ff", night: "#6dd5ff" },
  mountainTeal: { day: "#4d908e", night: "#3d6f78" },
  mountainGold: { day: "#b89d24", night: "#4f5f72" },
  grass: { day: "#4CAF50", night: "#3a6858" },
  cloud: { day: "#ffffff", night: "#8898aa" },
  textPrimary: "#E8E8E8",
} as const;

export type LandscapeMode = "day" | "night";

export function landscapeMode(isDarkMode: boolean): LandscapeMode {
  return isDarkMode ? "night" : "day";
}

export function landscapeHex(
  pair: { day: string; night: string },
  isDarkMode: boolean,
) {
  return isDarkMode ? pair.night : pair.day;
}

/** Panel tint classes keyed by GlassTint */
export const PANEL_TINTS = {
  day: {
    sky: "bg-[#0066aa]/12 bg-sky-950/25",
    warm: "bg-[#fff4cc]/8 bg-amber-950/20",
    neutral: "bg-slate-950/22 bg-[#4d908e]/5",
  },
  night: {
    sky: "bg-[#0d1b2a]/55 bg-[#111933]/40",
    warm: "bg-[#0d1b2a]/50 bg-[#111933]/35",
    neutral: "bg-[#0d1b2a]/48 bg-slate-950/40",
  },
} as const;

export function getPanelTint(tint: keyof typeof PANEL_TINTS.day, isDarkMode: boolean) {
  return PANEL_TINTS[landscapeMode(isDarkMode)][tint];
}

export function getGlassSurface(isDarkMode: boolean) {
  return isDarkMode
    ? "relative overflow-hidden backdrop-blur-md rounded-2xl ring-1 ring-[#88bbff]/18 shadow-[inset_0_1px_1px_rgba(136,187,255,0.12),0_28px_56px_rgba(0,0,0,0.55)]"
    : "relative overflow-hidden backdrop-blur-md rounded-2xl ring-1 ring-white/8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_28px_56px_rgba(0,0,0,0.38)]";
}

export function getGlassHover(isDarkMode: boolean) {
  return isDarkMode
    ? "transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[inset_0_1px_1px_rgba(136,187,255,0.18),0_32px_64px_rgba(0,0,0,0.55)] md:hover:ring-[#6dd5ff]/25"
    : "transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[inset_0_1px_1px_rgba(255,244,204,0.25),0_32px_64px_rgba(0,0,0,0.42)] md:hover:ring-[#b89d24]/20";
}

export function getLandscapeTheme(isDarkMode: boolean) {
  const night = isDarkMode;

  return {
    microLabel: night
      ? "text-[10px] uppercase tracking-[0.2em] text-[#88bbff]/55 font-mono"
      : "text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono",

    displayTitle: night
      ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-[#E8E8E8] [text-shadow:0_0_24px_rgba(109,213,255,0.14)]"
      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]",

    highlight: night
      ? "text-[#6dd5ff] font-medium [text-shadow:0_0_10px_rgba(109,213,255,0.35)]"
      : "text-[#FFD65A]/95 font-medium",

    bodyText: night ? "text-white/72" : "text-white/65",

    monoPill: night
      ? "font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full bg-[#88bbff]/10 ring-1 ring-[#6dd5ff]/20 text-[#E8E8E8]/90"
      : "font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full bg-[#4CAF50]/8 ring-1 ring-[#4d908e]/25 text-gray-200",

    ctaButton: night
      ? "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#88bbff]/10 ring-1 ring-[#6dd5ff]/22 font-medium text-[#E8E8E8]/95 shadow-[inset_0_1px_0_rgba(136,187,255,0.16)] hover:bg-[#88bbff]/18 hover:ring-[#6dd5ff]/35 transition-all pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6dd5ff]"
      : "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fff4cc]/8 ring-1 ring-[#b89d24]/22 font-medium text-white/90 shadow-[inset_0_1px_0_rgba(255,244,204,0.18)] hover:bg-[#fff4cc]/14 hover:ring-[#b89d24]/30 transition-all pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD65A]",

    subPanel: night
      ? "relative overflow-hidden bg-[#0d1b2a]/40 backdrop-blur-sm rounded-xl ring-1 ring-[#88bbff]/12 shadow-[inset_0_1px_0_rgba(136,187,255,0.1)]"
      : "relative overflow-hidden bg-white/[0.04] backdrop-blur-sm rounded-xl ring-1 ring-[#4d908e]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",

    accentBar: night
      ? "absolute left-0 top-8 h-24 w-1 bg-[#88bbff]/45 rounded-full hidden sm:block [box-shadow:0_0_12px_rgba(109,213,255,0.35)]"
      : "absolute left-0 top-8 h-24 w-1 bg-[#b89d24]/50 rounded-full hidden sm:block",

    iconAccent: night ? "text-[#6dd5ff]/80" : "text-[#4d908e]/90",

    calloutBox: night
      ? "ring-1 ring-[#88bbff]/22 bg-[#0d1b2a]/50 rounded-xl p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(136,187,255,0.12)]"
      : "ring-1 ring-[#b89d24]/25 bg-[#fff4cc]/6 rounded-xl p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(255,244,204,0.14)]",

    calloutHighlight: night
      ? "text-[#6dd5ff] font-semibold [text-shadow:0_0_10px_rgba(109,213,255,0.35)]"
      : "text-[#FFD65A] font-semibold",

    subtitle: night ? "text-white/85" : "text-white/80",
    roleText: night ? "text-white/40" : "text-white/35",

    badgeSky: night
      ? "font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#3d6f78]/35 ring-1 ring-[#4d908e]/30 text-[#E8E8E8]/90"
      : "font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#4d908e]/15 ring-1 ring-[#4d908e]/28 text-sky-100",

    badgeAmber: night
      ? "font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#88bbff]/10 ring-1 ring-[#6dd5ff]/22 text-[#E8E8E8]/90"
      : "font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#b89d24]/12 ring-1 ring-[#b89d24]/28 text-[#fff4cc]/95",

    badgeNeutral: night
      ? "font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#8898aa]/12 ring-1 ring-[#8898aa]/22 text-[#E8E8E8]/85"
      : "font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] ring-1 ring-[#8898aa]/18 text-gray-200",

    introUnderline: night
      ? "h-px w-full max-w-sm bg-[#88bbff]/40 mt-3 md:mt-5 mx-auto origin-center [box-shadow:0_0_8px_rgba(109,213,255,0.35)]"
      : "h-px w-full max-w-sm bg-[#b89d24]/45 mt-3 md:mt-5 mx-auto origin-center",

    introSubtext: night
      ? "mt-4 md:mt-8 font-mono text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#88bbff]/45 max-w-md text-center"
      : "mt-4 md:mt-8 font-mono text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#4CAF50]/50 max-w-md text-center",

    introHalo: night
      ? "pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(13,27,42,0.55)_0%,transparent_70%)]"
      : "pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,214,90,0.08)_0%,transparent_65%)]",

    starGlowText:
      "text-[#6dd5ff] [text-shadow:0_0_6px_#4fc3ff,0_0_16px_#3b9eff,0_0_32px_#2288ee,0_0_48px_#0066cc]",

    headlineText: "block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E8E8E8]",
    accentLine: "block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1",
    accentSun: "block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 text-[#FFD65A]",
  };
}
