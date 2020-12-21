export class Sketch implements ISketch{
  name: string;
  settings: any;
  drawFunction: DrawFunc;

  constructor(sketch: Sketch){
    Object.assign(this,sketch);
  }
}

export interface ISketch{
  name:string,
  settings:any;
  drawFunction: DrawFunc
}

export interface DrawFunc {
  (ctx:CanvasRenderingContext2D, width:number, height:number, settings:any): void;
}