# easta

[Unicode East Asian Width data](http://www.unicode.org/reports/tr11/) for Node.js

[![npm version][npm-image]][npm-url]
![Node.js Version Support][node-version]
[![ci status][ci-image]][ci-url]
[![dependency status][deps-image]][deps-url]
![License][license]

Based on [EastAsianWidth-13.0.0](http://www.unicode.org/Public/13.0.0/ucd/EastAsianWidth.txt).

## Usage

```js
const easta = require('easta');

assert(easta('A') === 'Na'); // Narrow
assert(easta('Ａ') === 'F'); // Fullwidth
assert(easta('ア') === 'W'); // Wide
assert(easta('ｱ') === 'H'); // Halfwidth
assert(easta('α') === 'A'); // Ambiguous
assert(easta('À') === 'N'); // Neutral
```

## Changelog

- 5.0.0: update for Unicode 13.0.0, drop Node v8
- 4.0.0: update for Unicode 12.1.0, support for Node v12 and drop v6
- 3.0.1: reduce data size from 24KB to 13KB
- 3.0.0: update for Unicode 11.0.0, support for Node v10 and drop v4
- 2.0.0: update for Unicode 10.0.0, support for Node v8 and drop v7
- 1.0.1: fix document
- 1.0.0: initial release (based on Unicode 9.0.0)

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://img.shields.io/npm/v/easta.svg
[npm-url]: https://npmjs.org/package/easta
[npm-downloads-image]: https://img.shields.io/npm/dm/easta.svg
[ci-image]: https://github.com/teppeis/easta/workflows/ci/badge.svg
[ci-url]: https://github.com/teppeis/easta/actions?query=workflow%3Aci
[deps-image]: https://img.shields.io/david/teppeis/easta.svg
[deps-url]: https://david-dm.org/teppeis/easta
[node-version]: https://img.shields.io/badge/Node.js%20support-v12+-brightgreen.svg
[coverage-image]: https://img.shields.io/coveralls/teppeis/easta/master.svg
[coverage-url]: https://coveralls.io/github/teppeis/easta?branch=master
[license]: https://img.shields.io/npm/l/easta.svg
