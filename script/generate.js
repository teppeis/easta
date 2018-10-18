'use strict';

const readline = require('readline');
const fetch = require('node-fetch');

const URL = 'http://www.unicode.org/Public/11.0.0/ucd/EastAsianWidth.txt';

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
        console.log(`'use strict';`);
        console.log('module.exports = [');
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
    });
  });

function outputLine(start, end, type) {
  if (end) {
    console.log(`['${type}', 0x${start}, 0x${end}],`);
  } else {
    console.log(`['${type}', 0x${start}],`);
  }
}
