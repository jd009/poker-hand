'use strict';

var assert = require('assert');
var PokerHandRanker = require('../pokerHandRanker.js');

describe('PokerHandRanker', function() {
  var pokerHandRanker = null;

  beforeEach(function() {
    pokerHandRanker = new PokerHandRanker();
  });

  it('should report one pair with ace high', function() {
    var pokerRankingArray = pokerHandRanker.computeRanking('AH KC 4C 4D 5C');
    var expectedPokerRankingArray = ['one pair', 'high card: AH'];

    assert.equal(pokerRankingArray[0], expectedPokerRankingArray[0]);
    assert.equal(pokerRankingArray[1], expectedPokerRankingArray[1]);
  });

  it('should report two pairs with king high', function() {
    var pokerRankingArray = pokerHandRanker.computeRanking('KC 5C 4C 4D 5C');
    var expectedPokerRankingArray = ['two pair', 'high card: KC'];

    assert.equal(pokerRankingArray[0], expectedPokerRankingArray[0]);
    assert.equal(pokerRankingArray[1], expectedPokerRankingArray[1]);
  });

  it('should report a straight with king high', function() {
    var pokerRankingArray = pokerHandRanker.computeRanking('KC QD JC 10D 9C');
    var expectedPokerRankingArray = ['straight', 'high card: KC'];

    assert.equal(pokerRankingArray[0], expectedPokerRankingArray[0]);
    assert.equal(pokerRankingArray[1], expectedPokerRankingArray[1]);
  });

  it('should report a straight flush with 9 high', function() {
    var pokerRankingArray = pokerHandRanker.computeRanking('9C 7C 8C 5C 6C');
    var expectedPokerRankingArray = ['straight flush', 'high card: 9C'];

    assert.equal(pokerRankingArray[0], expectedPokerRankingArray[0]);
    assert.equal(pokerRankingArray[1], expectedPokerRankingArray[1]);
  });
});
