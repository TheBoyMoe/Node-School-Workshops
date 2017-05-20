'use strict';

const promise = new Promise((resolve, reject)=>{
    resolve('PROMISE VALUE');
});

// promises do not fire resolve/reject functions on the same turn of the
// event loop that they are create on, but the next, thus 'MAIN PROGRAM'
// will be printed first
promise.then(console.log);
console.log('MAIN PROGRAM');
