'use strict';

var StringDecoder = require('./helpers/stringDecoder.js');
var PokerHandOrganizer = require('./helpers/pokerHandOrganizer.js');
var PokerHandCalculator = require('./helpers/pokerHandCalculator.js');

module.exports = PokerHandRanker;

function PokerHandRanker () {
  this._stringDecoder = new StringDecoder();
  this._pokerHandOrganizer = new PokerHandOrganizer();
  this._pokerHandCalculator = new PokerHandCalculator();
}

PokerHandRanker.prototype.computeRanking = function(pokerHandString) {
  var cardsArray = this._stringDecoder.convertToCards(pokerHandString);
  this._pokerHandOrganizer.storeCards(cardsArray);
  var pokerHandScore = this._pokerHandCalculator.scorePokerHand(this._pokerHandOrganizer);
  var pokerRankingArray = pokerHandScore.printToArray();

  return pokerRankingArray;
}
