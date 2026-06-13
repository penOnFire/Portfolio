import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useDayNight } from "../../context/DayNightContext";
import {
  AMBIENT,
  HEMISPHERE,
  MOON_DIRECTIONAL,
  lerpColorPair,
} from "../../utils/nightPalettes";

const CYCLE_DURATION = 0.7;

export default function DayNightRig() {
  const { nightCycleRef } = useDayNight();
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const lastTargetRef = useRef(nightCycleRef.current.target);
  const tmpSky = useMemo(() => new THREE.Color(), []);
  const tmpGround = useMemo(() => new THREE.Color(), []);
  const tmpDirColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    return () => {
      progressTweenRef.current?.kill();
    };
  }, []);

  useFrame(() => {
    const cycle = nightCycleRef.current;

    if (cycle.target !== lastTargetRef.current) {
      lastTargetRef.current = cycle.target;
      progressTweenRef.current?.kill();
      progressTweenRef.current = gsap.to(cycle, {
        progress: cycle.target,
        duration: CYCLE_DURATION,
        ease: "power2.inOut",
      });
    }

    const t = cycle.progress;

    if (hemiRef.current) {
      lerpColorPair(HEMISPHERE.sky, t, tmpSky);
      lerpColorPair(HEMISPHERE.ground, t, tmpGround);
      hemiRef.current.color.copy(tmpSky);
      hemiRef.current.groundColor.copy(tmpGround);
      hemiRef.current.intensity = THREE.MathUtils.lerp(
        HEMISPHERE.intensity.day,
        HEMISPHERE.intensity.night,
        t,
      );
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        AMBIENT.intensity.day,
        AMBIENT.intensity.night,
        t,
      );
    }

    if (directionalRef.current) {
      lerpColorPair(MOON_DIRECTIONAL.color, t, tmpDirColor);
      directionalRef.current.color.copy(tmpDirColor);
      directionalRef.current.intensity = THREE.MathUtils.lerp(
        MOON_DIRECTIONAL.intensity.day,
        MOON_DIRECTIONAL.intensity.night,
        t,
      );
    }
  }, 0);

  return (
    <>
      <hemisphereLight
        ref={hemiRef}
        args={[HEMISPHERE.sky.day, HEMISPHERE.ground.day, HEMISPHERE.intensity.day]}
      />
      <ambientLight ref={ambientRef} intensity={AMBIENT.intensity.day} />
      <directionalLight
        ref={directionalRef}
        position={[-8, 12, 6]}
        intensity={0}
        color="#88bbff"
      />
    </>
  );
}
