import { TIMELINE } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

export default function TimelineTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard title="Trail">
      <ol className="space-y-4">
        {TIMELINE.map((step, i) => (
          <li key={step.label} className="relative pl-5">
            <span
              className={`absolute left-0 top-1.5 h-2 w-2 rounded-full ${theme.dot}`}
              aria-hidden="true"
            />
            {i < TIMELINE.length - 1 && (
              <span
                className={`absolute left-[3px] top-4 h-[calc(100%+0.75rem)] w-px ${theme.line}`}
                aria-hidden="true"
              />
            )}
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {step.label}
            </p>
            <p className={`mt-1 text-sm ${theme.body}`}>{step.detail}</p>
          </li>
        ))}
      </ol>
    </BentoCard>
  );
}
