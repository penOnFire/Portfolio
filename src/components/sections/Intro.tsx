import { useEffect, useRef } from "react";
import gsap from "gsap";
import { sectionShellClasses } from "../ui/GlassPanel";

type IntroProps = {
  contentRef?: React.RefObject<HTMLDivElement | null>;
  isDarkMode?: boolean;
};

const starGlowClasses =
  "text-[#6dd5ff] [text-shadow:0_0_6px_#4fc3ff,0_0_16px_#3b9eff,0_0_32px_#2288ee,0_0_48px_#0066cc]";

const headlineClasses =
  "block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E8E8E8]";

const accentClasses = "block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1";

const Intro = ({ contentRef, isDarkMode = false }: IntroProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  const dayTextRef = useRef<HTMLDivElement>(null);
  const nightTextRef = useRef<HTMLDivElement>(null);
  const modeTweenRef = useRef<gsap.core.Timeline | null>(null);
  const hasModeInitialized = useRef(false);
  const ref = contentRef ?? localRef;
  const isEntrance = Boolean(contentRef);

  useEffect(() => {
    if (!isEntrance || !contentRef?.current) return;

    const root = contentRef.current;
    const headline = root.querySelector("[data-intro-headline]");
    const accent = root.querySelector("[data-intro-accent]");
    const underline = root.querySelector("[data-intro-underline]");
    const subtext = root.querySelector("[data-intro-subtext]");

    gsap.set(headline, { opacity: 0, y: 48, filter: "blur(10px)" });
    gsap.set(accent, { opacity: 0, y: 40, filter: "blur(8px)" });
    gsap.set(underline, { scaleX: 0, opacity: 0 });
    gsap.set(subtext, { opacity: 0, y: 12, letterSpacing: "0.55em" });
  }, [contentRef, isEntrance]);

  useEffect(() => {
    const dayText = dayTextRef.current;
    const nightText = nightTextRef.current;
    if (!dayText || !nightText) return;

    modeTweenRef.current?.kill();

    if (!hasModeInitialized.current) {
      hasModeInitialized.current = true;
      gsap.set(dayText, {
        opacity: isDarkMode ? 0 : 1,
        y: 0,
        filter: "blur(0px)",
        pointerEvents: isDarkMode ? "none" : "auto",
      });
      gsap.set(nightText, {
        opacity: isDarkMode ? 1 : 0,
        y: 0,
        filter: "blur(0px)",
        pointerEvents: isDarkMode ? "auto" : "none",
      });
      return;
    }

    const entering = isDarkMode ? nightText : dayText;
    const leaving = isDarkMode ? dayText : nightText;

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
  }, [isDarkMode]);

  useEffect(() => {
    return () => {
      modeTweenRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      // Changed to items-center and text-center
      className={`flex flex-col items-center justify-center h-full w-full text-center ${sectionShellClasses}`}
    >
      {/* Added place-items-center to keep the overlapping grid layers perfectly centered */}
      <h1 className="relative font-display font-black leading-[0.95] tracking-[-0.05em] max-w-4xl grid place-items-center">
        <div
          ref={dayTextRef}
          className="col-start-1 row-start-1 flex flex-col items-center"
        >
          <span data-intro-headline className={headlineClasses}>
            Everybody needs a little
          </span>
          <span data-intro-accent className={`${accentClasses} text-[#FFD65A]`}>
            Seanshine.
          </span>
        </div>

        <div
          ref={nightTextRef}
          className="col-start-1 row-start-1 flex flex-col items-center"
          aria-hidden={!isDarkMode}
        >
          <span className={headlineClasses}>Even on the darkest night the</span>
          <span className={`${accentClasses} text-[#E8E8E8]`}>
            <span className={starGlowClasses}>Star</span> shines bright
          </span>
        </div>
      </h1>

      <div
        data-intro-underline
        // Added mx-auto to center it, and changed origin-left to origin-center for animations
        className="h-px w-full max-w-sm bg-[#58A6FF]/35 mt-3 md:mt-5 mx-auto origin-center"
      />

      <p
        data-intro-subtext
        // Added text-center
        className="mt-4 md:mt-8 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/40 max-w-md text-center"
      >
        Scroll to explore
      </p>
    </div>
  );
};

export default Intro;
