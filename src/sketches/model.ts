export class Sketch implements ISketch {
  name: string;
  settings: any;
  drawFunction: DrawFunc;
  private functionParams: string[] = [];
  private functionBody: string;

  constructor(sketch: Partial<Sketch>) {
    Object.assign(this, sketch);
  }

  setDrawFunction(newFunctionString:string){
    this.functionParams = newFunctionString.substring(newFunctionString.indexOf('(') + 1, newFunctionString.indexOf(')')).split(',');
    this.functionBody = newFunctionString.substring(newFunctionString.indexOf('{') + 1, newFunctionString.lastIndexOf('}'));
    this.drawFunction = new Function(...this.functionParams, this.functionBody) as DrawFunc;
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