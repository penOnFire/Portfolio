import { memo } from "react";
import { Mail, Phone } from "lucide-react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  sectionShellClasses,
} from "../ui/GlassPanel";

const LINKEDIN_URL = "https://linkedin.com/in/sean-m-fernandez";
const GITHUB_URL = "https://github.com/seanmfernandez";

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

type ContactProps = {
  isDarkMode?: boolean;
};

const Contact = ({ isDarkMode = false }: ContactProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <GlassPanel
        tint="warm"
        isDarkMode={isDarkMode}
        className={`w-full max-w-md md:max-w-lg ${glassPanelPadding}`}
      >
        <h2 className={theme.displayTitle}>Let&apos;s Build</h2>
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.subtitle} tracking-tight -mt-1`}
        >
          Together
        </p>

        <div className={`${theme.calloutBox} mb-4 md:mb-6 mt-4 md:mt-6`}>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
            Actively seeking a{" "}
            <span className={theme.calloutHighlight}>
              Software Development Internship (OJT)
            </span>{" "}
            starting June 2026.
          </p>
        </div>

        <p
          className={`text-xs sm:text-sm md:text-base ${theme.bodyText} mb-4 md:mb-6 leading-relaxed`}
        >
          I&apos;d love to contribute my full-stack skills, backend focus, and
          cloud engineering mindset to a team building impactful software.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pointer-events-auto">
          <a href="mailto:fernandez.sean.marino@gmail.com" className={theme.ctaButton}>
            <Mail className="w-4 h-4 shrink-0" />
            Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={theme.ctaButton}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={theme.ctaButton}
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>

        <div className="flex flex-col items-start gap-1 mt-4 md:mt-5 pointer-events-auto">
          <a
            href="tel:+639366819789"
            className={`${theme.microLabel} inline-flex items-center gap-2 hover:text-white/70 transition-colors`}
          >
            <Phone className="w-3 h-3 shrink-0" />
            +63 936 681 9789
          </a>
          <span className={theme.microLabel}>Quezon City, Metro Manila</span>
        </div>
      </GlassPanel>
    </div>
  );
};

export default memo(Contact);
