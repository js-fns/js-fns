# TinyFloat

TinyFloat is a tiny decimal class for JavaScript.

It solves the main problem with the IEEE 754 floats (the notorious `0.1 + 0.2 == 0.30000000000000004`) without implementing an arbitrary-precision type that is more accurate but also heavier.

TinyFloat is **just `0.5 kB`** and has no dependencies, while [`decimal.js`](https://github.com/MikeMcl/decimal.js) is `12.3 kB`. In most cases, including working with money, the precision provided by `decimal.js` is irrelevant, so TinyFloat is an excellent alternative.

## Installation

The library is available as an [npm package](https://www.npmjs.com/package/tinyfloat):

```bash
npm install tinyfloat --save
```

## Usage

The library exports the `TinyFloat` class, which you can use to create decimal numbers:

```ts
import { TinyFloat } from "tinyfloat";

new TinyFloat("0.1").add("0.2").toNumber();
//=> 0.3
```

You can also set the precision for the `TinyFloat` instance:

```ts
new TinyFloat("0.123456", 2).toNumber();
//=> 0.12

new TinyFloat("0.987654321", 2).toNumber();
//=> 0.99
```

## API

The `TinyFloat` class has basic arithmetic methods:

- `add` - adds two numbers
- `sub` - subtracts two numbers
- `mul` - multiplies two numbers
- `div` - divides two numbers
- `mod` - returns the remainder of the division

All methods accept strings, numbers, and TinyFloat instances:

```ts
new TinyFloat("0.1").add(new TinyFloat("0.2")).toNumber();
// Or pass a string:
new TinyFloat("0.1").add("0.2").toNumber();
// Or a number:
new TinyFloat(0.1).add(0.2).toNumber();
```

To convert a `TinyFloat` instance to a number, use the `toNumber` method:

```ts
new TinyFloat("0.1").add("0.2").toNumber();
//=> 0.3
```

To convert the `TinyFloat` instance to a string, use the `toString` method:

```ts
new TinyFloat("0.1").add("0.2").toString();
//=> "0.3000000000000000"
```

The method pads the number with zeros to the set precision (default is 16).

Both `toString` and `toNumber` accept custom precision, effectively rounding the number to the given number of digits after the decimal point:

```ts
const tf = new TinyFloat("1").div("1.5");
//=> 0.6666666666666667⁠​​​​​​

tf.toString(2);
//=> "0.67"

tf.toNumber(0);
//=> 1
```

## Benchmark

[The benchmark](./bench.pkg/bench.ts) shows that TinyFloat is significantly faster than other popular libraries for decimal arithmetic:

```
constructor:
┌─────────┬──────────────────┬───────────────────┐
│ (index) │ Package          │ ops/s             │
├─────────┼──────────────────┼───────────────────┤
│ 1       │ 'js-fns/decimal' │ '8,827,598 ± 658' │
│ 2       │ 'decimal.js'     │ '2,275,375 ± 337' │
│ 3       │ 'currency.js'    │ '1,486,164 ± 221' │
└─────────┴──────────────────┴───────────────────┘

add:
┌─────────┬──────────────────┬──────────────────────┐
│ (index) │ Package          │ ops/s                │
├─────────┼──────────────────┼──────────────────────┤
│ 1       │ 'js-fns/decimal' │ '28,600,927 ± 1,760' │
│ 2       │ 'decimal.js'     │ '4,668,185 ± 340'    │
│ 3       │ 'currency.js'    │ '2,974,226 ± 336'    │
└─────────┴──────────────────┴──────────────────────┘

sub:
┌─────────┬──────────────────┬──────────────────────┐
│ (index) │ Package          │ ops/s                │
├─────────┼──────────────────┼──────────────────────┤
│ 1       │ 'js-fns/decimal' │ '27,462,229 ± 1,662' │
│ 2       │ 'decimal.js'     │ '4,755,590 ± 444'    │
│ 3       │ 'currency.js'    │ '2,871,317 ± 298'    │
└─────────┴──────────────────┴──────────────────────┘

mul:
┌─────────┬──────────────────┬────────────────────┐
│ (index) │ Package          │ ops/s              │
├─────────┼──────────────────┼────────────────────┤
│ 1       │ 'js-fns/decimal' │ '11,876,129 ± 726' │
│ 2       │ 'decimal.js'     │ '4,215,538 ± 307'  │
│ 3       │ 'currency.js'    │ '2,373,658 ± 246'  │
└─────────┴──────────────────┴────────────────────┘

mod:
┌─────────┬──────────────────┬────────────────────┐
│ (index) │ Package          │ ops/s              │
├─────────┼──────────────────┼────────────────────┤
│ 1       │ 'js-fns/decimal' │ '20,779,011 ± 989' │
│ 2       │ 'decimal.js'     │ '1,749,248 ± 213'  │
└─────────┴──────────────────┴────────────────────┘
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
