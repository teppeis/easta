'use strict';

const readline = require('readline');
const fetch = require('node-fetch');

const URL = 'https://www.unicode.org/Public/11.0.0/ucd/EastAsianWidth.txt';

fetch(URL)
  .then(res => readline.createInterface({input: res.body}))
  .then(lines => {
    let n = 0;
    let prevStart;
    let prevEnd;
    let prevType;
    lines.on('line', line => {
      if (n === 0) {
        console.log(line.replace(/^# (EastAsianWidth-.*)$/, '// $1'));
        console.log('exports.data = [');
      } else {
        const match = /^([0-9A-Z]+)(?:\.\.([0-9A-Z]+))?;(\w+)/.exec(line);
        if (match) {
          const [, start, end, type] = match;
          if (
            type === prevType &&
            ((prevEnd && Number(`0x${prevEnd}`) + 1 === Number(`0x${start}`)) ||
              (!prevEnd && Number(`0x${prevStart}`) + 1 === Number(`0x${start}`)))
          ) {
            // concat this line with previous line
            if (end) {
              prevEnd = end;
            } else {
              prevEnd = start;
            }
          } else {
            if (prevStart) {
              // output previous line
              outputLine(prevStart, prevEnd, prevType);
            }
            [prevStart, prevEnd, prevType] = [start, end, type];
          }
        }
      }
      n++;
    });
    lines.on('close', () => {
      // output last line
      outputLine(prevStart, prevEnd, prevType);
      console.log('];');
      const typesStr = JSON.stringify(Array.from(types.keys()));
      console.log(`exports.types = ${typesStr};`);
    });
  });

function outputLine(start, end, type) {
  const typeId = getTypeId(type);
  if (end) {
    const diff = Number(`0x${end}`) - Number(`0x${start}`);
    console.log(`[${typeId}, 0x${start}, ${diff}],`);
  } else {
    console.log(`[${typeId}, 0x${start}],`);
  }
}

const types = new Map();

function getTypeId(type) {
  if (!types.has(type)) {
    types.set(type, types.size);
  }
  return types.get(type);
}
