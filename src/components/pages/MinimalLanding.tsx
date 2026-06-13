import { useTheme } from "../../context/ThemeContext";
import { getMinimalTheme } from "../../utils/minimalTokens";
import AboutTile from "../minimal/tiles/AboutTile";
import ContactTile from "../minimal/tiles/ContactTile";
import HeroTile from "../minimal/tiles/HeroTile";
import ProjectsTile from "../minimal/tiles/ProjectsTile";
import SkillsTile from "../minimal/tiles/SkillsTile";
import TestimonialsTile from "../minimal/tiles/TestimonialsTile";
import TimelineTile from "../minimal/tiles/TimelineTile";

export default function MinimalLanding() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <main className={`${theme.page} px-4 py-16 sm:px-6 lg:px-8`}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <HeroTile />
        <AboutTile />
        <TimelineTile />
        <SkillsTile />
        <ProjectsTile />
        <TestimonialsTile />
        <ContactTile />
      </div>
      <footer className={`mx-auto mt-10 max-w-5xl text-center text-xs ${theme.muted}`}>
        © {new Date().getFullYear()} Sean Fernandez
      </footer>
    </main>
  );
}
