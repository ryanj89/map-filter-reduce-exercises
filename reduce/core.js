function sum (array) {
  return array.reduce(function(total, number) {
    return total + number;
  }, 0);
};

function productAll (array) {
  return array.reduce(function(total, numbers) {
    var product = numbers.reduce(function(product, number) {
      return product * number;
    }, 1);
    return total * product;
  }, 1);
};

function objectify (array) {
  var results = array.reduce(function(obj, element) {
    obj[element[0]] = obj[element[0]] ? obj[element[0]] : element[1];
    // obj[element[0]] = obj[element[0]] || element[1];
    return obj;
  }, {});
  return results;
};

function luckyNumbers (array) {
  var results = array.reduce(function(total, element, index) {
    if (index === 0) { // first item
      return total + element;
    } else if (index === array.length - 1) { // last item
      return total + ', and ' + element;
    }
    return total + ', ' + element;
  }, ['Your lucky numbers are: ']);
  return results;
};

module.exports = {
  sum: sum,
  productAll: productAll,
  objectify: objectify,
  luckyNumbers: luckyNumbers
};
