import { memo } from "react";
import { Cloud, Layout, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  mobileScrollPanelClasses,
  sectionShellClasses,
} from "../ui/GlassPanel";

const SKILL_GROUPS: {
  label: string;
  icon: LucideIcon;
  skills: string[];
}[] = [
  {
    label: "Frontend & UI",
    icon: Layout,
    skills: ["React.js", "TypeScript", "JavaScript", "HTML", "CSS", "Electron"],
  },
  {
    label: "Backend & Database",
    icon: Server,
    skills: [
      "C#",
      "ASP.NET MVC",
      "Node.js",
      "Microsoft SQL Server",
      "MongoDB",
      "REST/JSON APIs",
    ],
  },
  {
    label: "Cloud & Architecture",
    icon: Cloud,
    skills: [
      "Google Cloud Platform",
      "Vertex AI",
      "System Design",
      "Async Data Pipelines",
      "Vercel",
    ],
  },
  {
    label: "Tools & Practices",
    icon: Wrench,
    skills: ["Git", "Postman", "Cypress", "CI/CD", "Arch Linux"],
  },
];

type SkillsProps = {
  isDarkMode?: boolean;
};

const Skills = ({ isDarkMode = false }: SkillsProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-start justify-center h-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <h2 className={theme.displayTitle}>Skills</h2>
      <GlassPanel
        tint="sky"
        isDarkMode={isDarkMode}
        className={`w-full mt-3 md:mt-6 ${glassPanelPadding} ${mobileScrollPanelClasses}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.label} className={`${theme.subPanel} p-4 md:p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-3 h-3 shrink-0 ${theme.iconAccent}`} />
                  <h3 className={theme.microLabel}>{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className={theme.monoPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
};

export default memo(Skills);
