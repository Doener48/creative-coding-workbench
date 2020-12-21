import { DrawFunc, Sketch } from "./model";

const drawUnDeuxTrois: DrawFunc = (
  ctx: CanvasRenderingContext2D, width, height,
  settings: {
    amount: number, lengthScale: number, lineWidth: number
  }) => {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = settings.lineWidth;
  ctx.lineCap = 'round';
  const aThirdOfHeight = height / 3;
  const step = width / settings.amount;
  function draw(x, y, w, h, pos) {
    ctx.save();
    ctx.translate(x + width / 8, y + height / 8);
    ctx.rotate(Math.random() * 3);
    ctx.translate(-width / 8, -height / 8);
    for (let i = 0; i < pos.length; i++) {
      ctx.beginPath();
      ctx.moveTo(pos[i] * w, 0);
      ctx.lineTo(pos[i] * w, h * settings.lengthScale);
      ctx.stroke();
    }
    ctx.restore();
  }

  for (var y = step; y < height - step; y += step) {
    for (var x = step; x < width - step; x += step) {
      if (y < aThirdOfHeight) {
        draw(x, y, step, step, [0.5]);
      } else if (y < aThirdOfHeight * 2) {
        draw(x, y, step, step, [0.2, 0.8]);
      } else {
        draw(x, y, step, step, [0.1, 0.5, 0.9]);
      }
    }
  }
}

export default new Sketch({ name: "UnDeuxTrois", settings: { amount: 20, lengthScale: 1, lineWidth: 5 }, drawFunction: drawUnDeuxTrois });