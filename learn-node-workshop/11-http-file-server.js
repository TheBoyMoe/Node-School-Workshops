'use strict';
const fs = require('fs');
const http = require('http');
const file = process.argv[3];
const listener = (req, res) => {
    // read the file from the filesystem, pass the the response obj
};


const server = http.createServer(listener);
server.listen(Number(process.argv[2]));