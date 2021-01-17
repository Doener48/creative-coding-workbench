import type { Sketch } from "./model";
import triangularMesh from "./triangularMesh";
import unDeuxTrois from "./unDeuxTrois";
import mondrian from "./mondrian";
import example from "./example";
import labyrinth from "./labyrinth";
import circles from "./circles";
import dots from "./dots";

export const sketches: Sketch[] = [
  triangularMesh,
  labyrinth,
  mondrian,
  unDeuxTrois,
  dots,
  circles,
  example,
];
