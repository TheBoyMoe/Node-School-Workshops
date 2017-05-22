## Promises, what are they and how to use them.

A promise represents a value that may be available some time in the future - it simplifies the writing of asynchronous logic in js.

Traditional asynchronous code using callbacks, without error handling:

```javascript
Parse.User.logIn('user', 'pass', {
      success: function (user) {
        query.find({
          success: function (results) {
            results[0].save({ key: value }, {
              success: function (result) {
                // the object was saved
              }
            });
          }
        });
      }
    });
```

Example of a promise workflow including error handling:

```javascript
Parse.User.logIn('user', 'pass').then(function (user) {
      return query.find();
    }).then(function (results) {
      return results[0].save({ key: value });
    }).then(function (result) {
      // the object was saved
    }).catch(function (err) {
      // an error happened somewhere in the process
    });
````

A promise can have one of three states, fulfilled, rejected or pending (when a promise is waiting to be fulfilled or rejected).

Promises can be created with the new Promise(executor), the executor is a callback function which is passed two parameters, fulfill/resolve, reject (which are themselves callbacks). Either resolve or reject is called to indicate the outcome of the operation. A promise has a 'then' property function which is used to manipulate promises - it takes two optional callback parameters - onFulfilled (called if the promise is fulfilled) and onRejected (called if the promise is rejected). When the fulfill function is called in the executor with a value, this is passed along to onFulfilled which is called with this value. When a promise is rejected, the value is passed along to the onRejected callback which is called. onFulfilled and onRejected are optional, you could pass a second promise instead, so giving the ability to chain promises together.

```javascript
const promise = new Promise((fulfill, reject)=>{
    
}).then(
    (result) => { // onFulfilled function
        
    },
    (error) =>{ // onRejected function
    
});
```

```javascript
const login = (username, password) => {
    // do something with user & pass => retuning user obj if successful
    let user;
    return new Promise((fullfill, reject) => {
        if(!user) return reject(new Error('Unsuccessful login, check username and password'));
        fullfill(user);
    })
};

login('username', 'password')
    .then((user) => {
    
    }, (err) => {
    
    })

```

A promise once fulfilled or rejected may not change its state - one of the things that differentiates it from other callbacks. Callbacks are gnerally intended to be called once. However an error in logic, error in syntax or simple mistake could result in a callback being called multiple times.

Functions passed to the then method (onFulfilled, onRejected) will be called on the next turn of the event loop - ensures that promises are always resolved asynchronously

There are times when you only want to handle onRejected callbacks passed to then. Since onFulfilled is optional you could write:

```javascript
promise.then(null, (err) => {
    console.error(err.message);
}).catch((err) => console.log(err.message));
```

or more concisely:

```javascript
promise.catch((err) => console.error(err.message));
```

We also have two shorthand methods on Promise, .resolve() and .reject()

```javascript
const resolved = Promise.resolve('SUCCESS');
resolved.then((success) => console.log(success));
````

```javascript
const rejected = Promise.reject(new Error('FAILURE'));
rejected.catch((err) => console.error(err.message));
```

Promises all you to return another promise in the then function callbacks. This new promise will in turn be returned by then, e.g

```javascript
Parse.User.logIn('user', 'pass', {
      success: function (user) {
        query.find({
          success: function (results) {
            results[0].save({ key: value }, {
              success: function (result) {
                // the object was saved
              }
            });
          }
        });
      }
    });
```

can be simplified to:

```javascript
Parse.User.login('username', 'password')
    .then((user) => {
        return query.find();
    })
    .then((results) => {
        return results[0].save({key: value});
    })
    .then((result) => console.log(result))
    .catch((err) => console.error(err.message));
```


Since then may return promises or values allows you to wrap different behaviours (synchronous and asynchronous calls) into a promise, e.g you could search the local cache for a particular value synchronously, if not found you could make an asynchronous ajsx request to a remote server to fulfill the request.

```javascript
doSomeSetup()
    .then(() => {
        return cache.find(id) || asyncAjaxRequest('url', id);
    })
    .then((result) => {
        // do something, e.g display/save
    })
```

Wrapping this functionality in a promise means that both behaviours can be consumed under a single abstraction, the returned value will resolve on the next turn of the event loop.

Unlike callbacks, with promises you don't need to handle errors at every step. If an error occurs inside a function, it will be handled by the next available error handler. The error can be thrown at any point in the chain. This allows you to write promises in a try/catch block style seen in synchronous code.

When promises are chained, each expression is evaluated in order. If any throws an exception, the error will bubble up till caught by a catch block, or the global context where an error handler has not been defined. It is best practice when chaining promises to add the rejection handler to the end of the chain. One problem occurs should the rejection handler itself throw an error causing an uncaught exception. If you are NOT returning a value from the promise, then you can add a done handler following the exception handler to deal with this issue.

```javascript
doStuff()
    .then(doMoreStuff)
    .then(null, complainAboutJavascript)
    .done();
```


It is often useful to be able to execute multiple operations in parallel, and delay further processing until all these operations have completed, e.g create a function that takes a list of asynchronous values that we would like to fetch, once all the results are available, process them in some way.

```javascript
getAll(fetch(1), fetch(2))
      .then(function (values) {
        console.log(values[0], values[1]);
      });
```


With promises we have the Promise.all (takes an array of promises, executing them one after the other, only after all have been resolved is a result returned. If any are rejected the sequence is terminated) and Promise.race (returns the first promise to resolve, even if an exception is thrown).


Fetching JSON from remote servers is a common use case for implementing promises. As with promises, AJAX request may succeed or fail, never both. They thus map well to promises.