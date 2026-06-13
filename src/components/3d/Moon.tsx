import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNightCycleRef } from "../../context/DayNightContext";
import { useCursorFaceTracking } from "../../hooks/useCursorFaceTracking";
import {
  createMoonBumpMap,
  createMoonTexture,
} from "../../utils/createMoonTexture";
import { sharedGeometries } from "../../utils/geometryCache";

function Moon({
  scale = 1,
}: {
  scale?: number | [number, number, number];
}) {
  const nightCycleRef = useNightCycleRef();
  const groupRef = useRef<THREE.Group>(null);
  const moonLightRef = useRef<THREE.PointLight>(null);
  const moonTexture = useMemo(() => createMoonTexture(), []);
  const moonBump = useMemo(() => createMoonBumpMap(), []);
  const glowGeometry = useMemo(() => sharedGeometries.moonGlow(), []);
  const bodyGeometry = useMemo(() => sharedGeometries.moonBody(), []);
  const eyeGeometry = useMemo(() => sharedGeometries.moonEye(), []);
  const mouthSmileGeometry = useMemo(() => sharedGeometries.moonMouthSmile(), []);
  const mouthNeutralGeometry = useMemo(() => sharedGeometries.moonMouthNeutral(), []);
  const parentQuat = useMemo(() => new THREE.Quaternion(), []);
  const billboardQuat = useMemo(() => new THREE.Quaternion(), []);
  const {
    faceRef,
    leftEyeRef,
    rightEyeRef,
    isSmiling,
    applyFaceTracking,
  } = useCursorFaceTracking();

  useEffect(() => {
    const light = moonLightRef.current;
    if (!light) return;

    light.castShadow = true;
    light.shadow.mapSize.set(512, 512);
    light.shadow.bias = -0.002;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 120;
  }, []);

  useFrame(({ camera }, delta) => {
    const t = nightCycleRef.current.progress;

    if (groupRef.current) {
      const parent = groupRef.current.parent;
      if (parent) {
        parent.getWorldQuaternion(parentQuat);
        billboardQuat.copy(parentQuat.invert()).multiply(camera.quaternion);
        groupRef.current.quaternion.copy(billboardQuat);
      } else {
        groupRef.current.quaternion.copy(camera.quaternion);
      }
    }

    applyFaceTracking(delta);

    if (moonLightRef.current) {
      moonLightRef.current.intensity = THREE.MathUtils.lerp(
        0,
        28,
        THREE.MathUtils.smoothstep(t, 0.1, 0.75),
      );
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <pointLight
        ref={moonLightRef}
        color="#aaccff"
        intensity={0}
        distance={90}
        decay={1.5}
        castShadow
      />

      <mesh geometry={glowGeometry} position={[0, 0, -0.15]}>
        <meshStandardMaterial
          color="#c8ccd8"
          emissive="#b8bcc8"
          emissiveIntensity={0.25}
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial
          map={moonTexture}
          bumpMap={moonBump}
          bumpScale={0.08}
          color="#e8e8ec"
          roughness={1}
          metalness={0}
          emissive="#888899"
          emissiveIntensity={0.15}
        />
      </mesh>

      <group ref={faceRef}>
        <mesh ref={leftEyeRef} geometry={eyeGeometry} position={[-0.25, 0.2, 0.72]}>
          <meshBasicMaterial color="#222" />
        </mesh>

        <mesh ref={rightEyeRef} geometry={eyeGeometry} position={[0.25, 0.2, 0.72]}>
          <meshBasicMaterial color="#222" />
        </mesh>

        <mesh
          geometry={isSmiling ? mouthSmileGeometry : mouthNeutralGeometry}
          position={[0, -0.2, 0.72]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="#222" />
        </mesh>
      </group>
    </group>
  );
}

export default memo(Moon);
