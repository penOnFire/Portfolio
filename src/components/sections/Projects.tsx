import { memo } from "react";
import { ExternalLink } from "lucide-react";
import GlassPanel, {
  getGlassTheme,
  immersiveViewportClasses,
  sectionShellClasses,
} from "../ui/GlassPanel";
import SectionHeader from "../ui/SectionHeader";
import SectionModeStack from "../ui/SectionModeStack";
import {
  CLARITY,
  SECONDARY_PROJECTS,
  type Project,
} from "../../content/portfolio";

const cardPaddingClasses = "p-2.5 md:p-4 lg:p-5";
const bodyTextMobile = "text-[11px] leading-snug";
const bodyTextDesktop = "text-xs sm:text-sm md:text-sm md:leading-snug";

function ProjectDescriptions({
  project,
  isDarkMode,
  variant,
  featured = false,
}: {
  project: Project;
  isDarkMode: boolean;
  variant: "mobile" | "desktop";
  featured?: boolean;
}) {
  const theme = getGlassTheme(isDarkMode);
  const isMobile = variant === "mobile";
  const dayText = isMobile ? project.mobileDayDescription : project.dayDescription;
  const nightText = isMobile ? project.mobileNightDescription : project.nightDescription;
  const textClass = isMobile ? bodyTextMobile : bodyTextDesktop;
  const clampClass = featured ? "md:line-clamp-3" : "md:line-clamp-2";

  return (
    <SectionModeStack
      isDarkMode={isDarkMode}
      gridClassName="grid grid-rows-1 w-full"
      className={isMobile ? "mt-1.5 md:hidden" : `mt-2 md:mt-3 hidden md:block ${clampClass}`}
      dayLayer={
        <p className={`${textClass} ${theme.bodyText}`} title={dayText}>
          {dayText}
        </p>
      }
      nightLayer={
        <p className={`${textClass} ${theme.bodyText}`} title={nightText}>
          {nightText}
        </p>
      }
    />
  );
}

function ProjectCard({
  project,
  isDarkMode,
}: {
  project: Project;
  isDarkMode: boolean;
}) {
  const theme = getGlassTheme(isDarkMode);
  const badgeVariants = {
    sky: theme.badgeSky,
    amber: theme.badgeAmber,
    neutral: theme.badgeNeutral,
  };
  const badgeMobile = "max-md:text-[10px] max-md:px-2 max-md:py-0.5";
  const isFeatured = project.featured === true;

  return (
    <GlassPanel
      as="article"
      hover
      tint={project.tint}
      isDarkMode={isDarkMode}
      className={`${cardPaddingClasses} text-left h-auto md:h-full`}
    >
      <h3
        className={`font-black tracking-tighter leading-tight ${
          isFeatured
            ? "text-sm sm:text-xl md:text-2xl"
            : "text-sm sm:text-lg md:text-xl"
        }`}
      >
        {project.title}
      </h3>
      <p className={`${theme.microLabel} mt-0.5 md:mt-2 max-md:text-[9px] max-md:leading-tight`}>
        {project.subtitle}
      </p>
      <p
        className={`${theme.microLabel} mt-0.5 md:mt-1 ${theme.roleText} leading-snug max-md:text-[9px] max-md:leading-tight ${
          isFeatured ? "max-md:line-clamp-1" : ""
        }`}
      >
        {project.role}
      </p>
      <ProjectDescriptions
        project={project}
        isDarkMode={isDarkMode}
        variant="mobile"
        featured={project.featured}
      />
      <ProjectDescriptions
        project={project}
        isDarkMode={isDarkMode}
        variant="desktop"
        featured={project.featured}
      />
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme.ctaButton} mt-1.5 md:mt-3 text-xs md:text-sm font-mono max-w-full max-md:px-2.5 max-md:py-1.5 max-md:text-[10px] ${
            isFeatured ? "max-md:mt-1" : ""
          }`}
        >
          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
          <span className="truncate">{project.link.replace("https://", "")}</span>
        </a>
      )}
      <div className={`flex flex-wrap gap-1 sm:gap-2 ${isFeatured ? "mt-1.5 md:mt-3" : "mt-2 md:mt-3"}`}>
        {project.stack.map((tech, index) => (
          <span
            key={tech}
            className={`${badgeVariants[project.badgeVariant]} ${badgeMobile} ${
              isFeatured && index >= 4 ? "hidden md:inline-flex" : ""
            }`}
          >
            {tech}
          </span>
        ))}
        {isFeatured && project.stack.length > 4 && (
          <span
            className={`${badgeVariants[project.badgeVariant]} ${badgeMobile} md:hidden`}
          >
            +{project.stack.length - 4}
          </span>
        )}
      </div>
    </GlassPanel>
  );
}

type ProjectsProps = {
  isDarkMode?: boolean;
};

const Projects = ({ isDarkMode = false }: ProjectsProps) => {
  return (
    <div
      className={`flex flex-col items-start justify-center md:justify-start md:items-stretch text-white text-left font-sans ${sectionShellClasses} ${immersiveViewportClasses}`}
    >
      <SectionHeader
        isDarkMode={isDarkMode}
        dayTitle="Projects"
        nightTitle="Projects"
        daySubtitle="Built across the landscape"
        nightSubtitle="Peaks in the portfolio"
        hideSubtitleOnMobile
        className="mb-2 md:mb-3 shrink-0 [&_h2]:!text-2xl [&_h2]:sm:!text-3xl [&_h2]:md:!text-5xl"
      />

      <div className="flex flex-col gap-2 md:gap-3 w-full min-h-0 max-md:flex-none md:flex-1">
        <ProjectCard project={CLARITY} isDarkMode={isDarkMode} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-start">
          {SECONDARY_PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Projects);
