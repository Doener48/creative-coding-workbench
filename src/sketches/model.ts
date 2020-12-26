export class Sketch implements ISketch {
  name: string;
  settings: any;
  drawFunction: DrawFunc;

  constructor(sketch: Partial<Sketch>) {
    Object.assign(this, sketch);
  }

  getExportJSON(){
    return JSON.stringify({... this},null, '  ');
  }
}

export interface ISketch {
  name: string;
  settings: any;
  drawFunction: DrawFunc;
}

export interface DrawFunc {
  (ctx: CanvasRenderingContext2D, width: number, height: number, settings: any): void;
}