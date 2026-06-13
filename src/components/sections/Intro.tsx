import { useEffect, useRef } from "react";
import gsap from "gsap";
import { sectionShellClasses } from "../ui/GlassPanel";
import SectionModeStack from "../ui/SectionModeStack";
import { getLandscapeTheme } from "../../utils/uiLandscapeTokens";

type IntroProps = {
  contentRef?: React.RefObject<HTMLDivElement | null>;
  isDarkMode?: boolean;
};

const Intro = ({ contentRef, isDarkMode = false }: IntroProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = contentRef ?? localRef;
  const isEntrance = Boolean(contentRef);
  const theme = getLandscapeTheme(isDarkMode);

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

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center h-full w-full text-center ${sectionShellClasses}`}
    >
      <div className="relative w-full max-w-4xl">
        <div className={theme.introHalo} aria-hidden="true" />

        <h1 className="relative font-display font-black leading-[0.95] tracking-[-0.05em] grid place-items-center">
          <SectionModeStack
            isDarkMode={isDarkMode}
            gridClassName="grid place-items-center w-full"
            dayLayer={
              <div className="col-start-1 row-start-1 flex flex-col items-center">
                <span data-intro-headline className={theme.headlineText}>
                  Everybody needs a little
                </span>
                <span data-intro-accent className={theme.accentSun}>
                  Seanshine.
                </span>
              </div>
            }
            nightLayer={
              <div className="col-start-1 row-start-1 flex flex-col items-center">
                <span className={theme.headlineText}>
                  Even on the darkest night, the <br />
                  <span className={theme.accentLine}>
                    <span className={theme.starGlowText}>Stars</span> shines
                    bright
                  </span>
                </span>
              </div>
            }
          />
        </h1>

        <div
          data-intro-underline
          className={`${theme.introUnderline} origin-center`}
        />

        <SectionModeStack
          isDarkMode={isDarkMode}
          gridClassName="grid place-items-center w-full"
          dayLayer={
            <p
              data-intro-subtext
              className={getLandscapeTheme(false).introSubtext}
            >
              Scroll to explore
            </p>
          }
          nightLayer={
            <p
              data-intro-subtext
              className={getLandscapeTheme(true).introSubtext}
            >
              Scroll to explore
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Intro;
