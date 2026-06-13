import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type NightCycle = {
  progress: number;
  target: number;
};

type DayNightContextValue = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  nightCycleRef: React.RefObject<NightCycle>;
};

const DayNightContext = createContext<DayNightContextValue | null>(null);

export function DayNightProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const nightCycleRef = useRef<NightCycle>({ progress: 0, target: 0 });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((current) => {
      nightCycleRef.current.target = current ? 0 : 1;
      return !current;
    });
  }, []);

  return (
    <DayNightContext.Provider
      value={{ isDarkMode, toggleDarkMode, nightCycleRef }}
    >
      {children}
    </DayNightContext.Provider>
  );
}

export function useDayNight() {
  const ctx = useContext(DayNightContext);
  if (!ctx) {
    throw new Error("useDayNight must be used within DayNightProvider");
  }
  return ctx;
}
