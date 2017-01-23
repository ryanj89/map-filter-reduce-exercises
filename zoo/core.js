var zoo = require('./data');

function entryCalculator (entrants) {
  return entrants ? Object.keys(entrants).reduce((total, person) => total + (entrants[person] * zoo.prices[person]), 0) : 0;
};

function schedule (dayName) {
  var days = Object.keys(zoo.hours);
  var weeklySchedule = days.reduce(getWeeklySchedule, {});

  if (dayName) {  // If day specified
    var dailySchedule = {};
    dailySchedule[dayName] = weeklySchedule[dayName];
    return dailySchedule;
  } else { // Otherwise, return weekly
    return weeklySchedule;
  }

  function getWeeklySchedule(schedule, day) {
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    } else {
      schedule[day] = 'Open from ' + zoo.hours[day].open + 'am until ' + (zoo.hours[day].close - 12) + 'pm';
    }
    return schedule;
  }
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
