'use strict';
const net = require('net'); // creating a TCP server

const zeroFill = (val) => {
    return (val < 10)? '0' + val: '' + val;
};

const listener = (socket) => {
    let now = new Date();
    let time = `${now.getFullYear()}-${zeroFill(now.getMonth() + 1)}-${zeroFill(now.getDate())} ${zeroFill(now.getHours())}:${zeroFill(now.getMinutes())}`;
    socket.end(time + '\n');
};

let server = net.createServer(listener);
server.listen(Number(process.argv[2])); // listen on supplied port
