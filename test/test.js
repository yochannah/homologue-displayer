var assert = require("assert"),
main = require('../js/main.js')


console.log("===");
describe('A test', function(){

  it('should pass',function() {
    assert("0" !== 0);
  });

});
console.log("Running tests at " + new Date().toString() + ":");
console.log("===");
