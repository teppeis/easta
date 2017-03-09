'use strict';

const readline = require('readline');
const fetch = require('node-fetch');

const URL = 'http://www.unicode.org/Public/9.0.0/ucd/EastAsianWidth.txt';

fetch(URL)
  .then(res => readline.createInterface({input: res.body}))
  .then(lines => {
    let n = 0;
    lines.on('line', line => {
      if (n === 0) {
        console.log(`'use strict';`);
        console.log(line.replace(/^# (EastAsianWidth-.*)$/, '// $1'));
        console.log('module.exports = [');
      } else {
        const match = /^([0-9A-Z]+)(?:\.\.([0-9A-Z]+))?;(\w+)/.exec(line);
        if (match) {
          const [, start, end, type] = match;
          if (end) {
            console.log(`['${type}', 0x${start}, 0x${end}],`);
          } else {
            console.log(`['${type}', 0x${start}],`);
          }
        }
      }
      n++;
    });
    lines.on('close', () => {
      console.log('];');
    });
  });
