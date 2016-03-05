'use strict';

var HandDecoder = require('./handDecoder.js');

var testString = 'AC AD 7H 5D 5H';
var handDecoder = new HandDecoder();
var cardsArray = handDecoder.decodeCards(testString);

console.log(cardsArray);
