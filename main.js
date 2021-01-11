(function() {
  var isPrototypeOf = function(prototype, object) {
    if (prototype === null || prototype === undefined) {
      throw new TypeError('Cannot read property \'isPrototypeOf\' of ' + prototype);
    }

    if (typeof prototype === 'number') {
      throw new SyntaxError('Uncaught SyntaxError: Invalid or unexpected token');
    }

    if (typeof object !== 'object' && typeof object !== 'function') {
      return false;
    }

    if (prototype === object) {
      return true;
    }

    try {
      object = Object.getPrototypeOf(object);
      return isPrototypeOf(prototype, object);
    } catch (e) {
      return false;
    }
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
    'If \'typeof\' object is not equal to \'object\' or \`function, it should return false.': function() {
      eq(isPrototypeOf(Object.prototype, 1), false);
      eq(isPrototypeOf(Object.prototype, '2'), false);
      eq(isPrototypeOf(Object.prototype, true), false);
    },
    'If \'typeof\' object is equal to \'object\', it should return true.': function() {
      eq(isPrototypeOf(Object.prototype, {}), true);
    },
    'If \'typeof\' object is equal to \'function\', it should return true.': function() {
      eq(isPrototypeOf(Object.prototype, function() {}), true);
    },
    'It should work as intended.': function() {
      var canine = {
        bark: function() {
          console.log('bark');
        }
      };
      var dog = Object.create(canine);
      eq(isPrototypeOf(canine, dog), true);

      var empty = Object.create(null);
      eq(isPrototypeOf(dog, empty), false);
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
