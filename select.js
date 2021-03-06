var fs = require('fs');
var where = require('./where');
var data = require('./data');
var output = require('./output');


function print(selection, filter, sortFuncArr) {
  var dataObj = data.load();

  if (filter !== null) {
    dataObj = dataObj.filter(filter);
  }
  if (sortFuncArr !== null) {
    sortFuncArr.forEach(function(sortFunc) {
      dataObj = dataObj.sort(sortFunc);
    });
  }

  output.print(dataObj);
}


function spec2Sort(specArr) {
  return specArr.map(function(spec) {
    return function(people, peopleAnother) {
      if (spec[1].toUpperCase() === 'ASC')
        return people[spec[0]] - peopleAnother[spec[0]];
      if (spec[1].toUpperCase() === 'DESC')
        return peopleAnother[spec[0]] - people[spec[0]];
    }
  });
}


function select(ast) {
  var filter = ast.clause.where === null ? null : where.condition2Filter(ast.clause.where);
  var sort = ast.clause.orderBy === null ? null : spec2Sort(ast.clause.orderBy);

  print(ast.selection, filter, sort);
}

module.exports = select;
