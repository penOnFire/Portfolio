import { PROFILE } from "../../content/portfolio";
import { useTheme } from "../../context/ThemeContext";
import profileDark from "../../imgs/bw.jpg";
import profileLight from "../../imgs/clrd.png";

const photoImageClasses =
  "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out motion-reduce:transition-none";

type ProfilePhotoProps = {
  className?: string;
};

export default function ProfilePhoto({
  className = "relative h-28 w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-neutral-200 sm:h-32 sm:w-32 md:h-40 md:w-40 dark:ring-neutral-700",
}: ProfilePhotoProps) {
  const { isDark } = useTheme();

  return (
    <div className={className}>
      <img
        src={profileLight}
        alt={`Portrait of ${PROFILE.name}`}
        aria-hidden={isDark}
        decoding="async"
        fetchPriority="high"
        className={`${photoImageClasses} ${isDark ? "opacity-0" : "opacity-100"}`}
      />
      <img
        src={profileDark}
        alt={`Portrait of ${PROFILE.name}`}
        aria-hidden={!isDark}
        decoding="async"
        className={`${photoImageClasses} ${isDark ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
