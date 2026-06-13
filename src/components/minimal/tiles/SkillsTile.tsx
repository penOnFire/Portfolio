import { Cloud, Layout, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SKILL_GROUPS, type SkillGroupIcon } from "../../../content/portfolio";
import { SkillIcon } from "../../sections/skillIcons";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

const ICONS: Record<SkillGroupIcon, LucideIcon> = {
  layout: Layout,
  server: Server,
  cloud: Cloud,
  wrench: Wrench,
};

export default function SkillsTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard title="Tech Stack" className="md:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SKILL_GROUPS.map((group) => {
          const Icon = ICONS[group.icon];
          return (
            <div key={group.label}>
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill} className={theme.chip}>
                    <SkillIcon skill={skill} className="h-3 w-3 opacity-80" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}
