'use strict';

var assert = require('assert');
var PokerHandScore = require('../helpers/pokerHandScore.js');
var Card = require('../helpers/card.js');

describe('PokerHandScore', function() {
  it('should report only high card if no other ranking', function() {
    var pokerHandScore = new PokerHandScore();
    pokerHandScore.highCard = new Card('A', 'S');

    var reportArray = pokerHandScore.printToArray();
    assert.equal(reportArray.length, 1);
  });

  it('should have two report elements when ranking beyond high card', function() {
    var pokerHandScore = new PokerHandScore();
    pokerHandScore.highCard = new Card('A', 'S');
    var pair = [];
    pair.push(new Card('7', 'C'));
    pair.push(new Card('7', 'D'));
    pokerHandScore.arrayOfPairs.push(pair);

    var reportArray = pokerHandScore.printToArray();
    assert.equal(reportArray.length, 2);
  });
});
