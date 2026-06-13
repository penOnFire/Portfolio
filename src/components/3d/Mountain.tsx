import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useDayNight } from "../../context/DayNightContext";
import {
  MOUNTAIN_GOLD,
  MOUNTAIN_TEAL,
  SNOW,
  lerpColorPair,
} from "../../utils/nightPalettes";

export default function Mountain({
  position,
  scale = 1,
  color = "#4d908e",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const { nightCycleRef } = useDayNight();
  const groupRef = useRef<THREE.Group>(null);
  const baseMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const snowMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const tmpColor = useMemo(() => new THREE.Color(), []);

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

  const snowGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    vertices.push(0, 2, 0);

    const segments = 16;

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const isCorner = i % 2 === 0;

      const y = isCorner ? 1.2 : 0.4;
      let mountainRadius = 1 - y / 2;

      if (!isCorner) mountainRadius *= Math.cos(Math.PI / 8);

      const rOuter = mountainRadius + 0.08;

      vertices.push(Math.cos(angle) * rOuter, y, Math.sin(angle) * rOuter);
    }

    vertices.push(0, -1, 0);

    for (let i = 1; i <= segments; i++) {
      const next = i === segments ? 1 : i + 1;

      indices.push(0, i, next);
      indices.push(17, next, i);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, []);

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <mesh castShadow receiveShadow>
        <coneGeometry args={[2, 4, 8]} />
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
