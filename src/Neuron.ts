import { Scalar } from "./Scalar.ts";
import { randomUniform } from "./utils.ts";

export class Neuron {
  w: Scalar[] = [];
  b = new Scalar(0);
  constructor(nin: number, public nonLinear = true) {
    for (let i = 0; i < nin; i++) {
      this.w.push(new Scalar(randomUniform(-1, 1)));
    }
  }
  call(x: Scalar[] | number[]) {
    const act = this.w.reduce(
      (acc, curr, i) => Scalar.add(acc, curr).mul(x[i]),
      this.b,
    );
    return this.nonLinear ? act.relu() : act;
  }
  parameters() {
    return this.w.concat(this.b);
  }
}
