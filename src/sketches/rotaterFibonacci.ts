import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
  space: number;
  offset: number;
}
let currentRotation = 0;
let last = 1;
let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.lineWidth = settings.lineWidth;
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(currentRotation * Math.PI / 180);

  const radius = last+1;
  ctx.beginPath();
  // ctx.rect(settings.offset,settings.offset,radius,radius);
  ctx.arc(settings.offset,settings.offset,radius,0,360);
  ctx.stroke();
  
  ctx.restore();
  last = radius;
  currentRotation += settings.space;
}

export default new Sketch({
  name: "RotaterChange",
  settings: { lineWidth: 1, space: 10, offset: 50 } as ISettings,
  drawFunction: exampleFunction
});