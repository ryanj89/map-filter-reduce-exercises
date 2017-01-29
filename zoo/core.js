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
  var animalCount = zoo.animals.reduce(function(animalCount, animal) {
    animalCount[animal.name] = animal.residents.length;
    return animalCount;
  }, {});
  return species ? animalCount[species] : animalCount;
};

function animalMap (options) {
    return zoo.animals.reduce(function(animalMap, animal) {
      if (!options) {
        animalMap[animal.location].push(animal.name);
      } else if (options.includeNames) {
        var animalObj = {};
        var animalNames = [];
        animal.residents.forEach(function(eachAnimal) {
          animalNames.push(eachAnimal.name);
        });
        animalObj[animal.name] = animalNames;
        animalMap[animal.location].push(animalObj);
      } else if (options.sex) {
        var filterAnimals = animal.residents.filter(function(eachAnimal) {
          if (eachAnimal.sex === options.sex) {
            return eachAnimal.sex;
          }
        });

      }

      return animalMap;
    }, { 'NE': [], 'NW': [], 'SE': [], 'SW': [] });
};

function animalPopularity (rating) {
  var animalPopularity = zoo.animals.reduce(function(popularity, animal) {
    popularity[animal.popularity].push(animal.name);
    return popularity;
  }, { '2': [], '3': [], '4': [], '5': [] });

  if (rating) {
    return animalPopularity[rating];
  }

  return animalPopularity;
};

function animalsByIds (ids) {
  var animalsByIds = [];
  if (ids) {
    zoo.animals.filter(function(animal) {
      if (ids.includes(animal.id)) {
        animalsByIds.push(animal);
      }
    });
  }
  return animalsByIds;
};

function animalByName (animalName) {
  var animalByName = { };
  if (animalName) {
    zoo.animals.filter(function(animal) {
      animal.residents.forEach(function(eachAnimal) {
        if (eachAnimal.name === animalName) {
          animalByName = eachAnimal;
        }
      });
      animalByName['species'] = animal.name;
    });
  }
  return animalByName;
};

function employeesByIds (ids) {
  var employeesByIds = [ ];
  if (ids) {
    zoo.employees.filter(function(employee) {
      if (ids.includes(employee.id)) {
        employeesByIds.push(employee);
      }
    });
  }
  return employeesByIds;
};

function employeeByName (employeeName) {
  var employeeByName = { };
  if (employeeName) {
    zoo.employees.filter(function(employee) {
      if (employeeName === employee.firstName || employeeName === employee.lastName) {
        employeeByName = employee;
      }
    });
  }
  return employeeByName;
};

function managersForEmployee (idOrName) {
  // If search by ID
  if (idOrName.match(/\d/)) {
    var employee = employeesByIds(idOrName)[0];
    var managers = employeesByIds(employee.managers);
  } else {
    var employee = employeeByName(idOrName);
    var managers = employeesByIds(employee.managers);
  }
  var managerName = [ ];
  managers.forEach(function(manager) {
    managerName.push(manager.firstName + " " + manager.lastName);
  });
  employee.managers = managerName;
  return employee;
};

function employeeCoverage (idOrName) {
  var employeeCoverage = { };

  if (!idOrName) {  // Empty parameter
    zoo.employees.forEach(function(employee) {
      var employeeName = employee.firstName + " " + employee.lastName;
      var animalCoverage = [ ];
      employee.responsibleFor.forEach(function(id) {
        animalCoverage.push(animalsByIds(id)[0].name);
      });
      employeeCoverage[employeeName] = animalCoverage;
    });
    return employeeCoverage;
  }

  if (idOrName.match(/\d/)) { // Get employee by name or ID
    var employee = employeesByIds(idOrName)[0];
  } else {
    var employee = employeeByName(idOrName);
  }

  var animalCoverage = [ ];
  var employeeName = employee.firstName + " " + employee.lastName;

  employee.responsibleFor.forEach(function(id) {
    animalCoverage.push(animalsByIds(id)[0].name);
  });
  employeeCoverage[employeeName] = animalCoverage;
  
  return employeeCoverage;
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
