import * as THREE from "three";

export function colorPair(day: string, night: string) {
  return { day: new THREE.Color(day), night: new THREE.Color(night) };
}

export const SKY_PALETTE = {
  color: colorPair("#0066aa", "#0d1b2a"),
  emissive: colorPair("#003355", "#111933"),
  emissiveIntensity: { day: 9.5, night: 2.0 },
};

export const MOUNTAIN_TEAL = colorPair("#4d908e", "#3d6f78");
export const MOUNTAIN_GOLD = colorPair("#b89d24", "#4f5f72");
export const SNOW = colorPair("#ffffff", "#9aacbe");

export const TREE_TRUNK = colorPair("#5a5127", "#3d3828");
export const TREE_FOLIAGE = [
  colorPair("#3a7332", "#2d5238"),
  colorPair("#4a8c41", "#356248"),
  colorPair("#5fa84f", "#3f7550"),
] as const;

export const GRASS = colorPair("#4CAF50", "#3a6858");
export const CLOUD = colorPair("#ffffff", "#8898aa");

export const SUN_LIGHT = {
  color: colorPair("#fff4cc", "#88bbff"),
  intensity: { day: 25, night: 18 },
};

export const HEMISPHERE = {
  sky: colorPair("#87CEEB", "#1a2840"),
  ground: colorPair("#4d908e", "#2a4550"),
  intensity: { day: 0.85, night: 0.7 },
};

export const AMBIENT = {
  intensity: { day: 0.45, night: 0.48 },
};

export const MOON_DIRECTIONAL = {
  color: colorPair("#88bbff", "#88bbff"),
  intensity: { day: 0, night: 1.6 },
};

export function lerpColorPair(
  pair: { day: THREE.Color; night: THREE.Color },
  t: number,
  out: THREE.Color,
) {
  out.copy(pair.day).lerp(pair.night, t);
}
