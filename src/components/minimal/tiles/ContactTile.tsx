import { Link } from "react-router-dom";
import { CONTACT } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import ContactForm from "../../ui/ContactForm";
import BentoCard from "../BentoCard";

export default function ContactTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard id="contact" title="Get in touch" className="md:col-span-2 scroll-mt-24">
      <p className={`${theme.callout} ${theme.body} mb-5 text-sm`}>
        {CONTACT.dayCallout}
      </p>

      <ContactForm variant="minimal" />

      <div className="flex flex-wrap gap-2 mt-5">
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

      <p className={`mt-4 text-sm ${theme.body}`}>{CONTACT.location}</p>

      <Link
        to="/immersive"
        className={`${theme.link} mt-6 inline-block text-sm font-medium`}
      >
        Explore the 3D portfolio →
      </Link>
    </BentoCard>
  );
}
