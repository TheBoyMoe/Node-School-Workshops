'use strict';
const fs = require('fs');
let stringContents = fs.readFileSync(process.argv[2]).toString();
let numOfLines = stringContents.split('\n').length - 1;
console.log(numOfLines);