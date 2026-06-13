import * as THREE from "three";
import { memo, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useDayNight } from "../../context/DayNightContext";
import { CLOUD, lerpColorPair } from "../../utils/nightPalettes";

type CloudSphere = {
  pos: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
};

const cloudLayoutCache = new Map<number, CloudSphere[]>();

function buildCloudSpheres(seed: number): CloudSphere[] {
  const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  return Array.from({ length: 7 }).map((_, i) => ({
    pos: [
      (i - 3) * 1 + Math.sin(seed + i) * 0.5,
      Math.cos(seed * i) * 0.4,
      Math.sin(seed * 0.5) * 0.3,
    ] as [number, number, number],
    radius: random(0.7, 1.5),
    speed: random(0.2, 0.8),
    phase: seed + i * Math.PI,
  }));
}

function getCloudSpheres(seed: number): CloudSphere[] {
  let layout = cloudLayoutCache.get(seed);
  if (!layout) {
    layout = buildCloudSpheres(seed);
    cloudLayoutCache.set(seed, layout);
  }
  return layout;
}

function Cloud({
  position = [0, 5, -5],
  scale = 1,
  color = "#ffffff",
  seed = 0,
}: {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  color?: string;
  seed?: number;
}) {
  const { nightCycleRef } = useDayNight();
  const groupRef = useRef<THREE.Group>(null);
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
  const materialRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const cloudSpheres = useMemo(() => getCloudSpheres(seed), [seed]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = nightCycleRef.current.progress;

    sphereRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const s = cloudSpheres[i];
        mesh.position.x = s.pos[0] + Math.sin(time * s.speed + s.phase) * 0.4;
        mesh.position.y =
          s.pos[1] + Math.cos(time * s.speed * 0.8 + s.phase) * 0.3;
        mesh.position.z =
          s.pos[2] + Math.sin(time * s.speed * 1.2 + s.phase) * 0.25;

        const scalePulse = 1 + Math.sin(time * s.speed) * 0.05;
        mesh.scale.set(scalePulse, scalePulse, scalePulse);
      }
    });

    lerpColorPair(CLOUD, t, tmpColor);
    materialRefs.current.forEach((mat) => {
      if (!mat) return;
      mat.color.copy(tmpColor);
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {cloudSpheres.map((sphere, index) => (
        <mesh
          key={index}
          ref={(el) => {
            sphereRefs.current[index] = el;
          }}
          position={sphere.pos}
          receiveShadow
        >
          <sphereGeometry args={[sphere.radius, 32, 32]} />
          <meshStandardMaterial
            ref={(el) => {
              materialRefs.current[index] = el;
            }}
            color={color}
            roughness={0.9}
            flatShading={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default memo(Cloud);
