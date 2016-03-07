'use strict';

var StringDecoder = require('./stringDecoder.js');
var PokerHandOrganizer = require('./pokerHandOrganizer.js');
var PokerHandCalculator = require('./pokerHandCalculator.js');

module.exports = PokerHandRanker;

function PokerHandRanker () {
  this._stringDecoder = new StringDecoder();
  this._pokerHandOrganizer = new PokerHandOrganizer();
  this._pokerHandCalculator = new PokerHandCalculator();
}

PokerHandRanker.prototype.computeRanking = function(pokerHandString) {
  var cardsArray = this._stringDecoder.convertToCards(pokerHandString);
  var pokerHandRecord = this._pokerHandOrganizer.convertToPokerHandRecord(cardsArray);
  var pokerHandScore = this._pokerHandCalculator.scorePokerHand(pokerHandRecord);
  var pokerRankingArray = pokerHandScore.printToArray();

  return pokerRankingArray;
}
