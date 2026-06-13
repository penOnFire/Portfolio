import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const TRACK_DELAY = 0.3;
const MAX_HEAD_YAW = 0.65;
const MAX_HEAD_PITCH = 0.5;
const MAX_EYE_OFFSET = 0.09;

export function useCursorFaceTracking() {
  const faceRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const pointerNdc = useRef(new THREE.Vector2());
  const headLook = useRef(new THREE.Vector2());
  const eyeLook = useRef(new THREE.Vector2());
  const [isSmiling, setIsSmiling] = useState(false);

  useEffect(() => {
    const handleDown = () => setIsSmiling(true);
    const handleUp = () => setIsSmiling(false);
    const handleMove = (e: MouseEvent) => {
      pointerNdc.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNdc.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const applyFaceTracking = (delta: number) => {
    const smoothFactor = 1 - Math.exp(-delta / TRACK_DELAY);

    headLook.current.lerp(pointerNdc.current, smoothFactor);

    if (faceRef.current) {
      faceRef.current.rotation.set(
        -headLook.current.y * MAX_HEAD_PITCH,
        headLook.current.x * MAX_HEAD_YAW,
        headLook.current.x * headLook.current.y * 0.08,
      );
    }

    const eyeTargetX = pointerNdc.current.x * MAX_EYE_OFFSET;
    const eyeTargetY = pointerNdc.current.y * MAX_EYE_OFFSET;
    eyeLook.current.x = THREE.MathUtils.lerp(
      eyeLook.current.x,
      eyeTargetX,
      smoothFactor,
    );
    eyeLook.current.y = THREE.MathUtils.lerp(
      eyeLook.current.y,
      eyeTargetY,
      smoothFactor,
    );

    leftEyeRef.current?.position.set(
      -0.25 + eyeLook.current.x,
      0.2 + eyeLook.current.y,
      0.72,
    );
    rightEyeRef.current?.position.set(
      0.25 + eyeLook.current.x,
      0.2 + eyeLook.current.y,
      0.72,
    );
  };

  return {
    faceRef,
    leftEyeRef,
    rightEyeRef,
    isSmiling,
    applyFaceTracking,
  };
}
