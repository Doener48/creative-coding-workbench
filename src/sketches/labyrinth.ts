import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
  stepSize: number;
}

let drawfunc: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = settings.lineWidth;
  ctx.lineCap = 'square';
  ctx.beginPath();
  for (let x = 0; x < width; x+=settings.stepSize) {
    for (let y = 0; y < width; y+=settings.stepSize) {
      const turn = Math.random() >= 0.5;
      if(turn){
        ctx.moveTo(x, y);
        ctx.lineTo(x+settings.stepSize,y+settings.stepSize);
      }
      else{
        ctx.moveTo(x+settings.stepSize, y);
        ctx.lineTo(x,y+settings.stepSize);
      }
      ctx.stroke();
    } 
  }
}

export default new Sketch({
  name: "labyrinth",
  settings: { lineWidth: 5,stepSize:30 } as ISettings,
  drawFunction: drawfunc
});