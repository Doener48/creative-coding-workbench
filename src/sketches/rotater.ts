import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
  space: number;
  offset: number;
}
let currentRotation = 0;
let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.lineWidth = settings.lineWidth;
  ctx.save();
  ctx.translate(width/2,height/2);
  ctx.rotate(currentRotation * Math.PI / 180);
  
  // ctx.beginPath();
  // ctx.moveTo(settings.offset,settings.offset);
  // ctx.moveTo(settings.offset,settings.offset);
  // ctx.lineTo(settings.offset*2,settings.offset*2);
  // ctx.lineTo(settings.offset,settings.offset*2);
  // ctx.closePath();
  // ctx.stroke();

  ctx.beginPath();
  ctx.arc(settings.offset,settings.offset, settings.offset,0,360);
  ctx.stroke();

  // ctx.beginPath();
  // ctx.rect(settings.offset,settings.offset, settings.offset, settings.offset);
  // ctx.stroke();

  ctx.restore();
  currentRotation+=settings.space;
}

export default new Sketch({
  name: "Rotater",
  settings: { lineWidth: 1, space: 10, offset: 100 } as ISettings,
  drawFunction: exampleFunction
});