import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
  radius: number;
  amountPoints: number;
  connectorOffset: number;
  showPoints: boolean;
}

let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = settings.lineWidth;
  const centerX = width/2;
  const centerY = height/2;
  ctx.moveTo(centerX, centerY);
  const interval = 360/settings.amountPoints;
  const points = [];
  for (let i = 0; i < 360; i+=interval) {
    var radians = i * Math.PI/180;
    var x = centerX + settings.radius * Math.cos(radians);
    var y = centerX + settings.radius * Math.sin(radians);
    points.push({x:x,y:y});
  }
  ctx.beginPath();
  ctx.arc(centerX,centerY,settings.radius,0,Math.PI*2);
  ctx.stroke();
  if(settings.showPoints){
    points.forEach(p => {
      ctx.beginPath();
      ctx.ellipse(p.x,p.y,3,3,0,0,360);
      ctx.fill();
    });
  }
  for (let i = 0; i < points.length; i++) {
    ctx.beginPath();
    ctx.moveTo(points[i].x,points[i].y);
    const topointindex = (i+settings.connectorOffset) % points.length;
    ctx.lineTo(points[topointindex].x,points[topointindex].y);
    ctx.stroke();
  }
}

export default new Sketch({
  name: "Dots",
  settings: { lineWidth: 2, radius:100, amountPoints: 60, connectorOffset: 20, showPoints: true } as ISettings,
  drawFunction: exampleFunction
});