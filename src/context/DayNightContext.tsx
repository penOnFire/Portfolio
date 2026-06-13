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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const nightCycleRef = useRef<NightCycle>({ progress: 0, target: 0 });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((current) => {
      nightCycleRef.current.target = current ? 0 : 1;
      return !current;
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
