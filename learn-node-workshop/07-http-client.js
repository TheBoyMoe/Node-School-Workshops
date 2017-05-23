'use strict';
const http = require('http');
const url = process.argv[2];

http.get(url, (response) => {
    let body = '';
    response.setEncoding('utf-8');
    
    response.on('error', (err) => {
        console.log('Error collecting data', err.message);
    });
    
    response.on('data', (data) => {
        body += data + '\n';
    });
    
    response.on('end', () => {
        // let str = JSON.parse(body);
        console.log(body);
    });
    
});


/*
    OR
 
 http.get(process.argv[2], function (response) {
     response.setEncoding('utf8')
     response.on('data', console.log)
     response.on('error', console.error)
 }).on('error', console.error)
 

 
 */