import { Layer } from "./Layer.ts";
import { Scalar } from "./Scalar.ts";

export class MLP {
  layers: Layer[];
  constructor(nin: number, nouts: number[]) {
    this.layers = nouts.map((nout, i) =>
      new Layer(nin, nout, i !== nouts.length - 1)
    );
  }
  call(x: number[] | Scalar[] | Scalar) {
    for (const layer of this.layers) {
      x = layer.call(x);
    }
    return x;
  }
  parameters() {
    return [...this.layers.map((n) => n.parameters())];
  }
}
