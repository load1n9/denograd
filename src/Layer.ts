import { Neuron } from "./Neuron.ts";
import { Scalar } from "./Scalar.ts";

export class Layer {
  neurons: Neuron[] = [];
  constructor(nin: number, nout: number, nonLinear: boolean) {
    for (let i = 0; i < nout; i++) {
      this.neurons.push(new Neuron(nin, nonLinear));
    }
  }

  call(x: Scalar[] | number[] | Scalar) {
    if (x instanceof Scalar) {
      x = [x];
    }
    const output = this.neurons.map((neuron) => neuron.call(x as Scalar[]));
    return output.length === 1 ? output[0] : output;
  }

  get parameters() {
    return [...this.neurons.map((n) => n.parameters)];
  }
}
