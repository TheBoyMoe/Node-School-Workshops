### Node Basics

#### Command Line Arguments
Can be accessed via the argv property of the global process, which returns an array of the items. When iterating of the array to retrieve the elements entered always start at the 3rd. The first element of the array is always 'node', the second is always the path to the program file. Also, all items in the array are strings, either prefix each with '+' to coerce to a number or use the Number() method, e.g Number(process.arvg[2]).
 
#### Using Synchronous file system operations
The fs module is req'd to perform filesystem operations. Part of the Node core library, it can be loaded using a require statement. All methods ending in 'Sync' are synchronous(blocking) methods, e.g 

```javascript
fs.readFileSync('path/to/file');
```

returns a buffer object of the file contents (whether the file is text, binary or some other format), convert to a string using toString() method.


#### Using Asynchronous file system operations
Use the fs.readFile() method and return the value using a callback
 
```javascript
fs.readFile('path/to/file', (err, data) => {
    if(err) return console.error(err.message)
    // do something with result
})
```

If you pass 'utf-8' as the second argument, making the callback the third the data recieved will be a string instead of a buffer.

Idiomatic node callbacks usually have the following signature:

```javascript
function callback(err, data) {
    // check if error is truthy, otherwise process data
}
```

#### Reading file directories
The fs.readdir() method takes a pathname as its first argument and a callback as its second. The callback signature is:

```javascript
function callback(err, list) {
    // do more
}
```


#### http client and simple get requests
Made using the .get() method. Takes two arguments, 1st is the url, the second is a callback. The callback takes one argument, a response object, which is a Node Stream object. Node Streams can be treated as objects that emit events. The 'data', 'error' and 'end' events are of most interest, e.g.


```javascript
response.on('error', (err) => {
        console.log('Error collecting data', err.message);
    }); 
```

The 'data' event is emitted when a chunk of data is available and can be processed, the size of the chunk depending on the underlying data source. The node stream emitted by the data event is a buffer which needs to converted to a string using the JSON.parse() method. Alternatively, the response object has a setEncoding() method which if you pass 'utf-8' will cause the 'data' event to emit a string.
