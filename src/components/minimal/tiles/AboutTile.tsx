import { ABOUT } from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

export default function AboutTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard title="About">
      <p className={theme.body}>{ABOUT.bio}</p>
    </BentoCard>
  );
}
