import * as THREE from "three";

export const STAR_COUNT = 200;
const MIN_STAR_DISTANCE = 7;

export type StarData = {
  position: THREE.Vector3;
  baseScale: number;
  rotation: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function sampleShellPosition(seed: number): THREE.Vector3 {
  const u = seededRandom(seed * 3.17);
  const v = seededRandom(seed * 7.91);
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const radius = 95 + seededRandom(seed * 11.3) * 40;

  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
  );
}

function buildStarField(): StarData[] {
  const stars: StarData[] = [];
  let seed = 1;
  const maxAttempts = STAR_COUNT * 40;

  while (stars.length < STAR_COUNT && seed <= maxAttempts) {
    const position = sampleShellPosition(seed);
    seed++;

    const overlaps = stars.some(
      (star) => star.position.distanceTo(position) < MIN_STAR_DISTANCE,
    );
    if (overlaps) continue;

    stars.push({
      position,
      baseScale: 1.2 + seededRandom(seed * 19.7) * 2.3,
      rotation: seededRandom(seed * 23.1) * Math.PI * 2,
      twinkleSpeed: 0.8 + seededRandom(seed * 31.5) * 1.6,
      twinklePhase: seededRandom(seed * 41.2) * Math.PI * 2,
    });
  }

  return stars;
}

let cachedStarField: StarData[] | null = null;

export function getStarField(): StarData[] {
  if (!cachedStarField) {
    cachedStarField = buildStarField();
  }
  return cachedStarField;
}
