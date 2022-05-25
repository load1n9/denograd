export class Scalar {
  grad = 0;
  grad_wrt = new Map();
  constructor(
    public value: number,
    public parents: Scalar[] = [],
    public parent_op: string | null = null,
  ) {}

  add(other: Scalar | number): Scalar {
    other = other instanceof Scalar ? other : new Scalar(other);
    const output = new Scalar(this.value + other.value, [this, other], "+");
    output.grad_wrt.set(this, 1);
    output.grad_wrt.set(other, 1);
    return output;
  }
  static add(scalar1: Scalar, scalar2: Scalar | number): Scalar {
    return scalar1.add(scalar2);
  }
  sub(other: Scalar | number): Scalar {
    other = other instanceof Scalar ? other : new Scalar(other);
    const output = new Scalar(this.value - other.value, [this, other], "-");
    output.grad_wrt.set(this, 1);
    output.grad_wrt.set(other, -1);
    return output;
  }
  static sub(scalar1: Scalar, scalar2: Scalar | number): Scalar {
    return scalar1.sub(scalar2);
  }
  mul(other: Scalar | number): Scalar {
    other = other instanceof Scalar ? other : new Scalar(other);
    const output = new Scalar(this.value * other.value, [this, other], "*");
    output.grad_wrt.set(this, other.value);
    output.grad_wrt.set(other, this.value);
    return output;
  }
  static mul(scalar1: Scalar, scalar2: Scalar | number): Scalar {
    return scalar1.mul(scalar2);
  }
  div(other: Scalar | number): Scalar {
    other = other instanceof Scalar ? other : new Scalar(other);
    const output = new Scalar(this.value / other.value, [this, other], "/");
    output.grad_wrt.set(this, 1 / other.value);
    output.grad_wrt.set(other, -this.value / other.value ** 2);
    return output;
  }
  static div(scalar1: Scalar, scalar2: Scalar | number): Scalar {
    return scalar1.div(scalar2);
  }
  pow(other: number): Scalar {
    const output = new Scalar(this.value ** other, [this], `^${other}`);
    output.grad_wrt.set(this, other * this.value ** (other - 1));
    return output;
  }
  static pow(scalar1: Scalar, exponent: number): Scalar {
    return scalar1.pow(exponent);
  }
  neg() {
    return this.mul(-1);
  }
  static neg(scalar: Scalar): Scalar {
    return scalar.neg();
  }
  relu() {
    const output = new Scalar(Math.max(0, this.value), [this], "relu");
    output.grad_wrt.set(this, this.value > 0 ? 1 : 0);
    return output;
  }
  static relu(scalar: Scalar): Scalar {
    return scalar.relu();
  }
  backward() {
    let orderer: Scalar[] = [];
    const visited = new Set();
    const topological_order = () => {
      const add_parents = (node: Scalar) => {
        if (visited.has(node)) return;
        visited.add(node);
        node.parents.forEach(add_parents);
        orderer.push(node);
      };
      add_parents(this);
      return orderer;
    };
    const compute_grad_of_parents = (node: Scalar) => {
      for (const parent of node.parents) {
        const output_node = node.grad;
        const node_parent = node.grad_wrt.get(parent);
        parent.grad += node_parent * output_node;
      }
    };
    this.grad = 1;
    orderer = topological_order().reverse();
    orderer.forEach(compute_grad_of_parents);
  }
}
