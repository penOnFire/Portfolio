import { memo, type ReactNode } from "react";
import GlassPanel, {
  getGlassTheme,
  glassPanelPadding,
  sectionShellClasses,
} from "../ui/GlassPanel";
import SectionHeader from "../ui/SectionHeader";
import SectionModeStack from "../ui/SectionModeStack";
import { ABOUT, TIMELINE } from "../../content/portfolio";
import { getLandscapeTheme } from "../../utils/uiLandscapeTokens";

type AboutProps = {
  isDarkMode?: boolean;
};

function applyHighlights(
  text: string,
  phrases: readonly string[],
  className: string,
): ReactNode {
  if (phrases.length === 0) return text;

  let nodes: ReactNode[] = [text];

  for (const phrase of phrases) {
    const next: ReactNode[] = [];
    for (const node of nodes) {
      if (typeof node !== "string") {
        next.push(node);
        continue;
      }
      const idx = node.indexOf(phrase);
      if (idx === -1) {
        next.push(node);
        continue;
      }
      if (idx > 0) next.push(node.slice(0, idx));
      next.push(
        <span key={`${phrase}-${idx}`} className={className}>
          {phrase}
        </span>,
      );
      const rest = node.slice(idx + phrase.length);
      if (rest) next.push(rest);
    }
    nodes = next;
  }

  return nodes.length === 1 ? nodes[0] : nodes;
}

const About = ({ isDarkMode = false }: AboutProps) => {
  const theme = getGlassTheme(isDarkMode);

  const dayBody = (
    <>
      {ABOUT.dayParagraphs.map((paragraph, i) => (
        <p
          key={`day-${i}`}
          className={`text-sm sm:text-base md:text-lg ${theme.bodyText} leading-relaxed max-w-xl ${
            i === 0 ? "mt-6 md:mt-8" : "mt-4 md:mt-5"
          }`}
        >
          {applyHighlights(paragraph.text, paragraph.highlights, theme.highlight)}
        </p>
      ))}
    </>
  );

  const nightBody = (
    <>
      {ABOUT.nightParagraphs.map((paragraph, i) => (
        <p
          key={`night-${i}`}
          className={`text-sm sm:text-base md:text-lg ${theme.bodyText} leading-relaxed max-w-xl ${
            i === 0 ? "mt-6 md:mt-8" : "mt-4 md:mt-5"
          }`}
        >
          {applyHighlights(paragraph.text, paragraph.highlights, theme.highlight)}
        </p>
      ))}
    </>
  );

  return (
    <div
      className={`flex flex-col items-start justify-center h-full text-white text-left font-sans ${sectionShellClasses}`}
    >
      <div className="relative w-full max-w-3xl flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-10">
        <GlassPanel
          tint="warm"
          isDarkMode={isDarkMode}
          className={`flex-1 ${glassPanelPadding}`}
        >
          <SectionHeader
            isDarkMode={isDarkMode}
            showAccentBar
            dayEyebrow={ABOUT.dayEyebrow}
            nightEyebrow={ABOUT.nightEyebrow}
            dayTitle="About Me"
            nightTitle="About Me"
          />
          <SectionModeStack
            isDarkMode={isDarkMode}
            gridClassName="grid w-full"
            dayLayer={dayBody}
            nightLayer={nightBody}
          />
        </GlassPanel>

        <nav
          className="hidden lg:flex flex-col justify-center gap-6 pl-2 border-l border-white/10"
          aria-label="Career trail"
        >
          {TIMELINE.map((step, i) => (
            <div key={step.label} className="relative pl-5">
              <span
                className={`absolute left-0 top-1.5 w-2 h-2 rounded-full ${
                  isDarkMode ? "bg-[#6dd5ff]/70" : "bg-[#b89d24]/80"
                }`}
                aria-hidden="true"
              />
              {i < TIMELINE.length - 1 && (
                <span
                  className="absolute left-[3px] top-4 w-px h-[calc(100%+1rem)] bg-white/10"
                  aria-hidden="true"
                />
              )}
              <p className={getLandscapeTheme(isDarkMode).microLabel}>
                {step.label}
              </p>
              <p className={`text-xs ${theme.bodyText} mt-1`}>{step.detail}</p>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default memo(About);
