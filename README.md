# DenoGrad

## Toy AutoGrad Implementation in Deno. DO NOT USE

### Maintainers

- Loading ([@load1n9](https://github.com/load1n9))

### Usage

```typescript
import { Scalar } from "https://crux.land/2KCiqA";

const a = new Scalar(1.5);
const b = new Scalar(-4.0);
const c = a.pow(3).div(5);
const d = c.add((b.pow(2)).relu());

d.backward();

console.log(d.value); // 16.675
```
