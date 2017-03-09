'use strict';

const assert = require('assert');

/* eslint-disable no-magic-numbers */
const data = [
['N', 0x0000, 0x001F],
['Na', 0x0020],
['Na', 0x0021, 0x0023],
['Na', 0x0024],
['Na', 0x0025, 0x0027],
['Na', 0x0028],
['Na', 0x0029],
['Na', 0x002A],
['Na', 0x002B],
['Na', 0x002C],
['Na', 0x002D],
['Na', 0x002E, 0x002F],
['Na', 0x0030, 0x0039],
['Na', 0x003A, 0x003B],
['Na', 0x003C, 0x003E],
['Na', 0x003F, 0x0040],
['Na', 0x0041, 0x005A],
['N', 0x005A, 0x03B0],
['A', 0x03B1, 0x03C1],
['N', 0x03C2, 0x3040],
['W', 0x3041, 0x3096],
['N', 0x3097, 0xFF20],
['F', 0xFF21, 0xFF3A],
['N', 0xFF3B, 0xFF70],
['H', 0xFF71, 0xFF9D],
];

/**
 * @param {string} char
 * @return {string} W|Na|F|H|A|N
 */
function easta(char) {
  assert(char.length > 0);
  assert(data.length > 0);

  const cp = char.codePointAt(0);
  let left = 0;
  let right = data.length - 1;
  while (left <= right) {
    const middle = Math.floor(left + (right - left) / 2);
    const range = data[middle];
    if (cp < range[1]) {
      right = middle - 1;
      continue;
    } else if (cp > range[range.length - 1]) {
      left = middle + 1;
      continue;
    } else {
      return range[0];
    }
  }
  return 'N';
}

module.exports = easta;
