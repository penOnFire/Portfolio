import * as THREE from "three";

const geometryCache = new Map<string, THREE.BufferGeometry>();

export function getCachedGeometry(
  key: string,
  factory: () => THREE.BufferGeometry,
): THREE.BufferGeometry {
  let geometry = geometryCache.get(key);
  if (!geometry) {
    geometry = factory();
    geometryCache.set(key, geometry);
  }
  return geometry;
}

export const sharedGeometries = {
  starPlane: () => getCachedGeometry("plane-1x1", () => new THREE.PlaneGeometry(1, 1)),
  skySphere: () =>
    getCachedGeometry("sphere-200-32", () => new THREE.SphereGeometry(200, 32, 32)),
};
