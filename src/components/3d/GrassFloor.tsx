import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { useDayNight } from "../../context/DayNightContext";
import { GRASS, lerpColorPair } from "../../utils/nightPalettes";

export default function GrassFloor({
  position = [0, -1.2, 0],
  radius = 10,
  height = 0.5,
  color = "#4CAF50",
  scale = 1,
}: {
  position?: [number, number, number];
  radius?: number;
  height?: number;
  color?: string;
  scale?: number | [number, number, number];
}) {
  const { nightCycleRef } = useDayNight();
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<MeshStandardMaterial>(null);
  const tmpColor = useMemo(() => new Color(), []);

  useFrame(() => {
    const t = nightCycleRef.current.progress;
    if (!matRef.current) return;
    lerpColorPair(GRASS, t, tmpColor);
    matRef.current.color.copy(tmpColor);
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        roughness={1}
        metalness={0}
        flatShading={true}
      />
    </mesh>
  );
}
