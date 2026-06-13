import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNightCycleRef } from "../../context/DayNightContext";
import { TREE_FOLIAGE, TREE_TRUNK, lerpColorPair } from "../../utils/nightPalettes";
import { sharedGeometries } from "../../utils/geometryCache";

function Tree(props: React.ComponentProps<"group">) {
  const nightCycleRef = useNightCycleRef();
  const trunkMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const foliageMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const trunkGeometry = useMemo(() => sharedGeometries.treeTrunk(), []);
  const foliageLarge = useMemo(() => sharedGeometries.treeFoliageLarge(), []);
  const foliageMid = useMemo(() => sharedGeometries.treeFoliageMid(), []);
  const foliageSmall = useMemo(() => sharedGeometries.treeFoliageSmall(), []);

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
      <mesh geometry={trunkGeometry} position={[0, -0.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial ref={trunkMatRef} color="#5a5127" />
      </mesh>

      <mesh geometry={foliageLarge} position={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial
          ref={(el) => {
            foliageMatRefs.current[0] = el;
          }}
          color="#3a7332"
        />
      </mesh>

      <mesh geometry={foliageMid} position={[0, 0.6, 0]} castShadow>
        <meshStandardMaterial
          ref={(el) => {
            foliageMatRefs.current[1] = el;
          }}
          color="#4a8c41"
        />
      </mesh>

      <mesh geometry={foliageSmall} position={[0, 0.95, 0]} castShadow>
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

export default memo(Tree);
