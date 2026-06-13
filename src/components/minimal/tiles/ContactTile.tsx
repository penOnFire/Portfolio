import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

export default function ContactTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard title="Get in touch" className="md:col-span-2">
      <p className={`${theme.callout} ${theme.body} mb-5 text-sm`}>
        {CONTACT.dayCallout}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
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
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className={theme.button}
        >
          GitHub
        </a>
      </div>
      <div className={`space-y-1 text-sm ${theme.body}`}>
        <a href={CONTACT.phoneHref} className={`inline-flex items-center gap-2 ${theme.link}`}>
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {CONTACT.phone}
        </a>
        <p>{CONTACT.location}</p>
      </div>
      <Link
        to="/immersive"
        className={`${theme.link} mt-6 inline-block text-sm font-medium`}
      >
        Explore the 3D portfolio →
      </Link>
    </BentoCard>
  );
}
