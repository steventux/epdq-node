var EPDQ = require('./../epdq'),
    ShaCalculator = require('./sha_calculator'),
    TEST_URL = "https://mdepayments.epdq.co.uk/ncol/test/orderstandard.asp",
    LIVE_URL = "https://payments.epdq.co.uk/ncol/prod/orderstandard.asp";

var Request = function(parameters){
  this.config = EPDQ.config;
  this.parameters = parameters;

  this.getFullParameters = function(){
    var fullParams = {};
    for(var key in this.parameters){
      fullParams[key] = this.parameters[key].toString();
    }
    fullParams['pspid'] = this.config.pspId;
    return fullParams;
  };
};
Request.prototype.shaSign = function(){
  var shaCalculator = new ShaCalculator(this.getFullParameters(), this.config.shaIn, this.config.shaType);
  return shaCalculator.shaSignature();
};
 Request.prototype.formAttributes = function(){
  var val,
      formAttrs = {},
      fullAttrs = this.getFullParameters();

  for(var key in fullAttrs){
    val = fullAttrs[key];
    if(val.length){
      formAttrs[key.toUpperCase()] = val.toString();
    }
  }

  formAttrs["SHASIGN"] = this.shaSign();

  return formAttrs;
};
Request.prototype.requestUrl = function(){
  return this.config.testMode ? TEST_URL : LIVE_URL;
};

module.exports = Request;
