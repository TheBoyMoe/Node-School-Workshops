'use strict';

const onReject = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject(new Error('REJECTED!'));
    }, 300)
});

onReject.then(
    (result) => console.log('Success!'),
    (err) => console.log(err.message)
);