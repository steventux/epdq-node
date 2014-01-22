var TEST_URL = "https://mdepayments.epdq.co.uk/ncol/test/orderstandard.asp";
var LIVE_URL = "https://payments.epdq.co.uk/ncol/prod/orderstandard.asp";

var Request = function(parameters){
  this.parameters = parameters;

  this.getFullParameters = function(){
    var fullParams = {};
    for(var key in this.parameters){
      fullParams[key] = this.parameters[key];
    }
    fullParams['pspid'] = EPDQ.getPspId();
    return fullParams;
  };
};
Request.prototype.shaSign = function(){
  // Initialise sha calculator
  // Return signature
};
Request.prototype.formAttributes = function(){
  // Return an associative array of KEY/value pairs
  // including sha signature
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
Request.protoype.requestUrl = function(){
  EPDQ.isTestMode() ? TEST_URL : LIVE_URL;
}

module.exports = Request;
