import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getMinimalTheme } from "../../utils/minimalTokens";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`${theme.button} fixed top-4 right-4 z-50 font-mono text-xs uppercase tracking-widest`}
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 shrink-0" />
          Light
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 shrink-0" />
          Dark
        </>
      )}
    </button>
  );
}
