import type { MouseEvent, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useViewTransition } from "../../context/ViewTransitionContext";

type ViewRoute = "/minimal" | "/immersive";

type ViewTransitionLinkProps = Omit<LinkProps, "to"> & {
  to: ViewRoute;
  children: ReactNode;
};

export default function ViewTransitionLink({
  to,
  onClick,
  onMouseEnter,
  onFocus,
  ...props
}: ViewTransitionLinkProps) {
  const { transitionTo, prefetchImmersive } = useViewTransition();

  const handlePrefetch = () => {
    if (to === "/immersive") {
      prefetchImmersive();
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    event.preventDefault();
    void transitionTo(to);
  };

  return (
    <Link
      {...props}
      to={to}
      onClick={handleClick}
      onMouseEnter={(event) => {
        handlePrefetch();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        handlePrefetch();
        onFocus?.(event);
      }}
    />
  );
}
