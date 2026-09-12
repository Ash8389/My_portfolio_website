/**
 * Converts a base64 JPEG image into a green-phosphor half-block ASCII/Unicode terminal image string.
 * Follows 1:1 centered square cropping and half-block luminance green phosphor mapping.
 */
export function imageToSquareHalfBlocks(img, cols = 80) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx || !img.naturalWidth || !img.naturalHeight) {
    return "";
  }

  // 1. Crop the source image to a centered square
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;

  // 2. Sample grid: cols wide, cols * 2 tall (half-block doubles vertical density)
  const w = cols;
  const rows = cols;
  const h = rows * 2;

  canvas.width = w;
  canvas.height = h;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, side, side, 0, 0, w, h);

  const imgData = ctx.getImageData(0, 0, w, h).data;

  // 3 & 4. Green-phosphor conversion with gamma lift
  function greenShade(x, y) {
    const i = (y * w + x) * 4;
    const r = imgData[i];
    const g = imgData[i + 1];
    const b = imgData[i + 2];
    let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    brightness = Math.pow(brightness, 0.9); // gamma lift for midtone detail
    const gVal = Math.round(brightness * 255);
    return [0, gVal, Math.round(gVal * 0.18)]; // phosphor green with faint blue bleed
  }

  let out = "";
  for (let r = 0; r < rows; r++) {
    let row = "";
    const yTop = r * 2;
    const yBot = r * 2 + 1;
    for (let x = 0; x < w; x++) {
      const [tr, tg, tb] = greenShade(x, yTop);
      const [br, bg, bb] = greenShade(x, yBot);
      row += `<span style="color:rgb(${tr},${tg},${tb});background-color:rgb(${br},${bg},${bb})">&#9600;</span>`;
    }
    out += row + "\n";
  }
  return out;
}
