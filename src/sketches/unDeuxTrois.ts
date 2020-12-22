import { DrawFunc, Sketch } from "./model";

const drawUnDeuxTrois: DrawFunc = (
  ctx: CanvasRenderingContext2D, width, height,
  settings: {
    amount: number,
    lengthScale: number,
    lineWidth: number,
    randomColors: boolean
  }) => {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = settings.lineWidth;
  ctx.lineCap = 'round';
  const aThirdOfHeight = height / 3;
  const step = width / settings.amount;
  function draw(x, y, w, h, pos) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(Math.random() * 3);
    ctx.translate(-w / 2, -h / 2);
    const color = Math.floor(Math.random() * 361);
    const lightness = settings.randomColors ? 75 : 0;
    const hsl = `hsl(${color},100%,${lightness}%)`;
    ctx.strokeStyle = hsl;
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

export default new Sketch(
  {
    name: "UnDeuxTrois",
    settings: {
      amount: 20, lengthScale: 1, lineWidth: 5,
      randomColors: true
    },
    drawFunction: drawUnDeuxTrois
  });