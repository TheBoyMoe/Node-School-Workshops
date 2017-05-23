'use strict';
const fs = require('fs');
let array = [];
const folderFilter = (dir, ext, callback) => {
    fs.readdir(dir, (err, list) => {
        if(err) {
            callback(err);
        }
        else {
            for (let file of list) {
                if (file.endsWith('.' + ext)) {
                    array.push(file);
                }
            }
            callback(null, array);
        }
        
    })
};

module.exports = folderFilter;



