"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

let maxPair = 0;
let map = new Map();

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\n")
    .map((str) => str.replace(/\s*$/, ""));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const ar = readLine()
    .split(" ")
    .map((arTemp) => parseInt(arTemp, 10));

  let result = sockMerchant(n, ar);

  ws.write(result + "\n");

  ws.end();
}

/**
 * Returns maximum number of possible pairs from given array of colors.
 *
 * @param {number} n number of values in array.
 * @param {number} arr array of integer numbers.
 * @return {number} maximum number of possible pairs.
 */
function sockMerchant(n, arr) {
  arr.forEach((item, index, array) => {
    if (checkItemInMap(item)) {
      //
      //   console.log(`Item: ${item}, TRUE`);
      let value = map.get(item);
      value = value + 1;
      map.set(item, value);
    } else {
      //
      //   console.log(`Item: ${item}, FALSE`);
      map.set(item, 1);
    }
  });

  map.forEach((values, keys) => {
    // console.log(`Key: ${keys} => Value: ${values}`);

    if (values >= 1) {
      let pair = Math.floor(values / 2);
      maxPair += pair;
      // console.log(pair);
    }
  });

  // console.log(`Max Pair: ${maxPair}`);
  return maxPair;
}

/**
 * Returns status of the key if it is avilable in map or not.
 *
 * @param {number} item The color value as key.
 * @return {boolean} TRUE/FALSE respectively if key in map exists or not.
 */
function checkItemInMap(item) {
  if (map.has(item) == false) {
    return false;
  } else {
    return true;
  }
}
