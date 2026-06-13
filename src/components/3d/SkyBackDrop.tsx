import { memo, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useNightCycleRef } from "../../context/DayNightContext";
import { SKY_PALETTE, lerpColorPair } from "../../utils/nightPalettes";
import { sharedGeometries } from "../../utils/geometryCache";
import CartoonStarField from "./CartoonStarField";

function SkyBackdrop() {
  const nightCycleRef = useNightCycleRef();
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const tmpEmissive = useMemo(() => new THREE.Color(), []);
  const skyGeometry = useMemo(() => sharedGeometries.skySphere(), []);

  useFrame(({ clock }) => {
    const t = nightCycleRef.current.progress;

    if (meshRef.current) {
      meshRef.current.position.copy(camera.position);
      meshRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.02) * 0.02;

      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      lerpColorPair(SKY_PALETTE.color, t, tmpColor);
      lerpColorPair(SKY_PALETTE.emissive, t, tmpEmissive);
      material.color.copy(tmpColor);
      material.emissive.copy(tmpEmissive);
      material.emissiveIntensity = THREE.MathUtils.lerp(
        SKY_PALETTE.emissiveIntensity.day,
        SKY_PALETTE.emissiveIntensity.night,
        t,
      );
    }
  });

  return (
    <>
      <mesh ref={meshRef} geometry={skyGeometry} frustumCulled={false}>
        <meshStandardMaterial
          color="#0066aa"
          emissive="#003355"
          emissiveIntensity={9.5}
          roughness={1}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <CartoonStarField />
    </>
  );
}

export { SkyBackdrop };
export default memo(SkyBackdrop);
