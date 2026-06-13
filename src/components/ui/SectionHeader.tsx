import type { ReactNode } from "react";
import { getLandscapeTheme } from "../../utils/uiLandscapeTokens";
import SectionModeStack from "./SectionModeStack";

type SectionHeaderProps = {
  isDarkMode: boolean;
  dayEyebrow?: string;
  nightEyebrow?: string;
  dayTitle: ReactNode;
  nightTitle: ReactNode;
  daySubtitle?: ReactNode;
  nightSubtitle?: ReactNode;
  showAccentBar?: boolean;
  hideSubtitleOnMobile?: boolean;
  hideSubtitleFromMd?: boolean;
  className?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  isDarkMode,
  dayEyebrow,
  nightEyebrow,
  dayTitle,
  nightTitle,
  daySubtitle,
  nightSubtitle,
  showAccentBar = false,
  hideSubtitleOnMobile = false,
  hideSubtitleFromMd = false,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  const theme = getLandscapeTheme(isDarkMode);
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  const eyebrow =
    dayEyebrow || nightEyebrow ? (
      <SectionModeStack
        isDarkMode={isDarkMode}
        gridClassName="grid"
        dayLayer={
          dayEyebrow ? (
            <p className={`${theme.microLabel} mb-3 md:mb-4`}>{dayEyebrow}</p>
          ) : null
        }
        nightLayer={
          nightEyebrow ? (
            <p className={`${theme.microLabel} mb-3 md:mb-4`}>{nightEyebrow}</p>
          ) : null
        }
      />
    ) : null;

  return (
    <header className={`relative flex flex-col ${alignClass} ${className}`}>
      {showAccentBar && <span className={theme.accentBar} aria-hidden="true" />}
      {eyebrow}
      <SectionModeStack
        isDarkMode={isDarkMode}
        gridClassName="grid w-full"
        dayLayer={<h2 className={theme.displayTitle}>{dayTitle}</h2>}
        nightLayer={<h2 className={theme.displayTitle}>{nightTitle}</h2>}
      />
      {(daySubtitle || nightSubtitle) && (
        <SectionModeStack
          isDarkMode={isDarkMode}
          gridClassName="grid w-full"
          className={`mt-1 ${hideSubtitleOnMobile ? "hidden md:block" : ""} ${hideSubtitleFromMd ? "md:hidden" : ""}`}
          dayLayer={
            daySubtitle ? (
              <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.subtitle} tracking-tight`}>
                {daySubtitle}
              </p>
            ) : null
          }
          nightLayer={
            nightSubtitle ? (
              <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.subtitle} tracking-tight`}>
                {nightSubtitle}
              </p>
            ) : null
          }
        />
      )}
    </header>
  );
}
