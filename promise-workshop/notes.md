## What is a promise?

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



##  Do I HAVE to return promises?

No! Fulfillment handlers may return promises or values. Your Promises
library will do the correct thing and wrap your return value in a promise if
need be. This is awesome because it allows you to intermix values with
promises in a chain.

Imagine that you have a cache of models that may already contain a model you
would like to request from the server. You could check your cache
synchronously and return the found value or send an AJAX request to your
remote server to fetch it.

Wrapping this functionality in a promise means that both behaviors can be
consumed under a single abstraction:

```javascript
doSomeSetup()
      .then(function () {
        return cache.fetchModel(id) || promisedAjax("users/" + id);
      })
      .then(displayUser)
```

The key thing to understand here is that your handlers will wrap your
return values in promises even if they are obtained synchronously.

Another very important point to understand is that, as discussed before, the
returned value will resolve on the next turn of the event loop.
