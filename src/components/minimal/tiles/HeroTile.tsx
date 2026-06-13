import { Mail } from "lucide-react";
import { PROFILE, CONTACT } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

export default function HeroTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard className="md:col-span-2">
      <p className={`${theme.cardTitle} mb-2`}>Portfolio</p>
      <h1 className={`${theme.heading} mb-2`}>{PROFILE.name}</h1>
      <p className={`${theme.body} mb-1`}>{PROFILE.location}</p>
      <p className={`${theme.subheading} mb-4`}>{PROFILE.tagline}</p>
      <p className={`${theme.callout} ${theme.body} mb-6 text-sm`}>
        {PROFILE.ojtStatus}
      </p>
      <div className="flex flex-wrap gap-2">
        <a href={`mailto:${CONTACT.email}`} className={theme.buttonPrimary}>
          <Mail className="w-4 h-4 shrink-0" />
          Email
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
    </BentoCard>
  );
}
