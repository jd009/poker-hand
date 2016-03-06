'use strict';

var PokerHandRecord = require('./pokerHandRecord.js');

module.exports = PokerHandOrganizer;

function PokerHandOrganizer () {}

PokerHandOrganizer.prototype.convertToPokerHandRecord = function (cardsArray) {
  var pokerHandRecord = new PokerHandRecord();
  cardsArray.forEach(function(card) {
    pokerHandRecord.saveCard(card);
  });

  return pokerHandRecord;
};

