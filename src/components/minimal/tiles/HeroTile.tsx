import { PROFILE, CONTACT } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";
import ProfilePhoto from "../ProfilePhoto";

export default function HeroTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard className="md:col-span-2">
      <div className="flex flex-row items-start gap-3 sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className={`${theme.cardTitle} mb-1.5 sm:mb-2 max-sm:text-[10px]`}>Portfolio</p>
          <h1 className="mb-1.5 sm:mb-2 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            {PROFILE.name}
          </h1>
          <p className={`${theme.body} mb-0.5 sm:mb-1 text-xs sm:text-base`}>
            {PROFILE.location}
          </p>
          <p className="mb-2 sm:mb-4 text-sm font-semibold tracking-tight sm:text-lg">
            {PROFILE.tagline}
          </p>
          <p
            className={`${theme.callout} ${theme.body} mb-3 sm:mb-6 text-[11px] leading-snug sm:text-sm`}
          >
            {PROFILE.ojtStatus}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <a
              href="#contact"
              className={`${theme.buttonPrimary} max-sm:px-3 max-sm:py-2 max-sm:text-xs`}
            >
              Send a message
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.button} max-sm:px-3 max-sm:py-2 max-sm:text-xs`}
            >
              LinkedIn
            </a>
          </div>
        </div>
        <ProfilePhoto className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-lg ring-1 ring-neutral-200 sm:h-36 sm:w-36 sm:rounded-xl md:h-44 md:w-44 dark:ring-neutral-700" />
      </div>
    </BentoCard>
  );
}
