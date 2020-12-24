import type { Sketch } from "./model";
import triangularMesh from "./triangularMesh";
import unDeuxTrois from "./unDeuxTrois";
import mondrian from "./mondrian";
import example from "./example";

export const sketches: Sketch[] = [
  triangularMesh,
  mondrian,
  unDeuxTrois,
  example
];
