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
  this._pokerHandOrganizer.saveCards(cardsArray);
  var pokerHandScore = this._pokerHandCalculator.scorePokerHand(this._pokerHandOrganizer);
  var pokerRankingArray = pokerHandScore.printToArray();

  return pokerRankingArray;
}
