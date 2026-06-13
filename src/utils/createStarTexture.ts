import * as THREE from "three";

function drawFivePointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function buildStarTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.48);
  glow.addColorStop(0, "rgba(255, 248, 204, 0.9)");
  glow.addColorStop(0.35, "rgba(255, 255, 255, 0.55)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  drawFivePointStar(ctx, cx, cy, size * 0.42, size * 0.17);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  drawFivePointStar(ctx, cx, cy, size * 0.32, size * 0.13);
  ctx.fillStyle = "#fff8cc";
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

let cachedStarTexture: THREE.CanvasTexture | null = null;

export function createStarTexture(): THREE.CanvasTexture {
  if (!cachedStarTexture) {
    cachedStarTexture = buildStarTexture();
  }
  return cachedStarTexture;
}
