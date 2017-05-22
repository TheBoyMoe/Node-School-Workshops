'use strict';

const all = (promise1, promise2) => {
    
    return new Promise((fulfill, reject) => {
        let counter = 0;
        let array = [];
    
        promise1.then((result) => {
            counter++;
            array.push(result);
            if(counter >= 2)
                fulfill(array);
        });
        
        promise2.then((result) => {
            counter++;
            array.push(result);
            if(counter >= 2)
                fulfill(array);
        });
        
    })
};

all(getPromise1(), getPromise2())
    .then(console.log);