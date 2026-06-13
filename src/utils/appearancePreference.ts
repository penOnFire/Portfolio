export const APPEARANCE_STORAGE_KEY = "seanshine-minimal-theme";

export type Appearance = "light" | "dark";

export function getStoredAppearance(): Appearance {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(APPEARANCE_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setStoredAppearance(theme: Appearance) {
  localStorage.setItem(APPEARANCE_STORAGE_KEY, theme);
}

export function isDarkAppearance() {
  return getStoredAppearance() === "dark";
}
