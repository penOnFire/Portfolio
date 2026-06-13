import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  isDarkAppearance,
  setStoredAppearance,
} from "../utils/appearancePreference";

export type NightCycle = {
  progress: number;
  target: number;
};

type DayNightUIContextValue = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const NightCycleRefContext = createContext<RefObject<NightCycle> | null>(null);
const DayNightUIContext = createContext<DayNightUIContextValue | null>(null);

export function DayNightProvider({ children }: { children: ReactNode }) {
  const initialDark = isDarkAppearance();
  const [isDarkMode, setIsDarkMode] = useState(initialDark);
  const nightCycleRef = useRef<NightCycle>({
    progress: initialDark ? 1 : 0,
    target: initialDark ? 1 : 0,
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((current) => {
      const next = !current;
      nightCycleRef.current.target = next ? 1 : 0;
      setStoredAppearance(next ? "dark" : "light");
      return next;
    });
  }, []);

  const uiValue = useMemo(
    () => ({ isDarkMode, toggleDarkMode }),
    [isDarkMode, toggleDarkMode],
  );

  return (
    <NightCycleRefContext.Provider value={nightCycleRef}>
      <DayNightUIContext.Provider value={uiValue}>{children}</DayNightUIContext.Provider>
    </NightCycleRefContext.Provider>
  );
}

/** Stable ref — 3D components subscribe without re-rendering on theme toggle. */
export function useNightCycleRef() {
  const ref = useContext(NightCycleRefContext);
  if (!ref) {
    throw new Error("useNightCycleRef must be used within DayNightProvider");
  }
  return ref;
}

/** HTML UI state — re-renders when day/night toggles. */
export function useDayNightUI() {
  const ctx = useContext(DayNightUIContext);
  if (!ctx) {
    throw new Error("useDayNightUI must be used within DayNightProvider");
  }
  return ctx;
}

export function useDayNight() {
  return {
    ...useDayNightUI(),
    nightCycleRef: useNightCycleRef(),
  };
}
