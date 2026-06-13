import { memo } from "react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  sectionShellClasses,
} from "../ui/GlassPanel";

type AboutProps = {
  isDarkMode?: boolean;
};

const About = ({ isDarkMode = false }: AboutProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-start justify-center h-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <GlassPanel
        tint="warm"
        isDarkMode={isDarkMode}
        className={`max-w-2xl w-full ${glassPanelPadding}`}
      >
        <span className={theme.accentBar} />
        <p className={`${theme.microLabel} mb-4 md:mb-5`}>
          Software Developer · OJT June 2026
        </p>
        <h2 className={theme.displayTitle}>
          About
          <span className="block md:ml-8 text-white/90">Me</span>
        </h2>
        <p
          className={`text-sm sm:text-base md:text-lg ${theme.bodyText} leading-relaxed max-w-xl mt-6 md:mt-8`}
        >
          I&apos;m a 3rd-year BSIT student at Quezon City University (Class of
          2027) who loves building software that is clean, reliable, and
          purposeful. I&apos;m especially drawn to full-stack development —{" "}
          <span className={theme.highlight}>backend logic</span>,{" "}
          <span className={theme.highlight}>database design</span>, and{" "}
          <span className={theme.highlight}>secure REST APIs</span> — where
          structure and problem-solving meet real-world impact.
        </p>
        <p
          className={`text-sm sm:text-base md:text-lg ${theme.bodyText} leading-relaxed max-w-xl mt-4 md:mt-5`}
        >
          From React and TypeScript frontends to Node.js, MongoDB, and SQL Server
          backends, I write tested, maintainable code with Cypress E2E automation.
          I&apos;m actively growing toward{" "}
          <span className={theme.highlight}>cloud engineering</span> —
          deploying on GCP and Vercel, integrating Vertex AI, and designing
          systems built to scale.
        </p>
      </GlassPanel>
    </div>
  );
};

export default memo(About);
