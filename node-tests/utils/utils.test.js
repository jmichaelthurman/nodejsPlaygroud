var utils = require('./utils.js');
var expect = require('expect');

it('should add two numbers',()=>{
  var results = utils.add(3,5);
  expect(results).toBe(8).toBeA('number');
  // if (results !== 8){
  //   throw new Error(`Expected sum of 8, but got ${results}`)
  // }
});

it('should square a number',()=>{
  var results = utils.square(5);

  expect(results).toBe(25).toBeA('number');
  // if(results !== 25){
  //   throw new Error(`Expected product of 25, but got ${results}`)
  // }
});

it('should set user object properties from fullName text', ()=>{
  user = {
    age: 27,
    pony: 'sorrell'
  };
  fullName = 'John Doe';
  var results = utils.setName(user,fullName);

  expect(results).toInclude({firstName: 'John', age:27});
});
