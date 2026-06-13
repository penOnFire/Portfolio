import type { IconType } from "react-icons";
import {
  SiArchlinux,
  SiCss,
  SiCypress,
  SiDotnet,
  SiElectron,
  SiGit,
  SiGithubactions,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiSharp,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbApi, TbChartDots3, TbRoute } from "react-icons/tb";

/** Maps skill label → brand/tool icon */
export const SKILL_ICONS: Record<string, IconType> = {
  "React.js": SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  Electron: SiElectron,
  "C#": SiSharp,
  "ASP.NET MVC": SiDotnet,
  "Node.js": SiNodedotjs,
  "Microsoft SQL Server": SiDotnet,
  MongoDB: SiMongodb,
  "REST/JSON APIs": TbApi,
  "Google Cloud Platform": SiGooglecloud,
  "Vertex AI": SiGooglecloud,
  "System Design": TbChartDots3,
  "Async Data Pipelines": TbRoute,
  Vercel: SiVercel,
  Git: SiGit,
  Postman: SiPostman,
  Cypress: SiCypress,
  "CI/CD": SiGithubactions,
  "Arch Linux": SiArchlinux,
};

export function SkillIcon({
  skill,
  className = "w-3.5 h-3.5 shrink-0 opacity-85",
}: {
  skill: string;
  className?: string;
}) {
  const Icon = SKILL_ICONS[skill];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
