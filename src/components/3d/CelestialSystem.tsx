import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNightCycleRef } from "../../context/DayNightContext";
import Moon from "./Moon";
import Sun from "./Sun";

/** World-space sky slot: Sun by day, Moon by night */
const SKY_Y = 2;
const SKY_X = -3;

/** Larger radius = wider east–west arc; pivot Y keeps sky slot fixed at SKY_Y */
const ORBIT_RADIUS_Y = 7;
const ORBIT_PIVOT_Y = SKY_Y - ORBIT_RADIUS_Y;

const HIDE_BELOW_Y = 0.5;

export default function CelestialSystem({
  sunScale = 0.84,
  moonScale = 0.78,
}: {
  sunScale?: number;
  moonScale?: number;
}) {
  const nightCycleRef = useNightCycleRef();
  const wheelRef = useRef<THREE.Group>(null);
  const sunArmRef = useRef<THREE.Group>(null);
  const moonArmRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const t = nightCycleRef.current.progress;
    const wheelAngle = THREE.MathUtils.lerp(0, Math.PI, t);

    if (wheelRef.current) {
      wheelRef.current.rotation.x = wheelAngle;
    }

    const cos = Math.cos(wheelAngle);
    const sunWorldY = ORBIT_PIVOT_Y + ORBIT_RADIUS_Y * cos;
    const moonWorldY = ORBIT_PIVOT_Y - ORBIT_RADIUS_Y * cos;

    if (sunArmRef.current) {
      sunArmRef.current.visible = sunWorldY > HIDE_BELOW_Y;
    }

    if (moonArmRef.current) {
      moonArmRef.current.visible = moonWorldY > HIDE_BELOW_Y;
    }
  });

  return (
    <group position={[SKY_X, ORBIT_PIVOT_Y, 0]}>
      <group ref={wheelRef}>
        <group ref={sunArmRef} position={[0, ORBIT_RADIUS_Y, 0]}>
          <Sun position={[0, 0, 0]} scale={sunScale} />
        </group>
        <group ref={moonArmRef} position={[0, -ORBIT_RADIUS_Y, 0]}>
          <Moon scale={moonScale} />
        </group>
      </group>
    </group>
  );
}
