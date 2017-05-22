'use strict';

const alwaysThrows = () => {
    throw new Error('OH NOES');
};

const iterate = (arg) => {
    console.log(arg);
    return ++arg;
};

Promise.resolve(iterate(1))
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(alwaysThrows)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .catch(console.log);