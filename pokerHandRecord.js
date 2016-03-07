'use strict';

module.exports = PokerHandRecord;

function PokerHandRecord () {
  this.LOWEST_RANK_INDEX = 2;
  this.HIGHEST_RANK_INDEX = 14;
  this.rankRecordStorage = [];
  for(var rank = this.LOWEST_RANK_INDEX; rank <= this.HIGHEST_RANK_INDEX; rank++) {
    this.rankRecordStorage[rank] = [];
  }
  this.suitRecordStorage = {};
}

PokerHandRecord.prototype.getNumSuits = function() {
  var suitKeys = Object.keys(this.suitRecordStorage);
  var numSuits = suitKeys.length;
  return numSuits;
};

PokerHandRecord.prototype.getCardsAt = function(rankIndex) {
  var cardsAtRankIndex = this.rankRecordStorage[rankIndex];
  return cardsAtRankIndex;
};

PokerHandRecord.prototype.getHighestRankIndex = function() {
  return this.HIGHEST_RANK_INDEX;
};

PokerHandRecord.prototype.getLowestRankIndex = function() {
  return this.LOWEST_RANK_INDEX;
};

PokerHandRecord.prototype.saveCard = function (card) {
  this._saveCardBySuit(card);
  this._saveCardByRank(card);
};

PokerHandRecord.prototype._saveCardBySuit = function (card) {
  var suit = card.suit;
  if(this.suitRecordStorage[suit] === undefined) {
    this.suitRecordStorage[suit] = [];
  }

  this.suitRecordStorage[suit].push(card);
};

PokerHandRecord.prototype._saveCardByRank = function (card) {
  var rank = card.rank;
  var storageIndex = this._getStorageIndex(rank);

  this.rankRecordStorage[storageIndex].push(card);
};

PokerHandRecord.prototype._getStorageIndex = function (rank) {
  switch(rank) {
    case 'A':
      return 14;
    case 'K':
      return 13;
    case 'Q':
      return 12;
    case 'J':
      return 11;
    default:
      var rankAsNumber = Number(rank);
      var highestNumericalRank = 10;
      var lowestNumericalRank = 2;
      if(rankAsNumber > highestNumericalRank ||
         rankAsNumber < lowestNumericalRank) {
        throw 'Invalid rank detected when finding storage index!';
      }
      return rankAsNumber;
  }
};
