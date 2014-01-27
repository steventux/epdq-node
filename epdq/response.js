var EPDQ = require('./../epdq'),
    qs = require('qs'),
    ShaCalculator = require('./sha_calculator');


var calculatedShaOut = function(params){
  return new ShaCalculator(params, EPDQ.config.shaOut, EPDQ.config.shaType).shaSignature();
};

var Response = function(queryString){
  var rawParameters = qs.parse(queryString);

  this.rawParameters = {};
  this.shasign = rawParameters['SHASIGN'];

  for (var key in rawParameters){
    if (key != 'SHASIGN'){
      this.rawParameters[key] = rawParameters[key];
    }
  }
};
Response.prototype.isValidShasign = function(){
  if (this.shasign == null || !this.shasign.length) {
    throw "missing or empty SHASIGN parameter";
  }
  return calculatedShaOut(this.rawParameters) == this.shasign;
};
Response.prototype.parameters = function(){
  var parameters = {};
  for (var key in this.rawParameters){
    parameters[key.toLowerCase()] = this.rawParameters[key];
  }
  return parameters;
};

module.exports = Response;
