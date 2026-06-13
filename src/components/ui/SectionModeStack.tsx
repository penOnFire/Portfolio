import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

function usePrefersReducedMotion() {
  const ref = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      ref.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return ref;
}

type SectionModeStackProps = {
  isDarkMode: boolean;
  dayLayer: ReactNode;
  nightLayer: ReactNode;
  className?: string;
  gridClassName?: string;
};

export default function SectionModeStack({
  isDarkMode,
  dayLayer,
  nightLayer,
  className = "",
  gridClassName = "grid place-items-center",
}: SectionModeStackProps) {
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const modeTweenRef = useRef<gsap.core.Timeline | null>(null);
  const hasInitialized = useRef(false);
  const reducedMotionRef = usePrefersReducedMotion();

  useEffect(() => {
    const dayEl = dayRef.current;
    const nightEl = nightRef.current;
    if (!dayEl || !nightEl) return;

    modeTweenRef.current?.kill();

    const reduced = reducedMotionRef.current;

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      gsap.set(dayEl, {
        opacity: isDarkMode ? 0 : 1,
        y: 0,
        filter: reduced ? "blur(0px)" : "blur(0px)",
        pointerEvents: isDarkMode ? "none" : "auto",
      });
      gsap.set(nightEl, {
        opacity: isDarkMode ? 1 : 0,
        y: 0,
        filter: reduced ? "blur(0px)" : "blur(0px)",
        pointerEvents: isDarkMode ? "auto" : "none",
      });
      return;
    }

    if (reduced) {
      gsap.set(dayEl, {
        opacity: isDarkMode ? 0 : 1,
        y: 0,
        filter: "blur(0px)",
        pointerEvents: isDarkMode ? "none" : "auto",
      });
      gsap.set(nightEl, {
        opacity: isDarkMode ? 1 : 0,
        y: 0,
        filter: "blur(0px)",
        pointerEvents: isDarkMode ? "auto" : "none",
      });
      return;
    }

    const entering = isDarkMode ? nightEl : dayEl;
    const leaving = isDarkMode ? dayEl : nightEl;

    modeTweenRef.current = gsap
      .timeline()
      .to(leaving, {
        opacity: 0,
        y: isDarkMode ? -16 : 16,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power2.inOut",
        pointerEvents: "none",
      })
      .fromTo(
        entering,
        {
          opacity: 0,
          y: isDarkMode ? 20 : -20,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          pointerEvents: "auto",
        },
        "-=0.28",
      );
  }, [isDarkMode, reducedMotionRef]);

  useEffect(() => {
    return () => {
      modeTweenRef.current?.kill();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className={gridClassName}>
        <div
          ref={dayRef}
          className="col-start-1 row-start-1 w-full"
          aria-hidden={isDarkMode}
        >
          {dayLayer}
        </div>
        <div
          ref={nightRef}
          className="col-start-1 row-start-1 w-full"
          aria-hidden={!isDarkMode}
        >
          {nightLayer}
        </div>
      </div>
    </div>
  );
}

export { usePrefersReducedMotion };
