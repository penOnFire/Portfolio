import { memo } from "react";
import { Cloud, Layout, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GlassPanel, {
  getGlassTheme,
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

const panelPaddingClasses = "p-3 sm:p-5 md:p-6 lg:p-8";
const pillMobileClasses = "max-md:text-[9px] max-md:px-2 max-md:py-1 max-md:gap-1";

const Skills = ({ isDarkMode = false }: SkillsProps) => {
  const theme = getGlassTheme(isDarkMode);

  return (
    <div
      className={`flex flex-col items-start justify-center h-full w-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <SectionHeader
        isDarkMode={isDarkMode}
        dayTitle="Skills in the daylight"
        nightTitle="Tools after dark"
        className="mb-2 md:mb-6 [&_h2]:!text-2xl [&_h2]:sm:!text-3xl [&_h2]:md:!text-5xl"
      />

      <GlassPanel
        tint="sky"
        isDarkMode={isDarkMode}
        className={`w-full ${panelPaddingClasses}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 text-left">
          {SKILL_GROUPS.map((group) => {
            const Icon = ICONS[group.icon];
            return (
              <div key={group.label} className={`${theme.subPanel} p-2.5 md:p-5`}>
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                  <Icon
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 shrink-0 ${theme.iconAccent}`}
                  />
                  <h3 className={`${theme.microLabel} max-md:text-[9px] max-md:leading-tight`}>
                    {group.label}
                  </h3>
                </div>
                <SectionModeStack
                  isDarkMode={isDarkMode}
                  gridClassName="grid w-full"
                  className="mb-2 md:mb-3 hidden md:block"
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
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${theme.monoPill} ${pillMobileClasses} inline-flex items-center gap-1.5`}
                    >
                      <SkillIcon
                        skill={skill}
                        className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 opacity-85"
                      />
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
