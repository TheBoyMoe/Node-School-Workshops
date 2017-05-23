'use strict';
const http = require('http');
const url = process.argv[2];

http.get(url, (res) => {
    let body = '';
    
    res.setEncoding('utf-8');
    
    res.on('error', (err) => {
        console.log(err.message);
    });
    
    res.on('data', (data) => {
        body += data;
    });
    
    res.on('end', () => {
        console.log(body.length);
        console.log(body);
    });
    
});