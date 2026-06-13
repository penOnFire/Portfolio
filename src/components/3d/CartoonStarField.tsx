import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useDayNight } from "../../context/DayNightContext";
import { createStarTexture } from "../../utils/createStarTexture";
import { sharedGeometries } from "../../utils/geometryCache";
import { getStarField } from "../../utils/starFieldCache";

function CartoonStarField() {
  const { nightCycleRef } = useDayNight();
  const groupRef = useRef<THREE.Group>(null);
  const starRefs = useRef<(THREE.Mesh | null)[]>([]);
  const lastOpacityRef = useRef(-1);
  const { camera } = useThree();
  const stars = useMemo(() => getStarField(), []);
  const starGeometry = useMemo(() => sharedGeometries.starPlane(), []);
  const starMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: createStarTexture(),
      transparent: true,
      depthWrite: false,
      opacity: 0,
      toneMapped: false,
    });
    return material;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const t = nightCycleRef.current.progress;
    const opacity = THREE.MathUtils.smoothstep(t, 0.1, 0.9) * 0.85;
    const starsVisible = opacity > 0.01;

    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
      groupRef.current.visible = starsVisible;
    }

    if (lastOpacityRef.current !== opacity) {
      starMaterial.opacity = opacity;
      starMaterial.visible = starsVisible;
      lastOpacityRef.current = opacity;
    }

    if (!starsVisible) return;

    const camQuat = camera.quaternion;
    starRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const star = stars[i];
      if (!star) return;

      mesh.quaternion.copy(camQuat);
      mesh.rotation.z = star.rotation;
      const twinkle =
        1 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.08;
      const s = star.baseScale * twinkle;
      mesh.scale.set(s, s, s);
    });
  });

  return (
    <group ref={groupRef} frustumCulled={false}>
      {stars.map((star, i) => (
        <mesh
          key={i}
          ref={(el) => {
            starRefs.current[i] = el;
          }}
          position={star.position}
          geometry={starGeometry}
          material={starMaterial}
        />
      ))}
    </group>
  );
}

export default memo(CartoonStarField);
