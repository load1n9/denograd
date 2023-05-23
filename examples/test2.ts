import { Neuron, Scalar } from "../mod.ts";

const n = new Neuron(2);
const x = [new Scalar(1.0), new Scalar(-2.0)];
const y = n.call(x);
y.backward();

console.log(y.value);
