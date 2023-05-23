import { Scalar } from "../mod.ts";

const a = new Scalar(-4.0);
const b = new Scalar(2.0);

let c = a.add(b);
let d = a.mul(b.add(b)).pow(3);

c = c.add(c.add(new Scalar(1.0)));
c = c.add(new Scalar(1.0).add(c).add(a.mul(-1)));
d = d.add(d.mul(new Scalar(2.0)).add(b.add(a)).relu());
d = d.add(new Scalar(3.0).mul(d).add(b.sub(a)).relu());

const e = c.sub(d);
const f = e.pow(2.0);

let g = f.div(new Scalar(2.0));

g = g.add(new Scalar(10.0).div(f));
console.log(`${g.value}`);

g.backward();
console.log(`${a.value}`);
console.log(`${b.grad}`);
