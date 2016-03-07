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

PokerHandScore.prototype.print = function () {

};
