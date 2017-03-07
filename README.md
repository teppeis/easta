easta
====

# Usage

```js
const easta = require('easta');

assert(easta('A') === 'Na'); // Narrow
assert(easta('Ａ') === 'F'); // Fullwidth
assert(easta('あ') === 'W'); // Wide
assert(easta('ｱ') === 'H'); // Halfwidth
assert(easta('α') === 'A'); // Ambiguous
assert(easta('À') === 'N'); // Neutral
```

