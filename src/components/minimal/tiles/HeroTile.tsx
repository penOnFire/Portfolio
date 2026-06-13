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
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className={`${theme.cardTitle} mb-2`}>Portfolio</p>
          <h1 className={`${theme.heading} mb-2`}>{PROFILE.name}</h1>
          <p className={`${theme.body} mb-1`}>{PROFILE.location}</p>
          <p className={`${theme.subheading} mb-4`}>{PROFILE.tagline}</p>
          <p className={`${theme.callout} ${theme.body} mb-6 text-sm`}>
            {PROFILE.ojtStatus}
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="#contact" className={theme.buttonPrimary}>
              Send a message
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={theme.button}
            >
              LinkedIn
            </a>
          </div>
        </div>
        <ProfilePhoto className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-xl ring-1 ring-neutral-200 sm:mx-0 sm:h-36 sm:w-36 md:h-44 md:w-44 dark:ring-neutral-700" />
      </div>
    </BentoCard>
  );
}
