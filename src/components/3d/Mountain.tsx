import * as THREE from "three";
import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNightCycleRef } from "../../context/DayNightContext";
import { sharedGeometries } from "../../utils/geometryCache";
import {
  MOUNTAIN_GOLD,
  MOUNTAIN_TEAL,
  SNOW,
  lerpColorPair,
} from "../../utils/nightPalettes";

function Mountain({
  position,
  scale = 1,
  color = "#4d908e",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const nightCycleRef = useNightCycleRef();
  const groupRef = useRef<THREE.Group>(null);
  const baseMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const snowMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const baseGeometry = useMemo(() => sharedGeometries.mountainCone(), []);
  const snowGeometry = useMemo(() => sharedGeometries.mountainSnow(), []);

  const basePalette = color === "#b89d24" ? MOUNTAIN_GOLD : MOUNTAIN_TEAL;

  useFrame(() => {
    const t = nightCycleRef.current.progress;

    if (baseMatRef.current) {
      lerpColorPair(basePalette, t, tmpColor);
      baseMatRef.current.color.copy(tmpColor);
    }

    if (snowMatRef.current) {
      lerpColorPair(SNOW, t, tmpColor);
      snowMatRef.current.color.copy(tmpColor);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <mesh geometry={baseGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          ref={baseMatRef}
          color={color}
          roughness={1}
          flatShading
        />
      </mesh>

      <mesh geometry={snowGeometry} receiveShadow>
        <meshStandardMaterial
          ref={snowMatRef}
          color="#ffffff"
          roughness={1}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default memo(Mountain);
