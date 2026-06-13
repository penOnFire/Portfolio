import {
  TESTIMONIALS,
  TESTIMONIALS_COMING_SOON,
} from "../../../content/portfolio";
import { useTheme } from "../../../context/ThemeContext";
import { getMinimalTheme } from "../../../utils/minimalTokens";
import BentoCard from "../BentoCard";

export default function TestimonialsTile() {
  const { isDark } = useTheme();
  const theme = getMinimalTheme(isDark);

  return (
    <BentoCard title="Recommendations" className="md:col-span-2">
      {TESTIMONIALS.length > 0 && !TESTIMONIALS_COMING_SOON ? (
        <ul className="space-y-4">
          {TESTIMONIALS.map((item) => (
            <li key={item.author}>
              <blockquote className={`text-sm ${theme.body}`}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className={`mt-2 text-sm font-semibold`}>{item.author}</p>
              <p className={`text-xs ${theme.muted}`}>{item.role}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm ${theme.muted}`}>
          Coming soon — testimonials on the way.
        </p>
      )}
    </BentoCard>
  );
}
