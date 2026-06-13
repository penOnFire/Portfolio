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

function buildMountainSnowGeometry(): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];

  vertices.push(0, 2, 0);

  const segments = 16;

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const isCorner = i % 2 === 0;

    const y = isCorner ? 1.2 : 0.4;
    let mountainRadius = 1 - y / 2;

    if (!isCorner) mountainRadius *= Math.cos(Math.PI / 8);

    const rOuter = mountainRadius + 0.08;

    vertices.push(Math.cos(angle) * rOuter, y, Math.sin(angle) * rOuter);
  }

  vertices.push(0, -1, 0);

  for (let i = 1; i <= segments; i++) {
    const next = i === segments ? 1 : i + 1;

    indices.push(0, i, next);
    indices.push(17, next, i);
  }

  geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

export const sharedGeometries = {
  starPlane: () => getCachedGeometry("plane-1x1", () => new THREE.PlaneGeometry(1, 1)),

  skySphere: () =>
    getCachedGeometry("sphere-200-32", () => new THREE.SphereGeometry(200, 32, 32)),

  mountainCone: () =>
    getCachedGeometry("cone-2-4-8", () => new THREE.ConeGeometry(2, 4, 8)),

  mountainSnow: () => getCachedGeometry("mountain-snow", buildMountainSnowGeometry),

  treeTrunk: () =>
    getCachedGeometry("cylinder-trunk", () => new THREE.CylinderGeometry(0.07, 0.07, 0.6, 8)),

  treeFoliageLarge: () =>
    getCachedGeometry("cone-tree-lg", () => new THREE.ConeGeometry(0.6, 0.8, 6)),

  treeFoliageMid: () =>
    getCachedGeometry("cone-tree-md", () => new THREE.ConeGeometry(0.45, 0.7, 6)),

  treeFoliageSmall: () =>
    getCachedGeometry("cone-tree-sm", () => new THREE.ConeGeometry(0.3, 0.5, 6)),

  sunBody: () =>
    getCachedGeometry("sphere-sun-0.8", () => new THREE.SphereGeometry(0.8, 32, 32)),

  sunRay: () =>
    getCachedGeometry("cylinder-sun-ray", () => new THREE.CylinderGeometry(0.05, 0.35, 0.8, 8)),

  sunEye: () =>
    getCachedGeometry("sphere-eye-0.1", () => new THREE.SphereGeometry(0.1, 16, 16)),

  sunMouthSmile: () =>
    getCachedGeometry("cylinder-mouth-smile", () => new THREE.CylinderGeometry(0.22, 0.22, 0.05, 32)),

  sunMouthNeutral: () =>
    getCachedGeometry("cylinder-mouth-neutral", () => new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32)),

  moonGlow: () =>
    getCachedGeometry("sphere-moon-glow", () => new THREE.SphereGeometry(1.05, 32, 32)),

  moonBody: () =>
    getCachedGeometry("sphere-moon-body", () => new THREE.SphereGeometry(0.75, 48, 48)),

  moonEye: () =>
    getCachedGeometry("sphere-moon-eye", () => new THREE.SphereGeometry(0.09, 16, 16)),

  moonMouthSmile: () =>
    getCachedGeometry("cylinder-moon-mouth-smile", () => new THREE.CylinderGeometry(0.2, 0.2, 0.04, 32)),

  moonMouthNeutral: () =>
    getCachedGeometry("cylinder-moon-mouth-neutral", () => new THREE.CylinderGeometry(0.1, 0.1, 0.04, 32)),

  grassCylinder: (radius: number, height: number) => {
    const key = `cylinder-grass-${radius.toFixed(1)}-${height}`;
    return getCachedGeometry(
      key,
      () => new THREE.CylinderGeometry(radius, radius, height, 64),
    );
  },

  cloudSphere: (radius: number) => {
    const quantized = Math.round(radius * 10) / 10;
    const key = `sphere-cloud-${quantized}-16`;
    return getCachedGeometry(
      key,
      () => new THREE.SphereGeometry(quantized, 16, 16),
    );
  },
};
