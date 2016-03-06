'use strict';

var HandDecoder = require('./handDecoder.js');
var HandOrganizer = require('./handOrganizer.js');
var HandCalculator = require('./handCalculator.js');

var testString = 'AC AD 7H 5D 5H';
var handDecoder = new HandDecoder();
var cardsArray = handDecoder.decodeCards(testString);
var handOrganizer = new HandOrganizer();
var handRecord = handOrganizer.convertToHandRecord(cardsArray);

console.log(handRecord);
