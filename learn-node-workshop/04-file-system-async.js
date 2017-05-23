'use strict';
const fs = require('fs');
fs.readFile(process.argv[2], 'utf-8', (err, data) => {
    if(err) return console.log(err.message);
    let numOfLines = data.split('\n').length - 1;
    console.log(numOfLines);
});