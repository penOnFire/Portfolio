import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDayNight } from "../../context/DayNightContext";
import { TREE_FOLIAGE, TREE_TRUNK, lerpColorPair } from "../../utils/nightPalettes";

export default function Tree(props: React.ComponentProps<"group">) {
  const { nightCycleRef } = useDayNight();
  const trunkMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const foliageMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const t = nightCycleRef.current.progress;

    if (trunkMatRef.current) {
      lerpColorPair(TREE_TRUNK, t, tmpColor);
      trunkMatRef.current.color.copy(tmpColor);
    }

    foliageMatRefs.current.forEach((mat, i) => {
      if (!mat) return;
      lerpColorPair(TREE_FOLIAGE[i], t, tmpColor);
      mat.color.copy(tmpColor);
    });
  });

  return (
    <group {...props}>
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.6, 8]} />
        <meshStandardMaterial ref={trunkMatRef} color="#5a5127" />
      </mesh>

      <mesh position={[0, 0.2, 0]} castShadow>
        <coneGeometry args={[0.6, 0.8, 6]} />
        <meshStandardMaterial
          ref={(el) => {
            foliageMatRefs.current[0] = el;
          }}
          color="#3a7332"
        />
      </mesh>

      <mesh position={[0, 0.6, 0]} castShadow>
        <coneGeometry args={[0.45, 0.7, 6]} />
        <meshStandardMaterial
          ref={(el) => {
            foliageMatRefs.current[1] = el;
          }}
          color="#4a8c41"
        />
      </mesh>

      <mesh position={[0, 0.95, 0]} castShadow>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial
          ref={(el) => {
            foliageMatRefs.current[2] = el;
          }}
          color="#5fa84f"
        />
      </mesh>
    </group>
  );
}
