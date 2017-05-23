'use strict';
let folderFilter = require('./folder-filter');

folderFilter(process.argv[2], process.argv[3], (err, array) => {
    if(err) return console.log(err);
    for(let file of array) {
        console.log(file);
    }
});