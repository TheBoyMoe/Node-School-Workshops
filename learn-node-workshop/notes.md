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

