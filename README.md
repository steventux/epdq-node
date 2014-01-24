[![Build Status](https://travis-ci.org/steventux/epdq-node.png)](https://travis-ci.org/steventux/epdq-node)

# EPDQ

EPDQ is a node library for interfacing with Barclaycard's ePDQ payment gateway.

## Usage

First, configure the EPDQ module for your settings:

```
var EPDQ = require('epdq');

EPDQ.config.pspid  = "foo";
EPDQ.config.shaIn  = "yourshainstring";
EPDQ.config.shaOut = "yourshaoutstring";
```

Then you can build the form for a user to POST to, starting in the controller: All the options keys are named after the downcased fields in the [ePDQ documentation](https://mdepayments.epdq.co.uk/ncol/ePDQ_e-Com-ADV_EN.pdf), provided as strings.

```
var request = new Request({amount: 1500, currency: 'EUR', language: 'en_US', orderid: '1234'});
```

You can then generate a signature for the request.

```
var signature = request.shaSign(); // => 'F4CC376CD7A834D997B91598FA747825A238BE0A'
```

and generate form parameters including the required ePDQ configuration values for your views.

```
request.formAttributes();
```

## Tests

```
$ npm test
```
or more explicitly
```
$ mocha -R spec test/*
```
