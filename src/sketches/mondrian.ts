import { DrawFunc, Sketch } from "./model";

interface ISettings {
  steps: number;
  lineWidth: number;
  randomColor: boolean;
  bgColor: string;
  color1: string;
  color2: string;
  color3: string;
  colorLightness: number;
}

let mondrian: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = settings.lineWidth;

  const step = width / settings.steps;

  const squares: { x: number, y: number, w: number, h: number, color?: string }[] = [{
    x: 0,
    y: 0,
    w: width,
    h: height
  }]

  function splitSquaresWith(coordinates) {
    const { x, y } = coordinates;

    for (var i = squares.length - 1; i >= 0; i--) {
      const square = squares[i];

      if (x && x > square.x && x < square.x + square.w) {
        if (Math.random() > 0.5) {
          squares.splice(i, 1);
          splitOnX(square, x);
        }
      }

      if (y && y > square.y && y < square.y + square.h) {
        if (Math.random() > 0.5) {
          squares.splice(i, 1);
          splitOnY(square, y);
        }
      }
    }
  }

  function splitOnX(square, splitAt) {
    var squareA = {
      x: square.x,
      y: square.y,
      w: square.w - (square.w - splitAt + square.x),
      h: square.h
    };

    var squareB = {
      x: splitAt,
      y: square.y,
      w: square.w - splitAt + square.x,
      h: square.h
    };

    squares.push(squareA);
    squares.push(squareB);
  }

  function splitOnY(square, splitAt) {
    var squareA = {
      x: square.x,
      y: square.y,
      w: square.w,
      h: square.h - (square.h - splitAt + square.y)
    };

    var squareB = {
      x: square.x,
      y: splitAt,
      w: square.w,
      h: square.h - splitAt + square.y
    };

    squares.push(squareA);
    squares.push(squareB);
  }

  for (let i = 0; i < width; i += step) {
    splitSquaresWith({ y: i });
    splitSquaresWith({ x: i });
  }

  function draw() {
    const colors = [];
    if(settings.randomColor){
      const baseColor = Math.floor(Math.random()*361);
      // const colorLightness = Math.floor(Math.random()*50)+25;
      colors.push(`hsl(${baseColor-120},100%,${settings.colorLightness}%)`);
      colors.push(`hsl(${baseColor},100%,${settings.colorLightness}%)`);
      colors.push(`hsl(${baseColor+120},100%,${settings.colorLightness}%)`);
    }else{
      colors.push(settings.color1,settings.color2, settings.color3); 
    }
    for (var i = 0; i < colors.length; i++) {
      squares[Math.floor(Math.random() * squares.length)].color = colors[i];
    }
    for (var i = 0; i < squares.length; i++) {
      ctx.beginPath();
      ctx.rect(
        squares[i].x,
        squares[i].y,
        squares[i].w,
        squares[i].h
      );
      if (squares[i].color) {
        ctx.fillStyle = squares[i].color;
      } else {
        ctx.fillStyle = settings.bgColor
      }
      ctx.fill()
      ctx.stroke();
    }
  }

  draw();
}


export default new Sketch({
  name: "Mondrian",
  settings: {
    randomColor: true,
    colorLightness: 80,
    bgColor: '#F2F5F1',
    color1: '#D40920',
    color2: '#1356A2',
    color3: '#F7D842',
    lineWidth: 8,
    steps: 6,
  },
  drawFunction: mondrian
});