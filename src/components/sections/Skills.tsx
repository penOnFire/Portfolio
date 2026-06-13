import { memo } from "react";
import { Cloud, Layout, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  mobileScrollPanelClasses,
  sectionShellClasses,
} from "../ui/GlassPanel";
import SectionHeader from "../ui/SectionHeader";
import SectionModeStack from "../ui/SectionModeStack";
import { SKILL_GROUPS, type SkillGroupIcon } from "../../content/portfolio";
import { SkillIcon } from "./skillIcons";

const ICONS: Record<SkillGroupIcon, LucideIcon> = {
  layout: Layout,
  server: Server,
  cloud: Cloud,
  wrench: Wrench,
};

type SkillsProps = {
  isDarkMode?: boolean;
};

const Skills = ({ isDarkMode = false }: SkillsProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-start justify-center h-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <SectionHeader
        isDarkMode={isDarkMode}
        dayTitle="Skills in the daylight"
        nightTitle="Tools after dark"
        className="mb-3 md:mb-6"
      />

      <GlassPanel
        tint="sky"
        isDarkMode={isDarkMode}
        className={`w-full ${glassPanelPadding} ${mobileScrollPanelClasses}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
          {SKILL_GROUPS.map((group) => {
            const Icon = ICONS[group.icon];
            return (
              <div key={group.label} className={`${theme.subPanel} p-4 md:p-5`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-3 h-3 shrink-0 ${theme.iconAccent}`} />
                  <h3 className={theme.microLabel}>{group.label}</h3>
                </div>
                <SectionModeStack
                  isDarkMode={isDarkMode}
                  gridClassName="grid w-full"
                  className="mb-3"
                  dayLayer={
                    <p className={`text-[10px] ${theme.roleText} font-mono tracking-wide`}>
                      {group.daySubtitle}
                    </p>
                  }
                  nightLayer={
                    <p className={`text-[10px] ${theme.roleText} font-mono tracking-wide`}>
                      {group.nightSubtitle}
                    </p>
                  }
                />
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${theme.monoPill} inline-flex items-center gap-1.5`}
                    >
                      <SkillIcon skill={skill} />
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
