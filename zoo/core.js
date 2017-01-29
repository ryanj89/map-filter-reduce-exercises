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
  function formatInfo(species) {
    if ( !options || !options.includeNames ) { return species.name; }

    var animalName = species.name;
    var result = { };
    result[animalName] = species.residents;

    if (options.sex) {
      result[animalName] = result[animalName].filter(function(resident) {
        return resident.sex === options.sex;
      });
    }

    result[animalName] = result[animalName].map(function(animal) {
      return animal.name;
    });

    return result;
  }

  return zoo.animals.reduce(function(result, species) {
    var speciesInfo = formatInfo(species);

    if (result[species.location]) {
      result[species.location].push(speciesInfo);
    } else {
      result[species.location] = [speciesInfo];
    }

    return result;
  }, { } );
    // return zoo.animals.reduce(function(animalMap, animal) {
    //   if (!options) {
    //     animalMap[animal.location].push(animal.name);
    //   } else if (options.includeNames) {
    //     var animalObj = {};
    //     var animalNames = [];
    //     animal.residents.forEach(function(eachAnimal) {
    //       animalNames.push(eachAnimal.name);
    //     });
    //     animalObj[animal.name] = animalNames;
    //     animalMap[animal.location].push(animalObj);
    //   } else if (options.sex) {
    //     var filterAnimals = animal.residents.filter(function(eachAnimal) {
    //       if (eachAnimal.sex === options.sex) {
    //         return eachAnimal.sex;
    //       }
    //     });
    //
    //   }
    //
    //   return animalMap;
    // }, { 'NE': [], 'NW': [], 'SE': [], 'SW': [] });
};
// function animalMap (options) {
//     return zoo.animals.reduce(function(animalMap, animal) {
//       if (!options) {
//         animalMap[animal.location].push(animal.name);
//       } else if (options.includeNames) {
//         var animalObj = {};
//         var animalNames = [];
//         animal.residents.forEach(function(eachAnimal) {
//           animalNames.push(eachAnimal.name);
//         });
//         animalObj[animal.name] = animalNames;
//         animalMap[animal.location].push(animalObj);
//       } else if (options.sex) {
//         var filterAnimals = animal.residents.filter(function(eachAnimal) {
//           if (eachAnimal.sex === options.sex) {
//             return eachAnimal.sex;
//           }
//         });
//
//       }
//
//       return animalMap;
//     }, { 'NE': [], 'NW': [], 'SE': [], 'SW': [] });
// };

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
  var employee = idOrName.match(/\d/) ?
                  employeesByIds(idOrName)[0] :
                  employeeByName(idOrName);
  var managers = employeesByIds(employee.managers);

  employee.managers = managers.map( manager => manager.firstName + " " + manager.lastName);
  return employee;
};

function employeeCoverage (idOrName) {
  var employeeCoverage = { };

  if (!idOrName) {  // Empty parameter
    zoo.employees.forEach(function(employee) {
      employeeCoverage[getFullName(employee)] = employee.responsibleFor.map( id => animalsByIds(id)[0].name );
    });
    return employeeCoverage;
  } else if (idOrName.match(/\d/)) { // Get employee by ID
    var employee = employeesByIds(idOrName)[0];
  } else {  // Get employee by Name
    var employee = employeeByName(idOrName);
  }

  employeeCoverage[getFullName(employee)] = employee.responsibleFor.map( id => animalsByIds(id)[0].name );

  function getFullName(employee) {
    return employee.firstName + " " + employee.lastName;
  }
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
