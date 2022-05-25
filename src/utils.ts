import { Tensor } from "./Tensor.ts";

export const randomUniform = (min: number, max: number) =>
  Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min),
  );
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

export const RandMat = (n: number, d: number, mu: number, std: number) => {
  const m = new Tensor(n, d);
  fillRandn(m, mu, std);
  return m;
};
export const fillRandn = (w: Tensor, mu: number, std: number) => {
  for (let i = 0, n = w.out.length; i < n; i++) w.out[i] = randn(mu, std);
};
