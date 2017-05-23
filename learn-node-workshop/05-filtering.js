'use strict';
const fs = require('fs');
let dir = process.argv[2];
let ext = '.' + process.argv[3];

fs.readdir(dir, (err, list) => {
    if(err) return console.log(err.message);
    for(let file of list){
        if(file.endsWith(ext)){
            console.log(file);
        }
    }
});