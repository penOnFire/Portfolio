import { Moon, Sun } from "lucide-react";
import { useDayNight } from "../../context/DayNightContext";
import { ctaButtonClasses } from "./GlassPanel";

export default function DayNightToggle() {
  const { isDarkMode, toggleDarkMode } = useDayNight();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "Switch to day mode" : "Switch to night mode"}
      className={`${ctaButtonClasses} fixed top-4 right-4 z-50 font-mono text-xs uppercase tracking-widest`}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 shrink-0 text-amber-200" />
          Day
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 shrink-0 text-sky-200" />
          Night
        </>
      )}
    </button>
  );
}
