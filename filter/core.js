function onlyEven (array) {
  var evenNumbers = array.filter(function(number) {
    if ((number % 2) === 0) {
      return number;
    }
  });
  return evenNumbers;
};

function onlyOneWord (array) {
  var oneWord = array.filter(function(string) {
    if (!string.includes(' ')) {
      return string;
    }
  });
  return oneWord;
};

function positiveRowsOnly (array) {
  var positiveRows = array.filter(function(item) {
    if (item.every(isPositive)) {
      return item;
    }
    function isPositive(element) {  // Check if each elemnt is positive
      if (element < 0) {
        return false;
      }
        return true;
    };
  });
  return positiveRows;
};

function allSameVowels (array) {
  var sameVowels = array.filter(function(item) {
    var regex = /[aeiou]/g;
    var vowels = item.match(regex);

    function isSameVowel(item) {
      return item;
    }
    return vowels.every(isSameVowel);
  });
  console.log(sameVowels);
  return sameVowels;
};

module.exports = {
  onlyEven: onlyEven,
  onlyOneWord: onlyOneWord,
  positiveRowsOnly: positiveRowsOnly,
  allSameVowels: allSameVowels
};
