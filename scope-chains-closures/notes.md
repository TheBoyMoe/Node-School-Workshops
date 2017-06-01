### Lexical Scope

var is used to denote a variable which is Lexically Scoped to the current
function:

```javascript
    function someFunc() {
      var aVariable;
    }
```

aVariable is lexically scoped within someFunc

### Block Scope

let & const are used to denote variables which are Block Scoped to the
current curly braced block:

```javascript
    if (true) {
      let aVariable;
    }
```

aVariable is block scoped within the if's curly braces

### Nesting Scopes

Both lexical and block scopes can be nested, contain other scopes. A lexical scope can contain other lexical scopes, block scopes can contain other block scopes. Lexical scope can contain block scopes
 
 ```javascript
    function someFunc() {
          if (true) {
          }
        }
```

All nested scopes follow the same rules with regards to accessing variables: Each nested scope has access to outer scope variables, but NOT vice versa. Where you have multiple nested scopes which are siblings, they have access to outer scope variables, but NOT to each other's variables.

Remembering that inner scopes can access outer scopes, and not vide versa, it makes sense to start at the inner most scope and work your way out - creates a scope chain.


### Global Scope

All JS runtimes create a global object/scope - 'window' in browsers, 'global' in node, which sits at the top of the scope chain. When declaring a variable without var, let or const it is assumed to exist on the global object - in 'sloppy mode'.

In 'sloppy mode', the javascript runtime follows these steps to assign a variable:

 1) Search within the current scope.
 2) If not found, search in the immediately outer scope.
 3) If found, go to 6.
 4) If not found, repeat 2. Until the Global Scope is reached.
 5) If not found in Global Scope, create it (on window / global objects).
 6) Assign the value.


```javascript
    function someFunc() {
           var scopedVar = 1;
           function inner() {
              foo = 2;
           }
        }
```

In the above example the Javascript runtime will follow the above algorithm, first checking the scope of inner(), then of someFunc(), then finally the Global Scope. Step 5 is then executed, so foo becomes a variable in the Global Scope (window.foo / global.foo).

In 'strict mode' foo will throw a ReferenceError since it's not created in the global scope.


```javascript
    function someFunc() {
           var foo = 1;
        }
        function anotherFunc() {
           var foo = 2;
        }
```

It is perfectly valid to define two different variables, in different scopes, with the same name using either let or var.


```javascript
    function someFunc() {
           let foo = 1;
           function inner() {
              let foo = 2;
           }
        }
```

The above example works when defining variables using var or let. Called 'Shadowing', The inner() scope only has access to its own foo. There is no way for it to access the foo defined in someFunc(). This can also be an accidental source of bugs, especially when there is deep nesting, or long functions.


### Closures

Provide the mechanism for callbacks and asynchronous calls in js and node.

```javascript
    function someFunc(){
	    var bar = 3;
	    
	    function someOtherFunc(){
	    	return bar;
	    }
	    
	    return someOtherFunc;
    }
```

Because someOtherFunc() can access 'bar', it's referred to as a closure, having access to bar long after someFunc() has executed and been removed from the execution stack. This feature enables the callback style of programming. It is perfectly acceptable to pass someOtherFunc to anther function and return 'bar' at some later point, 'bar' will still be available.


### Garbage Collection

Memory in js is managed automatically by the runtime, which decides when to release allocated memory. Most js run times use a variation of the 'Mark & Sweep' algorithm to determine when to remove particular values/objects from memory. Any value/object not referenced, reachable from active code, is removed from memory - swept into 'garbage'.

When the closure, someOtherFunc, is returned from someFunc, it maintains a reference to the bar variable and hence will not be garbage collected, and the reference to bar will exist while the closure exists. This means it can be passed around and called later. Once it's been executed and the value of bar is no longer referenced it too will be garbage collected.


In this challenge, you will be required to use Chrome DevTools for detecting
Garbage Collection events. Follow these steps to get a feel for what happens
when Chrome performs its Mark & Sweep algorithm:

1)  Fire up a new tab in Chrome
2)  Open the DevTools > Timeline tab
3)  Ensure the settings are like so: http://i.imgur.com/RMovIw4.png
  a) Frames View is unselected (allows seeing memory graphs)
  b) Flame Chart View is selected (allows seeing where execution time is spent)
  c) Only "Memory" is selected from the options
4)  Click the solid gray record button to begin capturing data
5)  Visit http://www.stackoverflow.com (or your favourite website)
6)  Click the now-red record button to stop capturing data
7)  You should now see something similar to: http://i.imgur.com/ZCNMrI1.png
8)  The part we're interested in is when memory suddenly drops:
    http://i.imgur.com/FyMyRVI.png
9)  Click this drop in memory to select it
10) Now look for the yellow event called "GC Event": http://i.imgur.com/3ieSxIZ.png
11) Clicking this event will reveal information about total memory garbage
    collected, and how long it took.

One particularly interesting thing of note here is the length of time Garbage
Collection can take: Often well beyond the 16ms maximum required to keep it
within a single frame (at 60fps). While garbage collection occurs, it blocks the
main thread, which means other Javascript cannot be executed until the event
completes. Be conscious of how janky your application may become due to
extensive Garbage Collection events!
