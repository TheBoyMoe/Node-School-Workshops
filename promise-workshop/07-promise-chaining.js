'use strict';

/*
    var originalPromise = Parse.User.logIn('user', 'pass');
    
    var findPromise = originalPromise.then(function (user) {
        // At this point, you have logged in.
        
        // query.find() returns another promise, which will become `findPromise`
        return query.find();
    });
    
    var savePromise = findPromise.then(function (results) {
        // At this point, the query finding is done.
        
        // The promise returned by `save` will become `savePromise`
        return results[0].save({ key: value });
    });
    
    savePromise.then(function (result) {
        // the object was saved
    });
    
    // can be simplified to:
    
    Parse.User.logIn('user', 'pass')
        .then(function (user) {
            return query.find();
        })
        .then(function (results) {
            return results[0].save({ key: value });
        })
        .then(function (result) {
            // the object was saved
        });

*/
// FAILS
const first = () => Promise.resolve('SECRET VALUE');

first().then(second).then(console.log);

const third = () => Promise.reject('FAILED!');

third().catch(console.error);

