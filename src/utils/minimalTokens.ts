export function getMinimalTheme(isDark: boolean) {
  return {
    page: isDark
      ? "min-h-screen bg-neutral-950 text-neutral-100"
      : "min-h-screen bg-neutral-50 text-neutral-900",
    card: isDark
      ? "rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 md:p-6"
      : "rounded-2xl border border-neutral-200 bg-white p-5 md:p-6",
    cardTitle: "text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400",
    heading: "text-2xl md:text-3xl font-bold tracking-tight",
    subheading: "text-lg font-semibold tracking-tight",
    body: isDark ? "text-neutral-300 leading-relaxed" : "text-neutral-600 leading-relaxed",
    muted: isDark ? "text-neutral-500" : "text-neutral-400",
    chip: isDark
      ? "inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/80 px-2.5 py-1 text-xs text-neutral-200"
      : "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700",
    button: isDark
      ? "inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
      : "inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
    buttonPrimary: isDark
      ? "inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-90"
      : "inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90",
    link: isDark
      ? "text-neutral-300 underline-offset-4 hover:underline"
      : "text-neutral-700 underline-offset-4 hover:underline",
    dot: isDark ? "bg-neutral-400" : "bg-neutral-900",
    line: isDark ? "bg-neutral-700" : "bg-neutral-200",
    callout: isDark
      ? "rounded-xl border border-neutral-700 bg-neutral-800/60 p-4"
      : "rounded-xl border border-neutral-200 bg-neutral-100/80 p-4",
    formLabel: isDark
      ? "block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5"
      : "block text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1.5",
    formInput: isDark
      ? "w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
      : "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-50",
    formTextarea: isDark
      ? "w-full min-h-[5.5rem] resize-y rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 md:min-h-[6.5rem]"
      : "w-full min-h-[5.5rem] resize-y rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-50 md:min-h-[6.5rem]",
    formStatusSuccess: isDark ? "text-sm font-medium text-neutral-200" : "text-sm font-medium text-neutral-800",
    formStatusError: isDark ? "text-sm font-medium text-red-400" : "text-sm font-medium text-red-600",
  };
}
