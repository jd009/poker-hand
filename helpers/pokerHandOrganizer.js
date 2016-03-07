'use strict';

module.exports = PokerHandOrganizer;

function PokerHandOrganizer () {
  this._initialize();
}

PokerHandOrganizer.prototype._initialize = function() {
  this.LOWEST_RANK_INDEX = 2;
  this.HIGHEST_RANK_INDEX = 14;
  this.rankRecordStorage = [];
  for(var rank = this.LOWEST_RANK_INDEX; rank <= this.HIGHEST_RANK_INDEX; rank++) {
    this.rankRecordStorage[rank] = [];
  }
  this.suitRecordStorage = {};
};

PokerHandOrganizer.prototype.getNumSuits = function() {
  var suitKeys = Object.keys(this.suitRecordStorage);
  var numSuits = suitKeys.length;
  return numSuits;
};

PokerHandOrganizer.prototype.getCardsAt = function(rankIndex) {
  var cardsAtRankIndex = this.rankRecordStorage[rankIndex];
  return cardsAtRankIndex;
};

PokerHandOrganizer.prototype.getHighestRankIndex = function() {
  return this.HIGHEST_RANK_INDEX;
};

PokerHandOrganizer.prototype.getLowestRankIndex = function() {
  return this.LOWEST_RANK_INDEX;
};

PokerHandOrganizer.prototype.storeCards = function (cards) {
  this._initialize();
  var thatPokerHandOrganizer = this;
  cards.forEach(function(card) {
    thatPokerHandOrganizer._storeCard(card);
  });
};

PokerHandOrganizer.prototype._storeCard = function (card) {
  this._storeCardBySuit(card);
  this._storeCardByRank(card);
};

PokerHandOrganizer.prototype._storeCardBySuit = function (card) {
  var suit = card.suit;
  if(this.suitRecordStorage[suit] === undefined) {
    this.suitRecordStorage[suit] = [];
  }

  this.suitRecordStorage[suit].push(card);
};

PokerHandOrganizer.prototype._storeCardByRank = function (card) {
  var rank = card.rank;
  var storageIndex = this._getStorageIndex(rank);

  this.rankRecordStorage[storageIndex].push(card);
};

PokerHandOrganizer.prototype._getStorageIndex = function (rank) {
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
