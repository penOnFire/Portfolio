import * as THREE from "three";

type Crater = {
  x: number;
  y: number;
  radius: number;
  innerColor: string;
  outerColor: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function generateCraters(size: number): Crater[] {
  const craters: Crater[] = [];

  for (let i = 0; i < 36; i++) {
    craters.push({
      x: seededRandom(i * 3.17) * size,
      y: seededRandom(i * 7.91) * size,
      radius: 6 + seededRandom(i * 11.3) * 20,
      innerColor: "#5a5a62",
      outerColor: "#8a8a94",
    });
  }

  for (let i = 0; i < 28; i++) {
    craters.push({
      x: seededRandom(i * 19.7 + 100) * size,
      y: seededRandom(i * 23.1 + 200) * size,
      radius: 2 + seededRandom(i * 31.5) * 7,
      innerColor: "#6a6a72",
      outerColor: "#9a9aa4",
    });
  }

  return craters;
}

function drawCrater(
  ctx: CanvasRenderingContext2D,
  crater: Crater,
) {
  const { x, y, radius, innerColor, outerColor } = crater;
  const gradient = ctx.createRadialGradient(x, y, radius * 0.15, x, y, radius);
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(0.55, outerColor);
  gradient.addColorStop(1, "rgba(230, 230, 234, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function buildMoonMaps() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const craters = generateCraters(size);

  ctx.fillStyle = "#e6e6ea";
  ctx.fillRect(0, 0, size, size);

  for (const crater of craters) {
    drawCrater(ctx, crater);
  }

  const colorTexture = new THREE.CanvasTexture(canvas);
  colorTexture.colorSpace = THREE.SRGBColorSpace;

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d")!;

  bumpCtx.fillStyle = "#808080";
  bumpCtx.fillRect(0, 0, size, size);

  for (const crater of craters) {
    const gradient = bumpCtx.createRadialGradient(
      crater.x,
      crater.y,
      crater.radius * 0.1,
      crater.x,
      crater.y,
      crater.radius,
    );
    gradient.addColorStop(0, "#303030");
    gradient.addColorStop(0.7, "#606060");
    gradient.addColorStop(1, "#808080");
    bumpCtx.fillStyle = gradient;
    bumpCtx.beginPath();
    bumpCtx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
    bumpCtx.fill();
  }

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

  return { colorTexture, bumpTexture };
}

let cachedMaps: ReturnType<typeof buildMoonMaps> | null = null;

export function createMoonTexture(): THREE.CanvasTexture {
  if (!cachedMaps) cachedMaps = buildMoonMaps();
  return cachedMaps.colorTexture;
}

export function createMoonBumpMap(): THREE.CanvasTexture {
  if (!cachedMaps) cachedMaps = buildMoonMaps();
  return cachedMaps.bumpTexture;
}
