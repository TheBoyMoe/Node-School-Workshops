'use strict';

const promise1 = new Promise((resolve, reject)=>{
    reject(new Error('Error thrown!'));
});

promise1.then(null, (err)=>{
    console.error('using a 2nd parameter to then', err.message);
});

// OR
promise1.catch((err) => console.error('using a catch block', err.message));

// ALSO
const promise2 = Promise.resolve('PROMISE SUCCESS');
promise2.then((success) => console.log(success));

// AND
const promise3 = Promise.reject(new Error('PROMISE FAILURE'));
promise3.catch((err) => console.error(err.message));
