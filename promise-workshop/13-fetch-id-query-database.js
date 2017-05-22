'use strict';
const http = require('q-io/http');
const cache = 'http://localhost:7000';
const dbase = 'http://localhost:7001';
const fetchIdPromise = http.read(cache);

fetchIdPromise
    .then((id) => {
        return http.read(`${dbase}/${id}`);
    })
    .then((user) => {
        console.log(JSON.parse(user));
    })
    .then(null, console.error)
    .done();



/*
    OR
 
 var qhttp = require('q-io/http');
 
 qhttp.read("http://localhost:7000/")
     .then(function (id) {
     return qhttp.read("http://localhost:7001/" + id);
 })
 .then(function (json) {
     console.log(JSON.parse(json));
 })
 .then(null, console.error)
 .done();
 
 */