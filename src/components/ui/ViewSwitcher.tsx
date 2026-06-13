import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getMinimalTheme } from "../../utils/minimalTokens";

type ViewSwitcherProps = {
  variant: "immersive" | "minimal";
};

export default function ViewSwitcher({ variant }: ViewSwitcherProps) {
  if (variant === "immersive") {
    return (
      <Link
        to="/minimal"
        className="fixed top-4 left-4 z-50 font-mono text-xs uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-sm ring-1 ring-white/15 px-3 py-2 rounded-xl hover:bg-white/15 transition-colors pointer-events-auto"
      >
        Minimal view →
      </Link>
    );
  }

  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <Link
      to="/immersive"
      className={`${theme.button} fixed top-4 left-4 z-50 font-mono text-xs uppercase tracking-widest`}
    >
      ← Immersive world
    </Link>
  );
}
