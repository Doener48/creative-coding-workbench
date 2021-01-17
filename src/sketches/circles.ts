import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
  minRadius: number;
  maxRadius: number;
  totalCircles: number;
  createCircleAttempts: number;
}
let drawfunc: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = settings.lineWidth;
  let circles = [];
  for (let i = 0; i < settings.totalCircles; i++) {
    createAndDrawCircle();
  }
  function createAndDrawCircle() {
    let newCircle;

    let circleSafeToDraw = false;
    for (let tries = 0; tries < settings.createCircleAttempts; tries++) {
      newCircle = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        radius: settings.minRadius
      }

      if (doesCircleHaveACollision(newCircle)) {
        continue;
      } else {
        circleSafeToDraw = true;
        break;
      }
    }

    if (!circleSafeToDraw) {
      return;
    }

    for (let size = settings.minRadius; size < settings.maxRadius; size++) {
      newCircle.radius = size;
      if (doesCircleHaveACollision(newCircle)) {
        newCircle.radius--;
        break;
      }
    }

    circles.push(newCircle);
    ctx.beginPath();
    ctx.arc(newCircle.x, newCircle.y, newCircle.radius, 0, Math.PI * 2);
    ctx.stroke()
  }

  function doesCircleHaveACollision(circle) {
    for (let i = 0; i < circles.length; i++) {
      const otherCircle = circles[i];
      const a = circle.radius + otherCircle.radius;
      const x = circle.x - otherCircle.x;
      const y = circle.y - otherCircle.y;

      if (a >= Math.sqrt((x * x) + (y * y))) {
        return true;
      }
    }
    if(circle.x + circle.radius >= width ||
      circle.x - circle.radius <= 0) {
     return true;
   }
     
   if(circle.y + circle.radius >= height ||
       circle.y - circle.radius <= 0) {
     return true;
   }
    return false;
  }
}


export default new Sketch({
  name: "circles",
  settings: {
    lineWidth: 3,
    minRadius: 2,
    maxRadius: 100,
    totalCircles: 500,
    createCircleAttempts: 500
  } as ISettings,
  drawFunction: drawfunc
});