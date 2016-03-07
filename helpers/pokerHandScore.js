'use strict';

module.exports = PokerHandScore;

function PokerHandScore () {
  this.cards = [];
  this.highCard = null;
  this.isFlush = false;
  this.isStraight = false;
  this.fourOfAKindCards = null;
  this.threeOfAKindCards = null;
  this.arrayOfPairs = [];
}

PokerHandScore.prototype.printToArray = function () {
  var HIGH_CARD_TEXT = 'high card: ';
  var ONE_PAIR_TEXT = 'one pair';
  var TWO_PAIR_TEXT = 'two pair';
  var THREE_OF_A_KIND_TEXT = 'three of a kind';
  var FOUR_OF_A_KIND_TEXT = 'four of a kind';
  var FLUSH_TEXT = 'flush';
  var STRAIGHT_TEXT = 'straight';
  var STRAIGHT_FLUSH_TEXT = 'straight flush';

  var handRankingArray = [];
  var highCardAsString = this.highCard.toString();
  var highCardReportString = HIGH_CARD_TEXT + highCardAsString;
  handRankingArray.unshift(highCardReportString);

  if(this.isFlush && this.isStraight) {
    handRankingArray.unshift(STRAIGHT_FLUSH_TEXT);
    return handRankingArray;
  }

  if(this.fourOfAKindCards !== null) {
    handRankingArray.unshift(FOUR_OF_A_KIND_TEXT);
    return handRankingArray;
  }

  if(this.isFlush) {
    handRankingArray.unshift(FLUSH_TEXT);
    return handRankingArray
  }

  if(this.isStraight) {
    handRankingArray.unshift(STRAIGHT_TEXT);
    return handRankingArray;
  }

  if(this.threeOfAKindCards !== null) {
    handRankingArray.unshift(THREE_OF_A_KIND_TEXT);
    return handRankingArray;
  }

  var numOfPairs = this.arrayOfPairs.length;
  if(numOfPairs === 2) {
    handRankingArray.unshift(TWO_PAIR_TEXT);
    return handRankingArray;
  }

  if(numOfPairs === 1) {
    handRankingArray.unshift(ONE_PAIR_TEXT);
    return handRankingArray;
  }

  return handRankingArray;
};
