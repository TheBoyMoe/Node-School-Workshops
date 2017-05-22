'use strict';

const attachTitle = (firstArg) => {
    return `DR. ${firstArg}`;
};

const promise = Promise.resolve('MANHATTAN');

promise.then(attachTitle)
    .then((result) => console.log(result));


/*
    Promise.resolve('MANHATTAN')
        .then(attachTitle)
        .then(console.log);

 */