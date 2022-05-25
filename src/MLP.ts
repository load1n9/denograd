import { Layer } from "./Layer.ts";
import { Scalar } from "./Scalar.ts";

export class MLP {
  layers: Layer[] = [];
  constructor(nin: number, nouts: number[]) {
    const sz = [nin].concat(nouts);
    for (const i of nouts) {
      this.layers.push(new Layer(sz[i], sz[i + 1], i !== nouts.length - 1));
    }
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
