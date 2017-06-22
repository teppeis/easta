easta
====

[Unicode East Asian Width data](http://www.unicode.org/reports/tr11/) for Node.js

[![npm version][npm-image]][npm-url]
![Node.js Version Support][node-version]
[![build status][travis-image]][travis-url]
[![dependency status][deps-image]][deps-url]
![License][license]

Based on [EastAsianWidth-10.0.0](http://www.unicode.org/Public/10.0.0/ucd/EastAsianWidth.txt).

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

- 2.0.0: update for Unicode 10.0.0
- 1.0.1: fix document
- 1.0.0: initial release (based on Unicode 9.0.0)

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://img.shields.io/npm/v/easta.svg
[npm-url]: https://npmjs.org/package/easta
[npm-downloads-image]: https://img.shields.io/npm/dm/easta.svg
[travis-image]: https://img.shields.io/travis/teppeis/easta/master.svg
[travis-url]: https://travis-ci.org/teppeis/easta
[deps-image]: https://img.shields.io/david/teppeis/easta.svg
[deps-url]: https://david-dm.org/teppeis/easta
[node-version]: https://img.shields.io/badge/Node.js%20support-v4,v6,v7-brightgreen.svg
[coverage-image]: https://img.shields.io/coveralls/teppeis/easta/master.svg
[coverage-url]: https://coveralls.io/github/teppeis/easta?branch=master
[license]: https://img.shields.io/npm/l/easta.svg
