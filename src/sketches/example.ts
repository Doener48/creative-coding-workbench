import { DrawFunc, Sketch } from "./model";

interface ISettings {
  randomColor: boolean;
}

let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
}

export default new Sketch({
  name: "Example",
  settings: { randomColor: true } as ISettings,
  drawFunction: exampleFunction
});