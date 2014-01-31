var EPDQ = require('../epdq'),
    should = require('should');

describe("Response", function(){
  beforeEach(function(done){
    EPDQ.config.shaType = 'sha1';
    EPDQ.config.shaOut = "Mysecretsig1875!?"
    done();
  });

  it("should validate the shasign", function(){
    var queryString = "ACCEPTANCE=1234&AMOUNT=15.00&brand=VISA&CARDNO=xxxxxxxxxxxx1111&CURRENCY=EUR&ncerror=0&ORDERID=12&PAYID=32100123&PM=CreditCard&STATUS=9&SHASIGN=8DC2A769700CA4B3DF87FE8E3B6FD162D6F6A5FA",
        response = new EPDQ.Response(queryString);
    response.isValidShasign().should.be.ok;
  });

  it("should parse parmeters and key them in lowercase", function(){
    var queryString = "ACCEPTANCE=1234&AMOUNT=15.00&BRAND=VISA&CARDNO=xxxxxxxxxxxx1111&CURRENCY=EUR&NCERROR=0&ORDERID=12&PAYID=32100123&PM=CreditCard&STATUS=9&SHASIGN=8DC2A769700CA4B3DF87FE8E3B6FD162D6F6A5FA",
        response = new EPDQ.Response(queryString),
        parameters = response.parameters();

    parameters['acceptance'].should.equal('1234');
    parameters['amount'].should.equal('15.00');
    parameters['brand'].should.equal('VISA');
    parameters['cardno'].should.equal('xxxxxxxxxxxx1111');
    parameters['currency'].should.equal('EUR');
    parameters['ncerror'].should.equal('0');
    parameters['orderid'].should.equal('12');
    parameters['payid'].should.equal('32100123');
    parameters['pm'].should.equal('CreditCard');
    parameters['status'].should.equal('9');
  });
});
