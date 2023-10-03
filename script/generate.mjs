const URL = "https://www.unicode.org/Public/15.1.0/ucd/EastAsianWidth.txt";

const res = await fetch(URL);
const text = await res.text();
const lines = text.split("\n");
let prevStart;
let prevEnd;
let prevType;
const types = new Map();

const first = lines.shift();
console.log(first.replace(/^# (EastAsianWidth-.*)$/, "// $1"));
console.log("exports.data = [");

for (const line of lines) {
  const match = /^([0-9A-Z]+)(?:\.\.([0-9A-Z]+))?\s*;\s*(\w+)/.exec(line);
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

// output last line
outputLine(prevStart, prevEnd, prevType);
console.log("];");
const typesStr = JSON.stringify(Array.from(types.keys()));
console.log(`exports.types = ${typesStr};`);

function outputLine(start, end, type) {
  const typeId = getTypeId(type);
  if (end) {
    const diff = Number(`0x${end}`) - Number(`0x${start}`);
    console.log(`[${typeId}, 0x${start}, ${diff}],`);
  } else {
    console.log(`[${typeId}, 0x${start}],`);
  }
}

function getTypeId(type) {
  if (!types.has(type)) {
    types.set(type, types.size);
  }
  return types.get(type);
}
