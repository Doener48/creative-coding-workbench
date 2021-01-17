import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
}

let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineWidth = settings.lineWidth;
  ctx.lineTo(width, height);
  ctx.moveTo(width, 0);
  ctx.lineTo(0, height);
  ctx.stroke();
}

export default new Sketch({
  name: "Example",
  settings: { lineWidth: 5 } as ISettings,
  drawFunction: exampleFunction
});