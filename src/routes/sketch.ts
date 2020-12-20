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

interface DrawFunc {
  (ctx, width:number, height:number, settings:any): void;
}