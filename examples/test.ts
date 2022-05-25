import { Scalar } from "../mod.ts";

const a = new Scalar(1.5);
const b = new Scalar(-4.0);
const c = a.pow(3).div(5);
const d = c.add((b.pow(2)).relu());

d.backward();

console.log(d.value); // 16.675