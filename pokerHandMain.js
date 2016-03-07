'use strict';

var StringDecoder = require('./stringDecoder.js');
var PokerHandOrganizer = require('./pokerHandOrganizer.js');
var PokerHandCalculator = require('./pokerHandCalculator.js');

var testString = 'AC AD 7H 5D 5H';
var stringDecoder = new StringDecoder();
var cardsArray = stringDecoder.convertToCards(testString);
var pokerHandOrganizer = new PokerHandOrganizer();
var pokerHandRecord = pokerHandOrganizer.convertToPokerHandRecord(cardsArray);
var pokerHandCalculator = new PokerHandCalculator();
var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

console.log(pokerHandScore);
