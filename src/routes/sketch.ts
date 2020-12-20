export class Sketch{
  name: string;
  settings:any;
  drawFunction: string;

  constructor(sketch: Sketch){
    Object.assign(this,sketch);
  }
}

