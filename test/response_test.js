var EPDQ = require('../epdq'),
    Response = require('../epdq/response'),
    should = require('should');

describe("Response", function(){
  beforeEach(function(done){
    EPDQ.config.shaOut = "Mysecretsig1875!?"
    done();
  });
  it("should validate the shasign", function(){
    var queryString = "ACCEPTANCE=1234&AMOUNT=15.00&brand=VISA&CARDNO=xxxxxxxxxxxx1111&CURRENCY=EUR&ncerror=0&ORDERID=12&PAYID=32100123&PM=CreditCard&STATUS=9&SHASIGN=8DC2A769700CA4B3DF87FE8E3B6FD162D6F6A5FA",
        response = new Response(queryString);
    response.isValidShasign().should.be.ok;
  });
});
