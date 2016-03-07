var assert = require('assert');
var PokerHandOrganizer = require('../pokerHandOrganizer.js');
var Card = require('../card.js');

describe('PokerHandOrganizer', function() {
  var pokerHandOrganizer = null;

  beforeEach(function() {
    pokerHandOrganizer = new PokerHandOrganizer();
  });

  it('should properly determine the right storage index for a face card rank', function() {
    var kingRank = 'K';
    var expectedKingIndex = 13;
    var kingIndex = pokerHandOrganizer._getStorageIndex(kingRank);
    assert.equal(kingIndex, expectedKingIndex);
  });

  it('should properly determine the right storage index for a number card rank', function() {
    var tenRank = '10';
    var expectedTenIndex = 10;
    var tenIndex = pokerHandOrganizer._getStorageIndex(tenRank);
    assert.equal(tenIndex, expectedTenIndex);
  });

  it('should throw an exception for an invalid high number card rank', function() {
    var invalidTooHighRank = '11';
    assert.throws(function() {
      var storageIndex = pokerHandOrganizer._getStorageIndex(invalidTooHighRank);
    });
  });

  it('should throw an exception for an invalid low number card rank', function() {
    var invalidTooLowRank = '1';
    assert.throws(function() {
      var storageIndex = pokerHandOrganizer._getStorageIndex(invalidTooLowRank);
    });
  });

  it('should save a card by suit and rank', function() {
    var aceRank = 'A';
    var spadesSuit = 'S';
    var testAceOfSpadesCard = new Card(aceRank, spadesSuit);
    pokerHandOrganizer._saveCard(testAceOfSpadesCard);
    var storageIndex = pokerHandOrganizer._getStorageIndex(aceRank);
    assert.equal(pokerHandOrganizer.rankRecordStorage[storageIndex][0], testAceOfSpadesCard);
    assert.equal(pokerHandOrganizer.suitRecordStorage[spadesSuit][0], testAceOfSpadesCard);
  });

  it('should return the correct number of suits in a hand', function() {
    var testTwoOfHeartsCard = new Card('2', 'H');
    pokerHandOrganizer._saveCard(testTwoOfHeartsCard);
    var testThreeOfClubsCard = new Card('3', 'C');
    pokerHandOrganizer._saveCard(testThreeOfClubsCard);

    var expectedNumSuits = 2;
    var numSuits = pokerHandOrganizer.getNumSuits();
    assert.equal(numSuits, expectedNumSuits);
  });

  it('should return the correct cards at a rank', function() {
    var sharedRank = '2';
    var sharedRankIndex = 2;
    var testTwoOfHeartsCard = new Card(sharedRank, 'H');
    pokerHandOrganizer._saveCard(testTwoOfHeartsCard);
    var testTwofClubsCard = new Card(sharedRank, 'C');
    pokerHandOrganizer._saveCard(testTwofClubsCard);

    var cardsAtRank = pokerHandOrganizer.getCardsAt(sharedRankIndex);
    assert.equal(testTwoOfHeartsCard, cardsAtRank[0]);
    assert.equal(testTwofClubsCard, cardsAtRank[1]);
  });
});
