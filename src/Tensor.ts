import { fillRandn, zeros } from "./utils.ts";
export class Matrix {
  n: number;
  d: number;
  out: Float64Array | never[];
  dout: Float64Array | never[];
  constructor(n: number, d: number) {
    this.n = n;
    this.d = d;
    this.out = zeros(n * d);
    this.dout = zeros(n * d);
  }
}

export class Tensor {
  n: number;
  d: number;
  out: Float64Array | number[];
  // deno-lint-ignore no-explicit-any
  out_tensor: any;
  dout: Float64Array | number[];
  require_grad: boolean;
  constructor(n: number, d: number, require_grad = true) {
    this.n = n;
    this.d = d;
    this.out = zeros(n * d);
    this.dout = zeros(n * d);
    this.require_grad = require_grad;
  }
  get(row: number, col: number) {
    return this.out[(this.d * row) + col];
  }
  set(row: number, col: number, v: number) {
    this.out[(this.d * row) + col] = v;
  }
  // deno-lint-ignore no-explicit-any
  setFrom(arr: any) {
    if (Array.isArray(arr[0])) {
      const n = arr.length;
      const d = arr[0].length;
      if (n * d == this.n * this.d) throw new Error("shape not compatible");

      const out = [];

      for (let i = 0; i < arr.length; i++) {
        out.push(...arr[i]);
      }
      this.out = out;
      this.out_tensor = arr;
    } else {
      if (arr.length == this.n * this.d) {
        throw new Error("shape not compatible");
      }
      for (let i = 0, n = arr.length; i < n; i++) {
        this.out[i] = arr[i];
      }
    }
  }
  randn(mu: number, std: number) {
    fillRandn(this, mu, std);
    return this;
  }
  grad(grad: Float64Array | number[]) {
    this.dout = grad;
  }
  sigmoid() {
    const out = this.out;
    for (let i = 0, n = this.out.length; i < n; i++) {
      out[i] = 1 / (1 + Math.exp(-this.out[i]));
    }
    return out;
  }
}

export class AddTensor {
  x: Tensor;
  y: Tensor;
  items: Matrix;
  require_grad = true;
  // deno-lint-ignore no-explicit-any
  out: any;
  // deno-lint-ignore no-explicit-any
  dout: any;
  // deno-lint-ignore no-explicit-any
  n: any;
  // deno-lint-ignore no-explicit-any
  d: any;
  func_name: string;
  constructor(x: Tensor, y: Tensor) {
    this.items = new Matrix(1, x.out.length);
    for (let i = 0; i < x.out.length; i++) {
      this.items.out[i] = x.out[i] + y.out[i];
    }
    this.x = x;
    this.y = y;
    this.out = this.items.out;
    this.dout = this.items.dout;
    this.n = this.items.n;
    this.d = this.items.d;
    this.func_name = "<add>";
  }
  backward() {
    if (this.x.require_grad) {
      this.x.grad(this.dout);
    }

    if (this.y.require_grad) {
      this.y.grad(this.dout);
    }
  }
}
