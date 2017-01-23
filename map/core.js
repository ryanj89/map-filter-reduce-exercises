function multiplyBy10 (array) {

  var result = array.map(function (number) {
    return number * 10;
  });
  return result;
};

function shiftRight (array) {
  var result = array.map(function(element, index, collection) {
    if (index === 0) {
      return collection[collection.length - 1]; // Return last item
    } else {
      return collection[index - 1];
    }
  });
  return result;
};

function onlyVowels (array) {
  var result = array.map(function(element) {
    var vowels = element.split('').filter(function(letter) {
      switch (letter) {
        case 'a':
          return letter;
          break;
        case 'e':
          return letter;
          break;
        case 'i':
          return letter;
          break;
        case 'o':
          return letter;
          break;
        case 'u':
          return letter;
          break;
        default:

      }
    });
    return vowels.join('');
  });
  return result;
};

function doubleMatrix (array) {
  return array.map(function(element) {
    return element.map(number => number * 2);
  });
};

module.exports = {
  multiplyBy10: multiplyBy10,
  shiftRight: shiftRight,
  onlyVowels: onlyVowels,
  doubleMatrix: doubleMatrix
};
