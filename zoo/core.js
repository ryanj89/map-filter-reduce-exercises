var zoo = require('./data');

function entryCalculator (entrants) {
  return entrants ? Object.keys(entrants).reduce((total, person) => total + (entrants[person] * zoo.prices[person]), 0) : 0;
};

function schedule (dayName) {
  // your code here
};

function animalCount (species) {
  // your code here
};

function animalMap (options) {
  // your code here
};

function animalPopularity (rating) {
  // your code here
};

function animalsByIds (ids) {
  // your code here
};

function animalByName (animalName) {
  // your code here
};

function employeesByIds (ids) {
  // your code here
};

function employeeByName (employeeName) {
  // your code here
};

function managersForEmployee (idOrName) {
  // your code here
};

function employeeCoverage (idOrName) {
  // your code here
};


module.exports = {
  entryCalculator: entryCalculator,
  schedule: schedule,
  animalCount: animalCount,
  animalMap: animalMap,
  animalPopularity: animalPopularity,
  animalsByIds: animalsByIds,
  animalByName: animalByName,
  employeesByIds: employeesByIds,
  employeeByName: employeeByName,
  managersForEmployee: managersForEmployee,
  employeeCoverage: employeeCoverage
}
