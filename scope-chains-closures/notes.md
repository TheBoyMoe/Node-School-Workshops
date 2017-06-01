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


