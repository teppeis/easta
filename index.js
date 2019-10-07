"use strict";

const assert = require("assert");
const { data, types } = require("./generated-data.min");

assert(data.length > 0);
assert(types.length > 0);

/**
 * @param {string} char
 * @return {string} W|Na|F|H|A|N
 */
function easta(char) {
  assert(char.length > 0);

  const cp = char.codePointAt(0);
  let left = 0;
  let right = data.length - 1;
  while (left <= right) {
    const middle = Math.floor(left + (right - left) / 2);
    const range = data[middle];
    if (cp < range[1]) {
      right = middle - 1;
      continue;
    } else {
      let end = range[1];
      if (range.length === 3) {
        end = range[1] + range[2];
      }
      if (cp > end) {
        left = middle + 1;
        continue;
      } else {
        const type = types[range[0]];
        if (!type) {
          new Error(`Unexpected type: ${range[0]}`);
        }
        return type;
      }
    }
  }
  return "N";
}

module.exports = easta;
