import { DrawFunc, Sketch } from "./model";

let drawTrangularMesh: DrawFunc = (ctx, width, height, settings) => {
  ctx.clearRect(0, 0, width, height);
  let line;
  let lines = [];
  let gap = width / settings.spacing;
  let alternate = false;
  ctx.lineWidth = settings.lineWidth;

  let seededColor = settings.randomColor ? Math.floor(Math.random() * 360) : settings.seededColor;

  for (let y = gap / 2; y <= width; y += gap) {
    line = [];
    alternate = !alternate;
    for (let x = gap / 4; x <= width; x += gap) {
      line.push({
        x: x + (Math.random() * 0.8 - 0.4) * gap + (alternate ? gap / 2 : 0),
        y: y + (Math.random() * 0.8 - 0.4) * gap,
      });
    }
    lines.push(line);
  }

  let dotLine;
  alternate = true;

  function drawTriangle(pointA, pointB, pointC) {
    const shade = Math.floor(Math.random() * 80)+10;
    let currentColor = `hsl(${seededColor},${settings.saturation}%,${shade}%)`;

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.closePath();
    ctx.fillStyle = currentColor;
    if (settings.lineWidth > 0) {
      ctx.stroke();
    }
    ctx.fill();
  }

  for (let y = 0; y < lines.length - 1; y++) {
    alternate = !alternate;
    dotLine = [];
    for (let i = 0; i < lines[y].length; i++) {
      dotLine.push(alternate ? lines[y][i] : lines[y + 1][i]);
      dotLine.push(alternate ? lines[y + 1][i] : lines[y][i]);
    }
    for (let i = 0; i < dotLine.length - 2; i++) {
      drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
    }
  }
}

export default new Sketch({
  name: "TriangularMesh",
  settings: { spacing: 5, lineWidth: 0, randomColor: true, seededColor: 35, saturation: 90 },
  drawFunction: drawTrangularMesh
});