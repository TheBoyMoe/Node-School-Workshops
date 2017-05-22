'use strict';
const url = 'http://localhost:1337';
const http = require('q-io/http');
const promise = http.read(url);

promise
    .then((result) => {
        console.log(JSON.parse(result.toString()));
    })
    .catch(console.log);



/* OR
 
 var qhttp = require('q-io/http');
 
 qhttp.read("http://localhost:1337")
     .then(function (json) {
        console.log(JSON.parse(json));
     })
     .then(null, console.error)
     .done()

 */