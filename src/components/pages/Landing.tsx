import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Tree from "../3d/Tree";
import CelestialSystem from "../3d/CelestialSystem";
import DayNightRig from "../3d/DayNightRig";
import Mountain from "../3d/Mountain";
import { SkyBackdrop } from "../3d/SkyBackDrop";
import GrassFloor from "../3d/GrassFloor";
import Cloud from "../3d/Cloud";
import Intro from "../sections/Intro";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Contact from "../sections/Contacts";
import { useDayNightUI } from "../../context/DayNightContext";
import { getLandscapeLayout } from "../../utils/landscapeLayoutCache";

export const SCROLL_PAGES = 6;
const NARRATIVE_PAGES = 5;
const RETURN_START = NARRATIVE_PAGES / SCROLL_PAGES;
const LOOP_HOLD_START = 11 / 12;

function getScrollProgress(rawOffset: number) {
  const offset = Math.max(0, rawOffset);

  const narrativeT = offset < RETURN_START ? offset / RETURN_START : 1;

  const returnT =
    offset < RETURN_START
      ? 0
      : offset < LOOP_HOLD_START
        ? (offset - RETURN_START) / (LOOP_HOLD_START - RETURN_START)
        : 1;

  return { offset, narrativeT, returnT };
}

type CameraStop = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
};

function appendIntroLoopStop(stops: CameraStop[]): CameraStop[] {
  const loopStops = stops.map((stop) => ({
    position: stop.position.clone(),
    lookAt: stop.lookAt.clone(),
  }));

  loopStops.push({
    position: stops[0].position.clone(),
    lookAt: stops[0].lookAt.clone(),
  });

  return loopStops;
}

function getBreakpoint() {
  const w = window.innerWidth;
  if (w <= 768) return "mobile";
  if (w <= 1024) return "tablet";
  return "desktop";
}

function buildCameraStops(breakpoint: ReturnType<typeof getBreakpoint>): CameraStop[] {
  if (breakpoint === "mobile") {
    return appendIntroLoopStop([
      {
        position: new THREE.Vector3(0, 2, 16),
        lookAt: new THREE.Vector3(0, 0, 0),
      },
      {
        position: new THREE.Vector3(-3, 2, 7),
        lookAt: new THREE.Vector3(-5, 2, 0),
      },
      {
        position: new THREE.Vector3(0, -1.5, 5),
        lookAt: new THREE.Vector3(0, 0, -4),
      },
      {
        position: new THREE.Vector3(2, -1.5, 5),
        lookAt: new THREE.Vector3(6, -1, 0),
      },
      {
        position: new THREE.Vector3(1.5, 3.5, 6),
        lookAt: new THREE.Vector3(2, 2.5, 1),
      },
    ]);
  }

  if (breakpoint === "tablet") {
    return appendIntroLoopStop([
      {
        position: new THREE.Vector3(0, 2.5, 1),
        lookAt: new THREE.Vector3(0, 0, 0),
      },
      {
        position: new THREE.Vector3(-3, 1.5, 6),
        lookAt: new THREE.Vector3(-5, 2, 0),
      },
      {
        position: new THREE.Vector3(0, -2, 4),
        lookAt: new THREE.Vector3(0, 0, -4),
      },
      {
        position: new THREE.Vector3(1.5, -1.7, 4),
        lookAt: new THREE.Vector3(6, -1, 0),
      },
      {
        position: new THREE.Vector3(1.2, 3.2, 5.5),
        lookAt: new THREE.Vector3(2, 2.5, 1),
      },
    ]);
  }

  return appendIntroLoopStop([
    {
      position: new THREE.Vector3(0, 2, 14),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      position: new THREE.Vector3(-3, 1, 5),
      lookAt: new THREE.Vector3(-5, 2, 0),
    },
    {
      position: new THREE.Vector3(0, -2.3, 3),
      lookAt: new THREE.Vector3(0, 0, -4),
    },
    {
      position: new THREE.Vector3(1, -1.8, 3),
      lookAt: new THREE.Vector3(6, -1, 0),
    },
    {
      position: new THREE.Vector3(1.5, 3, 6),
      lookAt: new THREE.Vector3(2, 2.5, 1),
    },
  ]);
}

const cameraStopsCache = new Map<
  ReturnType<typeof getBreakpoint>,
  CameraStop[]
>();

function getCameraStops(): CameraStop[] {
  const breakpoint = getBreakpoint();
  let stops = cameraStopsCache.get(breakpoint);
  if (!stops) {
    stops = buildCameraStops(breakpoint);
    cameraStopsCache.set(breakpoint, stops);
  }
  return stops;
}

const CLOUD_EMPHASIS = {
  mountainsX: -10,
  treesX: 10,
  cloudsZ: 12,
  cloudsY: 3,
  grassY: -1,
  skyY: 1.5,
};

function EntranceSequence({
  grassGroupRef,
  skyGroupRef,
  mountainGroupRef,
  treeGroupRef,
  cloudGroupRef,
  introContentRef,
  onIntroComplete,
}: {
  grassGroupRef: React.RefObject<THREE.Group>;
  skyGroupRef: React.RefObject<THREE.Group>;
  mountainGroupRef: React.RefObject<THREE.Group>;
  treeGroupRef: React.RefObject<THREE.Group>;
  cloudGroupRef: React.RefObject<THREE.Group>;
  introContentRef: React.RefObject<HTMLDivElement | null>;
  onIntroComplete?: () => void;
}) {
  useEffect(() => {
    let cancelled = false;

    const runIntro = () => {
      if (cancelled) return;

      const refs = [
        grassGroupRef,
        skyGroupRef,
        mountainGroupRef,
        treeGroupRef,
        cloudGroupRef,
      ];
      if (refs.some((r) => !r.current) || !introContentRef.current) {
        requestAnimationFrame(runIntro);
        return;
      }

      const [grass, sky, mountains, trees, clouds] = refs.map((r) => r.current!);
      const introContent = introContentRef.current;

      gsap.set(grass.position, { y: -25 });
      gsap.set(sky.position, { y: 35 });
      gsap.set(mountains.position, { x: -40 });
      gsap.set(trees.position, { x: 40 });
      gsap.set(clouds.position, { z: -50, y: 35 });

      const headline = introContent.querySelector("[data-intro-headline]");
      const accent = introContent.querySelector("[data-intro-accent]");
      const underline = introContent.querySelector("[data-intro-underline]");
      const subtext = introContent.querySelector("[data-intro-subtext]");

      if (headline && accent && subtext) {
        gsap.set(headline, { opacity: 0, y: 48, filter: "blur(10px)" });
        gsap.set(accent, { opacity: 0, y: 40, filter: "blur(8px)" });
        if (underline) gsap.set(underline, { scaleX: 0, opacity: 0 });
        gsap.set(subtext, { opacity: 0, y: 12, letterSpacing: "0.55em" });
      }

      const intro = gsap.timeline({
        defaults: { duration: 1.5, ease: "power4.out" },
        onComplete: () => {
          onIntroComplete?.();
        },
      });

      intro
        .to(grass.position, { y: 0 })
        .to(mountains.position, { x: 0 }, "-=1.2")
        .to(trees.position, { x: 0 }, "-=1.3")
        .to(clouds.position, { z: 0, y: 0 }, "-=1.0")
        .to(sky.position, { y: 0 }, "-=1.0");

      if (headline && accent && subtext) {
        intro
          .to(
            headline,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.9,
              ease: "power3.out",
            },
            "-=1.0",
          )
          .to(
            accent,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "power3.out",
            },
            "-=1.5",
          );

        if (underline) {
          intro.to(
            underline,
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.0,
              ease: "power2.inOut",
            },
            "-=1.1",
          );
        }

        intro.to(
            subtext,
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0.35em",
              duration: 1.4,
              ease: "power2.out",
            },
            "-=0.8",
          );
      }
    };

    runIntro();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

function ResponsiveCamera() {
  const { camera, viewport } = useThree();

  useFrame(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const aspect = viewport.width / viewport.height;
    const targetFov = aspect < 0.7 ? 65 : aspect < 1 ? 58 : 40;
    if (Math.abs(camera.fov - targetFov) > 0.5) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function ScrollRig({
  grassGroupRef,
  skyGroupRef,
  mountainGroupRef,
  treeGroupRef,
  cloudGroupRef,
}: {
  grassGroupRef: React.RefObject<THREE.Group>;
  skyGroupRef: React.RefObject<THREE.Group>;
  mountainGroupRef: React.RefObject<THREE.Group>;
  treeGroupRef: React.RefObject<THREE.Group>;
  cloudGroupRef: React.RefObject<THREE.Group>;
}) {
  const scroll = useScroll();
  const { camera, viewport } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);
  const cameraStops = useMemo(() => getCameraStops(), [breakpoint]);
  const aspectKey =
    Math.round((viewport.width / viewport.height) * 100) / 100;
  const treeGroupBaseY = useMemo(
    () => getLandscapeLayout(aspectKey).treeGroupBaseY,
    [aspectKey],
  );

  useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  useFrame(() => {
    const { offset, narrativeT, returnT } = getScrollProgress(scroll.offset);
    const maxIndex = cameraStops.length - 1;
    const scaled = offset * maxIndex;
    const index = Math.min(Math.floor(scaled), maxIndex - 1);
    const t = scaled - index;

    const from = cameraStops[index];
    const to = cameraStops[index + 1];

    camera.position.lerpVectors(from.position, to.position, t);
    lookTarget.current.lerpVectors(from.lookAt, to.lookAt, t);
    camera.lookAt(lookTarget.current);

    const mountains = mountainGroupRef.current;
    const trees = treeGroupRef.current;
    const clouds = cloudGroupRef.current;
    const grass = grassGroupRef.current;
    const sky = skyGroupRef.current;

    const groundY = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(0, CLOUD_EMPHASIS.grassY, narrativeT),
      0,
      returnT,
    );

    if (mountains) {
      mountains.position.x = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(0, CLOUD_EMPHASIS.mountainsX, narrativeT),
        0,
        returnT,
      );
      mountains.position.y = -1 + groundY;
    }

    if (trees) {
      trees.position.x = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(0, CLOUD_EMPHASIS.treesX, narrativeT),
        0,
        returnT,
      );
      trees.position.y = treeGroupBaseY + groundY;
    }

    if (clouds) {
      clouds.position.z = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(0, CLOUD_EMPHASIS.cloudsZ, narrativeT),
        0,
        returnT,
      );
      clouds.position.y = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(0, CLOUD_EMPHASIS.cloudsY, narrativeT),
        0,
        returnT,
      );
    }

    if (grass) {
      grass.position.y = groundY;
    }

    if (sky) {
      sky.position.y = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(0, CLOUD_EMPHASIS.skyY, narrativeT),
        0,
        returnT,
      );
    }
  });

  return null;
}

function LoopTeleport() {
  const scroll = useScroll();
  const cooldown = useRef(0);

  useFrame((_, delta) => {
    if (cooldown.current > 0) {
      cooldown.current -= delta;
      return;
    }

    const { returnT } = getScrollProgress(scroll.offset);
    const el = scroll.el;
    const scrollThreshold = el.scrollHeight - el.clientHeight;
    const scrollProgress =
      scrollThreshold > 0 ? el.scrollTop / scrollThreshold : 0;
    const atEnd = scrollProgress >= 0.995;

    if (returnT === 1 && atEnd) {
      el.scrollTop = 1;
      const scrollRef = scroll as typeof scroll & {
        scroll: React.MutableRefObject<number>;
      };
      scrollRef.scroll.current = 0;
      scroll.offset = 0;
      cooldown.current = 0.2;
    }
  });

  return null;
}

const SceneContent = memo(function SceneContent({
  grassGroupRef,
  skyGroupRef,
  mountainGroupRef,
  treeGroupRef,
  cloudGroupRef,
}: {
  grassGroupRef: React.RefObject<THREE.Group>;
  skyGroupRef: React.RefObject<THREE.Group>;
  mountainGroupRef: React.RefObject<THREE.Group>;
  treeGroupRef: React.RefObject<THREE.Group>;
  cloudGroupRef: React.RefObject<THREE.Group>;
}) {
  const { viewport } = useThree();
  const aspectKey =
    Math.round((viewport.width / viewport.height) * 100) / 100;
  const layout = useMemo(
    () => getLandscapeLayout(aspectKey),
    [aspectKey],
  );
  const { worldScale, grassRadius, grassScale, treeGroupBaseY } = layout;

  return (
    <group scale={worldScale}>
      <DayNightRig />

      <group ref={skyGroupRef}>
        <SkyBackdrop />
        <CelestialSystem sunScale={0.84} moonScale={0.78} />
      </group>

      <group ref={cloudGroupRef}>
        <Cloud position={[3, 2, 1]} scale={0.3} seed={100} />
        <Cloud position={[-1, 2, 1]} scale={0.1} seed={500} />
        <Cloud position={[1, 3, 1]} scale={0.2} seed={670} />
        <Cloud position={[-5.5, 3, 1]} scale={0.4} seed={634} />
        <Cloud position={[-5.5, 0.5, 1]} scale={0.2} seed={555} />
        <Cloud position={[5.9, 0.6, 1]} scale={0.5} seed={999} />
      </group>

      <group ref={grassGroupRef}>
        <GrassFloor position={[0, -2.7, 0]} radius={grassRadius} scale={grassScale} />
      </group>

      <group ref={mountainGroupRef} position={[0, -1, 0]}>
        <Mountain position={[-5.4, -0.6, -3]} scale={0.6} color="#4d908e" />
        <Mountain position={[-2.8, 0, -3]} scale={0.8} color="#4d908e" />
        <Mountain position={[0, 1, -5]} scale={1.2} color="#b89d24" />
        <Mountain position={[-4.9, -0.5, -5]} scale={0.8} color="#b89d24" />
        <Mountain position={[3, 0, -3.15]} scale={1} color="#4d908e" />
        <Mountain position={[6, -0.6, -5]} scale={0.7} color="#b89d24" />
      </group>

      <group ref={treeGroupRef} position={[0, treeGroupBaseY, 0]}>
        <Tree position={[-3, -1, 0]} scale={0.7} />
        <Tree position={[-0.6, -1.1, -0.5]} scale={0.5} />
        <Tree position={[-3.7, -1.1, -1.2]} scale={0.5} />
        <Tree position={[-5, -1.15, 1]} scale={0.4} />
        <Tree position={[1, -1.2, -1.5]} scale={0.4} />
        <Tree position={[3, -0.8, 0]} scale={1} />
      </group>
    </group>
  );
});

const ScrollSections = memo(function ScrollSections({
  introContentRef,
  isDarkMode,
}: {
  introContentRef: React.RefObject<HTMLDivElement | null>;
  isDarkMode: boolean;
}) {
  return (
    <Scroll html style={{ width: "100%" }}>
      <div className="w-full">
        <section className="h-screen w-full flex items-center justify-center pointer-events-none px-3 sm:px-4">
          <Intro contentRef={introContentRef} isDarkMode={isDarkMode} />
        </section>
        <section className="h-screen w-full flex items-center justify-center pointer-events-none px-3 sm:px-4">
          <About isDarkMode={isDarkMode} />
        </section>
        <section className="h-screen w-full flex items-center justify-center pointer-events-none px-3 sm:px-4">
          <Skills isDarkMode={isDarkMode} />
        </section>
        <section className="h-screen w-full flex items-center justify-center pointer-events-none px-3 sm:px-4">
          <Projects isDarkMode={isDarkMode} />
        </section>
        <section className="h-screen w-full flex items-center justify-center pointer-events-none px-3 sm:px-4">
          <Contact isDarkMode={isDarkMode} />
        </section>
        <section className="h-screen w-full flex items-center justify-center pointer-events-none px-3 sm:px-4">
          <Intro isDarkMode={isDarkMode} />
        </section>
      </div>
    </Scroll>
  );
});

const Landing = () => {
  const { isDarkMode } = useDayNightUI();
  const [introDone, setIntroDone] = useState(false);
  const introContentRef = useRef<HTMLDivElement>(null);

  const grassGroupRef = useRef<THREE.Group>(null!);
  const skyGroupRef = useRef<THREE.Group>(null!);
  const mountainGroupRef = useRef<THREE.Group>(null!);
  const treeGroupRef = useRef<THREE.Group>(null!);
  const cloudGroupRef = useRef<THREE.Group>(null!);

  return (
    <Canvas
      dpr={[1, 1.5]}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{
        position: [0, 2, 14],
        fov: 55,
      }}
    >
      <EntranceSequence
        grassGroupRef={grassGroupRef}
        skyGroupRef={skyGroupRef}
        mountainGroupRef={mountainGroupRef}
        treeGroupRef={treeGroupRef}
        cloudGroupRef={cloudGroupRef}
        introContentRef={introContentRef}
        onIntroComplete={() => setIntroDone(true)}
      />

      <ResponsiveCamera />

      <ScrollControls
        pages={SCROLL_PAGES}
        damping={0.3}
        distance={1}
        enabled={introDone}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {introDone && (
          <>
            <ScrollRig
              grassGroupRef={grassGroupRef}
              skyGroupRef={skyGroupRef}
              mountainGroupRef={mountainGroupRef}
              treeGroupRef={treeGroupRef}
              cloudGroupRef={cloudGroupRef}
            />
            <LoopTeleport />
          </>
        )}

        <SceneContent
          grassGroupRef={grassGroupRef}
          skyGroupRef={skyGroupRef}
          mountainGroupRef={mountainGroupRef}
          treeGroupRef={treeGroupRef}
          cloudGroupRef={cloudGroupRef}
        />

        <ScrollSections
          introContentRef={introContentRef}
          isDarkMode={isDarkMode}
        />
      </ScrollControls>
    </Canvas>
  );
};

export default Landing;
