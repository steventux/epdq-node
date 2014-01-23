var crypto = require('crypto'),
    shasum = crypto.createHash('sha1');

var ShaCalculator = function(parameters, sha){
  this.sha = sha;
  this.parameters = {};
  var val;
  for(var key in parameters){
    val = parameters[key];
    if (val != null && val.length){
      this.parameters[key.toUpperCase()] = val;
    }
  }
}
ShaCalculator.prototype.shaSignature = function(){
  if (this.sha == null || !this.sha.length){
    throw "missing or empty sha parameter"
  }
  var buffer = '',
      sortedKeys = [];

  for(var key in this.parameters) { sortedKeys.push(key); }
  sortedKeys = sortedKeys.sort();

  var key,
      arrLen = sortedKeys.length;
  for(var idx = 0; idx < arrLen; idx++){
    key = sortedKeys[idx];
    buffer += key  + "=" + this.parameters[key] + this.sha;
  }

  shasum.update(buffer);
  return shasum.digest('hex').toUpperCase();
}

module.exports = ShaCalculator;