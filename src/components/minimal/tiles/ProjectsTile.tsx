import { ExternalLink } from "lucide-react";
import { ALL_PROJECTS } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

export default function ProjectsTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard title="Recent Projects" className="md:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ALL_PROJECTS.map((project) => (
          <article
            key={project.title}
            className={`rounded-xl border p-4 ${
              isDark ? "border-neutral-800 bg-neutral-950/50" : "border-neutral-200 bg-neutral-50"
            } ${project.featured ? "md:col-span-1" : ""}`}
          >
            <h3 className="font-bold tracking-tight">{project.title}</h3>
            <p className={`mt-1 text-xs ${theme.muted}`}>{project.subtitle}</p>
            <p className={`mt-1 text-[11px] ${theme.muted}`}>{project.role}</p>
            <p className={`mt-3 text-sm ${theme.body}`}>{project.minimalDescription}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme.link} mt-3 inline-flex items-center gap-1 text-sm`}
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                Visit
              </a>
            )}
            <div className="mt-3 flex flex-wrap gap-1">
              {project.stack.slice(0, 4).map((tech) => (
                <span key={tech} className={theme.chip}>
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </BentoCard>
  );
}
