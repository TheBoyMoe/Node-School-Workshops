/*
    References:
    [1] http://mikelam.azurewebsites.net/how-to-make-synchronous-http-requests-in-node-js/
 */
'use strict';

const http = require('http');
const urls = process.argv.slice(2);
let body = [];

const chainRequests = (urls) => {
    let url = urls.shift();
    
    http.get(url, (res) => {
        let dataChunk = '';
        
        res.setEncoding('utf-8');
        
        res.on('error', (err) => {
            console.log(err.message);
        });
        
        res.on('data', (data) => {
            dataChunk += data;
        });
        
        res.on('end', () => {
            body.push(dataChunk);
            if(urls.length) {
                chainRequests(urls);
            } else {
                for(let str of body){
                    console.log(str);
                }
            }
        });
        
    });
    
};

chainRequests(urls);