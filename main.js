(function() {
  var isPrototypeOf = function(prototype, object) {
    if (prototype === null || prototype === undefined) {
      throw new TypeError('Cannot read property \'isPrototypeOf\' of ' + prototype);
    }

    if (typeof prototype === 'number') {
      throw new SyntaxError('Uncaught SyntaxError: Invalid or unexpected token');
    }

    if (typeof object !== 'object') {
      return false;
    }

    if (prototype === object) {
      return true;
    }

    return isPrototypeOf(prototype, Object.getPrototypeOf(object));
  }

  window.isPrototypeOf = isPrototypeOf;

  tests({
    'If prototype is null or undefined, it should throw TypeError.': function() {
      try {
        isPrototypeOf(null, 1);
      } catch(e) {
        eq(e instanceof TypeError, true);
      }

      try {
        isPrototypeOf(undefined, 1);
      } catch(e) {
        eq(e instanceof TypeError, true);
      }
    },
    'If prototype is a number, it should show throw SyntaxError.': function() {
      try {
        isPrototypeOf(1, 2);
      } catch(e) {
        eq(e instanceof SyntaxError, true);
      }
    },
    'If prototype is not an object, it should return false.': function() {
      var object = {};
      eq(isPrototypeOf(object, 1), false);
    },
    'It should work as intended.': function() {
      var canine = {
        bark: function() {
          console.log('bark');
        }
      };
      var dog = Object.create(canine);
      eq(isPrototypeOf(canine, dog), true);
    },
    'It should work for any number of prototype chains.': function() {
      var canine = {
        bark: function() {
          console.log('bark');
        }
      };
      var dog = Object.create(canine);
      var myDog = Object.create(dog);
      eq(isPrototypeOf(canine, myDog), true);
    }
  });
})();
