import { memo } from "react";
import { ExternalLink } from "lucide-react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  mobileScrollPanelClasses,
  sectionShellClasses,
  type GlassTint,
} from "../ui/GlassPanel";

type BadgeVariant = "sky" | "amber" | "neutral";

type Project = {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  link?: string;
  stack: string[];
  badgeVariant: BadgeVariant;
  tint: GlassTint;
  featured?: boolean;
};

const CLARITY: Project = {
  title: "Clarity",
  subtitle: "Personal Cloud Project",
  role: "Full Stack Developer · Mar 2026 – Present",
  description:
    "AI-powered journaling app deployed on Vercel with GCP Vertex AI integration for secure, intelligent user experiences. Authored Cypress E2E and unit tests to keep user journeys robust and bug-free.",
  link: "https://clarity-journal-psi.vercel.app",
  stack: ["React", "TypeScript", "CSS", "GCP Vertex AI", "Vercel", "Cypress"],
  badgeVariant: "sky",
  tint: "sky",
  featured: true,
};

const SECONDARY_PROJECTS: Project[] = [
  {
    title: "Guard-Side + QR TextSundo",
    subtitle: "Monitoring & QR Notification System",
    role: "Project Manager & System Analyst · Aug 2025 – Dec 2025",
    description:
      "Led stakeholder requirements gathering and SDLC delivery for a real-time guard-side monitoring system with QR TextSundo notification endpoints. Mapped business processes to system capabilities and maintained technical documentation.",
    stack: [
      "REST APIs",
      "System Analysis",
      "Real-time Notifications",
      "Technical Documentation",
    ],
    badgeVariant: "amber",
    tint: "warm",
  },
  {
    title: "Pharmacy Management System",
    subtitle: "Legacy Migration",
    role: "Full Stack Developer · Jan 2026 – May 2026",
    description:
      "Migrated a legacy pharmacy system to a modern Electron desktop app with Node.js and MongoDB. Built async JSON data pipelines for secure transactional updates and participated in UAT and peer code reviews.",
    stack: ["Electron", "Node.js", "MongoDB", "JSON Pipelines"],
    badgeVariant: "neutral",
    tint: "neutral",
  },
];

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

  return (
    <GlassPanel
      as="article"
      hover
      tint={project.tint}
      isDarkMode={isDarkMode}
      className={`${glassPanelPadding} text-left h-full`}
    >
      <h3
        className={`font-black tracking-tighter leading-tight ${
          project.featured
            ? "text-lg sm:text-xl md:text-2xl"
            : "text-base sm:text-lg md:text-xl"
        }`}
      >
        {project.title}
      </h3>
      <p className={`${theme.microLabel} mt-2`}>{project.subtitle}</p>
      <p className={`${theme.microLabel} mt-1 ${theme.roleText}`}>{project.role}</p>
      <p
        className={`text-xs sm:text-sm md:text-base ${theme.bodyText} mt-3 md:mt-4 leading-relaxed`}
      >
        {project.description}
      </p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme.ctaButton} mt-3 md:mt-4 text-sm font-mono`}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {project.link.replace("https://", "")}
        </a>
      )}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 md:mt-4">
        {project.stack.map((tech) => (
          <span key={tech} className={badgeVariants[project.badgeVariant]}>
            {tech}
          </span>
        ))}
      </div>
    </GlassPanel>
  );
}

type ProjectsProps = {
  isDarkMode?: boolean;
};

const Projects = ({ isDarkMode = false }: ProjectsProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-start justify-center h-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <h2 className={theme.displayTitle}>Projects</h2>
      <div
        className={`flex flex-col gap-3 md:gap-4 w-full mt-3 md:mt-6 ${mobileScrollPanelClasses}`}
      >
        <ProjectCard project={CLARITY} isDarkMode={isDarkMode} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {SECONDARY_PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Projects);
