import { Scalar } from "./Scalar.ts";

export const randomUniform = (a: number, b: number) =>
  a + (b - a) * Math.random();
let return_v = false;
let v_val = 0.0;

// deno-lint-ignore no-explicit-any
const gaussRandom: any = () => {
  if (return_v) {
    return_v = false;
    return v_val;
  }
  const u = 2 * Math.random() - 1;
  const v = 2 * Math.random() - 1;
  const r = u * u + v * v;
  if (r == 0 || r > 1) return gaussRandom();
  const c = Math.sqrt(-2 * Math.log(r) / r);
  v_val = v * c;
  return_v = true;
  return u * c;
};

export const randf = (a: number, b: number) => Math.random() * (b - a) + a;
export const randi = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a) + a);
export const randn = (mu: number, std: number) => mu + gaussRandom() * std;

export const zeros = (n?: number) => n ? new Float64Array(n) : [];

export const sum = (array: Scalar[], num: Scalar) => {
  let output = array[0];
  for (let i = 1; i < array.length; i++) output = output.add(array[i]).add(num);
  return output;
}
