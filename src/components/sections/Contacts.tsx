import { memo } from "react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  immersiveViewportClasses,
  sectionShellClasses,
} from "../ui/GlassPanel";
import ContactForm from "../ui/ContactForm";
import SectionHeader from "../ui/SectionHeader";
import SectionModeStack from "../ui/SectionModeStack";
import { CONTACT } from "../../content/portfolio";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    href: CONTACT.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    arcClass: "md:-rotate-2 md:translate-y-0",
  },
  {
    href: CONTACT.github,
    label: "GitHub",
    icon: GitHubIcon,
    arcClass: "md:rotate-1 md:-translate-y-1",
  },
] as const;

type ContactProps = {
  isDarkMode?: boolean;
};

const Contact = ({ isDarkMode = false }: ContactProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-center justify-center text-white text-left font-sans ${sectionShellClasses} ${immersiveViewportClasses}`}
    >
      <GlassPanel
        tint="warm"
        isDarkMode={isDarkMode}
        className={`w-full max-w-lg lg:max-w-3xl mx-auto ${glassPanelPadding} min-h-0 shrink-0`}
      >
        <SectionHeader
          isDarkMode={isDarkMode}
          align="center"
          dayTitle={<>Let&apos;s build</>}
          nightTitle={<>Let&apos;s build</>}
          daySubtitle="Something bright"
          nightSubtitle="Under the stars"
          hideSubtitleOnMobile
          hideSubtitleFromMd
          className="shrink-0 [&_h2]:!text-2xl [&_h2]:sm:!text-3xl [&_h2]:md:!text-5xl"
        />

        <div className="mt-3 md:mt-3 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-start min-h-0">
          <div className="lg:pr-1">
            <div className={`${theme.calloutBox} mb-3 md:mb-3`}>
              <SectionModeStack
                isDarkMode={isDarkMode}
                gridClassName="grid w-full"
                dayLayer={
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white leading-snug">
                    Actively seeking a{" "}
                    <span className={theme.calloutHighlight}>
                      Software Development Internship (OJT)
                    </span>{" "}
                    starting August 2026.
                  </p>
                }
                nightLayer={
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white leading-snug">
                    Open for a{" "}
                    <span className={theme.calloutHighlight}>
                      Software Development Internship (OJT)
                    </span>{" "}
                    — August 2026 onward.
                  </p>
                }
              />
            </div>

            <SectionModeStack
              isDarkMode={isDarkMode}
              gridClassName="grid w-full"
              className="mb-3 md:mb-3 lg:mb-0"
              dayLayer={
                <p
                  className={`text-xs sm:text-sm md:text-sm ${theme.bodyText} leading-relaxed`}
                >
                  {CONTACT.dayBody}
                </p>
              }
              nightLayer={
                <p
                  className={`text-xs sm:text-sm md:text-sm ${theme.bodyText} leading-relaxed`}
                >
                  {CONTACT.nightBody}
                </p>
              }
            />

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 pointer-events-auto md:items-end md:pb-1 mt-3 md:mt-3 lg:mt-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, arcClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} profile`}
                  className={`${theme.ctaButton} ${arcClass}`}
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center mt-3 md:mt-3 pointer-events-auto">
              <SectionModeStack
                isDarkMode={isDarkMode}
                gridClassName="grid place-items-center w-full"
                dayLayer={
                  <span className={theme.microLabel}>{CONTACT.location}</span>
                }
                nightLayer={
                  <span className={theme.microLabel}>
                    <span className="text-[#6dd5ff]/60 mr-1" aria-hidden="true">
                      ✦
                    </span>
                    {CONTACT.location}
                  </span>
                }
              />
            </div>
          </div>

          <div className="mt-4 lg:mt-0 min-h-0">
            <ContactForm variant="immersive" isDarkMode={isDarkMode} compact />
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};

export default memo(Contact);
