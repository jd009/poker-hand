var assert = require('assert');
var PokerHandRecord = require('../pokerHandRecord.js');

describe('PokerHandRecord', function() {
  it('should properly determine the right storage index for a face card rank', function() {
    var pokerHandRecord = new PokerHandRecord();
    var kingRank = 'K';
    var expectedKingIndex = 13;
    var kingIndex = pokerHandRecord._getStorageIndex(kingRank);
    assert.equal(kingIndex, expectedKingIndex);
  });

  it('should properly determine the right storage index for a number card rank', function() {
    var pokerHandRecord = new PokerHandRecord();
    var tenRank = '10';
    var expectedTenIndex = 10;
    var tenIndex = pokerHandRecord._getStorageIndex(tenRank);
    assert.equal(tenIndex, expectedTenIndex);
  });

  it('should throw an exception for an invalid high number card rank', function() {
    var pokerHandRecord = new PokerHandRecord();
    var invalidTooHighRank = '11';
    assert.throws(function() {
      var storageIndex = pokerHandRecord._getStorageIndex(invalidTooHighRank);
    });
  });

  it('should throw an exception for an invalid low number card rank', function() {
    var pokerHandRecord = new PokerHandRecord();
    var invalidTooLowRank = '1';
    assert.throws(function() {
      var storageIndex = pokerHandRecord._getStorageIndex(invalidTooLowRank);
    });
  });
});
