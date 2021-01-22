import type { Sketch } from "./model";
import triangularMesh from "./triangularMesh";
import unDeuxTrois from "./unDeuxTrois";
import mondrian from "./mondrian";
import example from "./example";
import labyrinth from "./labyrinth";
import circles from "./circles";
import dots from "./dots";
import rotater from "./rotater";
import rotaterFib from "./rotaterFibonacci";
import squares from "./squares";

export const sketches: Sketch[] = [
  squares,
  rotaterFib,
  rotater,
  triangularMesh,
  labyrinth,
  mondrian,
  unDeuxTrois,
  dots,
  circles,
  example,
];
