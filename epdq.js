var Request = require('epdq/request'),
    Response = require('epdq/response');

var EPDQ = (function(){
  var testMode = false,
      shaIn,
      shaOut,
      pspId;

  return {
    // Export Request and Response classes in the EPDQ namespace.
    Request : Request,
    Response : Response,

    // Module accessors/mutators
    setTestMode : function(_testMode){
      testMode = _testMode;
    },
    isTestMode : function(){
      return testMode;
    },
    setShaIn : function(_shaIn){
      shaIn = _shaIn;
    },
    getShaIn : function(){
      return shaIn;
    },
    setShaOut : function(_shaOut){
      shaOut = _shaOut;
    },
    getShaOut : function(){
      return shaOut;
    },
    setPspId : function(_pspId){
      pspId = _pspId;
    },
    getPspId : function(){
      return pspId;
    }
  }
})();

module.exports = EPDQ;
