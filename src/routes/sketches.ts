import { Sketch } from "./sketch";

export const sketches = [
  new Sketch({ name: "UnDeuxTrois", settings: { step: 150 }, drawFunction: drawUnDeuxTrois }),
  new Sketch({
    name: "TriangularMesh",
    settings: { spacing: 20 },
    drawFunction: drawTrangularMesh
  }),
];


function drawTrangularMesh(ctx, width, height, settings) {
  ctx.clearRect(0, 0, width, height);
  let line;
  let lines = [];
  let gap = width / settings.spacing;
  let alternate = false;

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
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.closePath();
    let gray = Math.floor(Math.random() * 16).toString(16);
    ctx.fillStyle = "#" + gray + gray + gray;
    ctx.stroke();
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

function drawUnDeuxTrois(ctx: CanvasRenderingContext2D, width, height, settings: { step: number }) {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  const aThirdOfHeight = height / 3;

  function draw(x, y, w, h, pos) {
    ctx.save();
    ctx.translate(x + width/2, y + height/2);
    ctx.rotate(Math.random() * 5);
    ctx.translate(-width/2, -height/2);
    for (let i = 0; i < pos.length; i++) {
      ctx.beginPath();
      ctx.moveTo(pos[i] * w, 0);
      ctx.lineTo(pos[i] * w, h);
      ctx.stroke();
    }
    ctx.restore();
  }

  for (var y = settings.step; y < height - settings.step; y += settings.step) {
    for (var x = settings.step; x < width - settings.step; x += settings.step) {
      if(y < aThirdOfHeight) {
        draw(x, y, settings.step, settings.step, [0.5]);   
      } else if(y < aThirdOfHeight * 2) {
        draw(x, y, settings.step, settings.step, [0.2, 0.8]);      
      } else {
        draw(x, y, settings.step, settings.step, [0.1, 0.5, 0.9]);      
      }
    }
  }
}