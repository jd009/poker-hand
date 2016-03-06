var assert = require('assert');
var HandRecord = require('../handRecord.js');

describe('HandRecord', function() {
  it('should properly determine the right storage index for a face card rank', function() {
    var handRecord = new HandRecord();
    var kingRank = 'K';
    var expectedKingIndex = 13;
    var kingIndex = handRecord._getStorageIndex(kingRank);
    assert.equal(kingIndex, expectedKingIndex);
  });

  it('should properly determine the right storage index for a number card rank', function() {
    var handRecord = new HandRecord();
    var tenRank = '10';
    var expectedTenIndex = 10;
    var tenIndex = handRecord._getStorageIndex(tenRank);
    assert.equal(tenIndex, expectedTenIndex);
  });

  it('should throw an exception for an invalid high number card rank', function() {
    var handRecord = new HandRecord();
    var invalidTooHighRank = '11';
    assert.throws(function() {
      var storageIndex = handRecord._getStorageIndex(invalidTooHighRank);
    });
  });

  it('should throw an exception for an invalid low number card rank', function() {
    var handRecord = new HandRecord();
    var invalidTooLowRank = '1';
    assert.throws(function() {
      var storageIndex = handRecord._getStorageIndex(invalidTooLowRank);
    });
  });
});
