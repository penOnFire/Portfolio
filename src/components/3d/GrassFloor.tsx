import { memo, useMemo, useRef } from "react";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { useFrame } from "@react-three/fiber";
import { useNightCycleRef } from "../../context/DayNightContext";
import { sharedGeometries } from "../../utils/geometryCache";
import { GRASS, lerpColorPair } from "../../utils/nightPalettes";

function GrassFloor({
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
  const nightCycleRef = useNightCycleRef();
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<MeshStandardMaterial>(null);
  const tmpColor = useMemo(() => new Color(), []);
  const geometry = useMemo(
    () => sharedGeometries.grassCylinder(radius, height),
    [radius, height],
  );

  useFrame(() => {
    const t = nightCycleRef.current.progress;
    if (!matRef.current) return;
    lerpColorPair(GRASS, t, tmpColor);
    matRef.current.color.copy(tmpColor);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} scale={scale} receiveShadow>
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

export default memo(GrassFloor);
