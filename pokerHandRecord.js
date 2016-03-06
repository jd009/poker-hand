'use strict';

module.exports = HandRecord;

function HandRecord () {
  var LOWEST_RANK = 2;
  var HIGHEST_RANK = 14;
  this.rankRecordStorage = [];
  for(var rank = LOWEST_RANK; rank <= HIGHEST_RANK; rank++) {
    this.rankRecordStorage[rank] = [];
  }
  this.suitRecordStorage = {};
}

HandRecord.prototype.getNumSuits = function() {
  var suitKeys = Object.keys(this.suitRecordStorage);
  var numSuits = suitKeys.length;
  return numSuits;
};

HandRecord.prototype.getNumCards = function(rank) {
  var storageIndex = this._getStorageIndex(rank);
  var cardsAtRank = this.rankRecordStorage[storageIndex];
  var numCardsAtRank = cardsAtRank.length;
  return numCardsAtRank;
};

HandRecord.prototype.saveCard = function (card) {
  this._saveCardBySuit(card);
  this._saveCardByRank(card);
};

HandRecord.prototype._saveCardBySuit = function (card) {
  var suit = card.suit;
  if(this.suitRecordStorage[suit] === undefined) {
    this.suitRecordStorage[suit] = [];
  }

  this.suitRecordStorage[suit].push(card);
};

HandRecord.prototype._saveCardByRank = function (card) {
  var rank = card.rank;
  var storageIndex = this._getStorageIndex(rank);

  this.rankRecordStorage[storageIndex].push(card);
};

HandRecord.prototype._getStorageIndex = function (rank) {
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
