import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getStoredAppearance } from "../utils/appearancePreference";

const IMMERSIVE_OVERLAY = "bg-[#0066aa]";
const COVER_MS = 350;
const REVEAL_MS = 400;

type ViewRoute = "/minimal" | "/immersive";

type ViewTransitionContextValue = {
  transitionTo: (path: ViewRoute) => void;
  isTransitioning: boolean;
  prefetchImmersive: () => void;
};

const ViewTransitionContext = createContext<ViewTransitionContextValue | null>(
  null,
);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMinimalOverlayClass() {
  return getStoredAppearance() === "dark" ? "bg-neutral-950" : "bg-neutral-50";
}

function getOverlayClass(path: ViewRoute) {
  return path === "/minimal" ? getMinimalOverlayClass() : IMMERSIVE_OVERLAY;
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function ViewTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [overlayClass, setOverlayClass] = useState(IMMERSIVE_OVERLAY);
  const isTransitioningRef = useRef(false);

  const isTransitioning = phase !== "idle";

  useEffect(() => {
    const root = document.documentElement;
    if (isTransitioning) {
      root.dataset.transitioning = "true";
    } else {
      delete root.dataset.transitioning;
    }

    return () => {
      delete root.dataset.transitioning;
    };
  }, [isTransitioning]);

  const prefetchImmersive = useCallback(() => {
    void import("../components/pages/Landing");
  }, []);

  const transitionTo = useCallback(
    async (path: ViewRoute) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      if (prefersReducedMotion()) {
        navigate(path);
        isTransitioningRef.current = false;
        return;
      }

      setOverlayClass(getOverlayClass(path));
      setPhase("cover");

      await wait(COVER_MS);
      navigate(path);
      await waitForPaint();
      setPhase("reveal");

      await wait(REVEAL_MS);
      setPhase("idle");
      isTransitioningRef.current = false;
    },
    [navigate],
  );

  return (
    <ViewTransitionContext.Provider
      value={{ transitionTo, isTransitioning, prefetchImmersive }}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className={`fixed inset-0 z-[200] ${overlayClass}`}
        initial={false}
        animate={{ opacity: phase === "cover" ? 1 : 0 }}
        transition={{
          duration:
            phase === "cover"
              ? COVER_MS / 1000
              : phase === "reveal"
                ? REVEAL_MS / 1000
                : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          pointerEvents: isTransitioning ? "auto" : "none",
        }}
      />
    </ViewTransitionContext.Provider>
  );
}

export function useViewTransition() {
  const ctx = useContext(ViewTransitionContext);
  if (!ctx) {
    throw new Error(
      "useViewTransition must be used within ViewTransitionProvider",
    );
  }
  return ctx;
}
