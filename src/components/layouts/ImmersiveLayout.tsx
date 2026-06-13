import { Suspense, lazy, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { DayNightProvider } from "../../context/DayNightContext";
import DayNightToggle from "../ui/DayNightToggle";
import ViewSwitcher from "../ui/ViewSwitcher";

const LazyLanding = lazy(() => import("../pages/Landing"));

function ImmersiveFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0066aa] text-white/70 font-mono text-xs uppercase tracking-widest">
      Loading world…
    </div>
  );
}

export function ImmersivePage() {
  return (
    <Suspense fallback={<ImmersiveFallback />}>
      <LazyLanding />
    </Suspense>
  );
}

export default function ImmersiveLayout() {
  useLayoutEffect(() => {
    document.documentElement.dataset.route = "immersive";
    document.body.dataset.route = "immersive";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.route;
      delete document.body.dataset.route;
    };
  }, []);

  return (
    <DayNightProvider>
      <DayNightToggle />
      <ViewSwitcher variant="immersive" />
      <Outlet />
    </DayNightProvider>
  );
}
