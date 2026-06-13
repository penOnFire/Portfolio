import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import ThemeToggle from "../ui/ThemeToggle";
import ViewSwitcher from "../ui/ViewSwitcher";

export default function MinimalLayout() {
  useLayoutEffect(() => {
    document.documentElement.dataset.route = "minimal";
    document.body.dataset.route = "minimal";
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.route;
      delete document.body.dataset.route;
    };
  }, []);

  return (
    <ThemeProvider>
      <ThemeToggle />
      <ViewSwitcher variant="minimal" />
      <Outlet />
    </ThemeProvider>
  );
}
