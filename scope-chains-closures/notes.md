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
