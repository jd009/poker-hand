'use strict';

var PokerHandScore = require('./pokerHandScore.js');

module.exports = PokerHandCalculator;

function PokerHandCalculator () {
  this._straightCount = null;
}

PokerHandCalculator.prototype.scorePokerHand = function (cardRecord) {
  this._resetStraightCount();

  var pokerHandScore = new PokerHandScore();
  this._checkForFlush(cardRecord, pokerHandScore);

  var highestRankIndex = cardRecord.getHighestRankIndex();
  var lowestRankIndex = cardRecord.getLowestRankIndex();
  for(var currentRankIndex = highestRankIndex; currentRankIndex >= lowestRankIndex; currentRankIndex--) {
    var cardsAtCurrentRankIndex = cardRecord.getCardsAt(currentRankIndex);
    var numCardsAtCurrentRankIndex = cardsAtCurrentRankIndex.length;

    this._checkForHighCard(numCardsAtCurrentRankIndex, cardsAtCurrentRankIndex, pokerHandScore);
    this._checkForStraight(numCardsAtCurrentRankIndex, cardsAtCurrentRankIndex, pokerHandScore);
    this._checkForCardsOfSameRank(numCardsAtCurrentRankIndex, cardsAtCurrentRankIndex, pokerHandScore);

    pokerHandScore.cards = pokerHandScore.cards.concat(cardsAtCurrentRankIndex);
    var cardCount = pokerHandScore.cards.length;
    if(cardCount === 5) {
      break;
    }
  }

  return pokerHandScore;
};

PokerHandCalculator.prototype._checkForFlush = function (cardRecord, pokerHandScore) {
  var numSuits = cardRecord.getNumSuits();
  pokerHandScore.isFlush = numSuits === 1;
};

PokerHandCalculator.prototype._checkForHighCard = function (
  numCardsAtCurrentRankIndex,
  cardsAtCurrentRankIndex,
  pokerHandScore)
{
  if(pokerHandScore.highCard !== null) {
    return;
  }

  if(numCardsAtCurrentRankIndex > 0) {
    var firstCardIndex = 0;
    pokerHandScore.highCard = cardsAtCurrentRankIndex[firstCardIndex];
  }
};

PokerHandCalculator.prototype._checkForStraight = function (
  numCardsAtCurrentRankIndex,
  cardsAtCurrentRankIndex,
  pokerHandScore)
{
  var isExactlyOneCard = numCardsAtCurrentRankIndex === 1;
  if( ! isExactlyOneCard) {
    this._resetStraightCount();
    return;
  }

  this._straightCount++;
  if(this._straightCount === 5) {
    pokerHandScore.isStraight = true;
  }
};

PokerHandCalculator.prototype._resetStraightCount = function () {
  this._straightCount = 0;
};

PokerHandCalculator.prototype._checkForCardsOfSameRank = function (
  numCardsAtCurrentRankIndex,
  cardsAtCurrentRankIndex,
  pokerHandScore)
{
  var isOneOrLessCards = numCardsAtCurrentRankIndex <= 1;
  if(pokerHandScore._isFlush ||
     isOneOrLessCards) {
    return;
  }

  var isFourOfAKind = numCardsAtCurrentRankIndex === 4;
  if(isFourOfAKind) {
    pokerHandScore.fourOfAKindCards = cardsAtCurrentRankIndex;
    return;
  }

  var isThreeOfAKind = numCardsAtCurrentRankIndex === 3;
  if(isThreeOfAKind) {
    pokerHandScore.threeOfAKindCards = cardsAtCurrentRankIndex;
    return;
  }

  var isAPair = numCardsAtCurrentRankIndex === 2;
  if(isAPair) {
    pokerHandScore.arrayOfPairs.push(cardsAtCurrentRankIndex);
  }
};
