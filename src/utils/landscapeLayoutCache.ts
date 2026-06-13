const GRASS_LOCAL_Y = -2.7;
const GRASS_HEIGHT = 0.5;
const BASE_GRASS_SCALE = 1.2;
const TREE_GROUP_Y = -1;

export type LandscapeLayout = {
  isNarrow: boolean;
  isPortrait: boolean;
  worldScale: number;
  grassRadius: number;
  grassScale: number;
  grassTopY: number;
  treeGroupBaseY: number;
};

function computeLandscapeLayout(aspect: number): LandscapeLayout {
  const isNarrow = aspect < 0.75;
  const isPortrait = aspect < 1;
  const worldScale = isNarrow ? 0.88 : 1;
  const grassRadius = isNarrow ? 22 : isPortrait ? 14 : 10;
  const grassScale = isNarrow ? 2 : isPortrait ? 1.5 : 1.2;
  const grassTopY = GRASS_LOCAL_Y + (GRASS_HEIGHT * grassScale) / 2;
  const baseGrassTopY = GRASS_LOCAL_Y + (GRASS_HEIGHT * BASE_GRASS_SCALE) / 2;
  const treeGroupBaseY = TREE_GROUP_Y + (grassTopY - baseGrassTopY);

  return {
    isNarrow,
    isPortrait,
    worldScale,
    grassRadius,
    grassScale,
    grassTopY,
    treeGroupBaseY,
  };
}

const layoutCache = new Map<number, LandscapeLayout>();

export function getLandscapeLayout(aspect: number): LandscapeLayout {
  const key = Math.round(aspect * 100) / 100;
  let layout = layoutCache.get(key);
  if (!layout) {
    layout = computeLandscapeLayout(aspect);
    layoutCache.set(key, layout);
  }
  return layout;
}
