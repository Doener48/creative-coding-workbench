import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
  finalSize: number;
  startSteps: number;
}

let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  const startSize = width;
  ctx.lineWidth = settings.lineWidth;
  ctx.clearRect(1, 1, width, height);
  drawRect(0, 0, startSize, startSize, 1, 1, settings.startSteps);

  function drawRect(x: number, y: number, w: number, h: number, xm, ym, steps: number) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    if (steps >= 0) {
      const newSize = (startSize) * (steps / settings.startSteps) + settings.finalSize;
      let newX = x + (w - newSize) / 2;
      let newY = y + (h - newSize) / 2;
      newX = newX - ((x - newX) / (steps + 2)) * xm;
      newY = newY - ((y - newY) / (steps + 2)) * ym;
      drawRect(newX, newY, newSize, newSize, xm, ym, steps - 1);
    }
  }
}



export default new Sketch({
  name: "Squares",
  settings: { lineWidth: 1, finalSize: 10, startSteps: 5 } as ISettings,
  drawFunction: exampleFunction
});