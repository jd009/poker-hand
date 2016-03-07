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

  if(this.isFlush && this.isStraight) {
    handRankingArray.push(STRAIGHT_FLUSH_TEXT);
  }

  if(this.fourOfAKindCards !== null) {
    handRankingArray.push(FOUR_OF_A_KIND_TEXT);
  }

  if(this.isFlush && ( ! this.isStraight) ) {
    handRankingArray.push(FLUSH_TEXT);
  }

  if( ( ! this.isFlush) && this.isStraight) {
    handRankingArray.push(STRAIGHT_TEXT);
  }

  if(this.threeOfAKindCards !== null) {
    handRankingArray.push(THREE_OF_A_KIND_TEXT);
  }

  var numOfPairs = this.arrayOfPairs.length;
  if(numOfPairs === 2) {
    handRankingArray.push(TWO_PAIR_TEXT);
  }

  if(numOfPairs === 1) {
    handRankingArray.push(ONE_PAIR_TEXT);
  }

  var highCardAsString = this.highCard.toString();
  var highCardReportString = HIGH_CARD_TEXT + highCardAsString;
  handRankingArray.push(highCardReportString);

  return handRankingArray;
};
