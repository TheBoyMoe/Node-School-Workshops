'use strict';

const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('FULFILLED!');
        reject('FAILED');
    }, 300)
});

promise.then(
    (result) => console.log(result),
    (err) => console.error(err)
);
