import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useNightCycleRef } from "../../context/DayNightContext";
import { createStarTexture } from "../../utils/createStarTexture";
import { sharedGeometries } from "../../utils/geometryCache";
import { getStarField, STAR_COUNT } from "../../utils/starFieldCache";

function CartoonStarField() {
  const nightCycleRef = useNightCycleRef();
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const lastOpacityRef = useRef(-1);
  const { camera } = useThree();
  const stars = useMemo(() => getStarField(), []);
  const starGeometry = useMemo(() => sharedGeometries.starPlane(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
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

    const mesh = instancedRef.current;
    if (!mesh || !starsVisible) return;

    const camQuat = camera.quaternion;

    stars.forEach((star, i) => {
      dummy.position.copy(star.position);
      dummy.quaternion.copy(camQuat);
      dummy.rotation.z = star.rotation;
      const twinkle =
        1 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.08;
      const s = star.baseScale * twinkle;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} frustumCulled={false}>
      <instancedMesh
        ref={instancedRef}
        args={[starGeometry, starMaterial, STAR_COUNT]}
      />
    </group>
  );
}

export default memo(CartoonStarField);
