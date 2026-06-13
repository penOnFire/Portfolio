import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNightCycleRef } from "../../context/DayNightContext";
import { useCursorFaceTracking } from "../../hooks/useCursorFaceTracking";
import { sharedGeometries } from "../../utils/geometryCache";
import { SUN_LIGHT, lerpColorPair } from "../../utils/nightPalettes";

function Sun({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number | [number, number, number];
}) {
  const nightCycleRef = useNightCycleRef();
  const groupRef = useRef<THREE.Group>(null);
  const raysRef = useRef<THREE.Group>(null);
  const skyLightRef = useRef<THREE.PointLight>(null);
  const bodyMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const tmpLightColor = useMemo(() => new THREE.Color(), []);
  const bodyGeometry = useMemo(() => sharedGeometries.sunBody(), []);
  const rayGeometry = useMemo(() => sharedGeometries.sunRay(), []);
  const eyeGeometry = useMemo(() => sharedGeometries.sunEye(), []);
  const mouthSmileGeometry = useMemo(() => sharedGeometries.sunMouthSmile(), []);
  const mouthNeutralGeometry = useMemo(() => sharedGeometries.sunMouthNeutral(), []);
  const {
    faceRef,
    leftEyeRef,
    rightEyeRef,
    isSmiling,
    applyFaceTracking,
  } = useCursorFaceTracking();

  useFrame((state, delta) => {
    const { clock, camera } = state;
    const t = nightCycleRef.current.progress;

    if (raysRef.current) {
      raysRef.current.rotation.z -= delta * 0.1;
    }

    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime()) * 0.15;
      groupRef.current.quaternion.copy(camera.quaternion);
    }

    applyFaceTracking(delta);

    if (skyLightRef.current) {
      lerpColorPair(SUN_LIGHT.color, t, tmpLightColor);
      skyLightRef.current.color.copy(tmpLightColor);
      skyLightRef.current.intensity = THREE.MathUtils.lerp(
        SUN_LIGHT.intensity.day,
        SUN_LIGHT.intensity.night,
        t,
      );
      skyLightRef.current.castShadow = t < 0.85;
    }

    if (bodyMatRef.current) {
      bodyMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(1.2, 0, t);
      bodyMatRef.current.opacity = THREE.MathUtils.lerp(1, 0.15, t);
      bodyMatRef.current.transparent = t > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <pointLight
        ref={skyLightRef}
        color="#fff4cc"
        intensity={25}
        distance={80}
        decay={1.5}
        castShadow
      />

      <group ref={raysRef}>
        {Array.from({ length: 12 }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
            <mesh geometry={rayGeometry} position={[0, 0.9, -0.2]}>
              <meshStandardMaterial
                color="#ffcc00"
                emissive="#ff9900"
                emissiveIntensity={0.8}
                flatShading
              />
            </mesh>
          </group>
        ))}
      </group>

      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial
          ref={bodyMatRef}
          color="#ffcc00"
          emissive="#ffcc00"
          emissiveIntensity={1.2}
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

export default memo(Sun);
