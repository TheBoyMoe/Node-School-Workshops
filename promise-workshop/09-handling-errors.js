'use strict';

const parsePromised = (json) => {
    return new Promise((fulfill, reject) => {
        try{
            fulfill(JSON.parse(json));
        } catch(e) {
            reject(e);
        }
    })
};


parsePromised(process.argv[2])
    .catch(console.log);

// parsePromised(process.argv[2])
//     .then(
//         (result) => console.log(result),
//         (err) => console.log(err));

