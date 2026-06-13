import { Moon, Sun } from "lucide-react";
import { useDayNightUI } from "../../context/DayNightContext";
import { getLandscapeTheme } from "../../utils/uiLandscapeTokens";

export default function DayNightToggle() {
  const { isDarkMode, toggleDarkMode } = useDayNightUI();
  const theme = getLandscapeTheme(isDarkMode);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "Switch to day mode" : "Switch to night mode"}
      className={`${theme.ctaButton} fixed top-4 right-4 z-50 font-mono text-xs uppercase tracking-widest`}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 shrink-0 text-[#FFD65A]" />
          Day
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 shrink-0 text-[#88bbff]" />
          Night
        </>
      )}
    </button>
  );
}
