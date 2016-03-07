var assert = require('assert');
var PokerHandCalculator = require('../pokerHandCalculator.js');
var PokerHandRecord = require('../pokerHandRecord.js');
var Card = require('../card.js');

describe('PokerHandCalculator', function() {
  var pokerHandCalculator = null;

  beforeEach(function() {
    pokerHandCalculator = new PokerHandCalculator();
  });

  it('should identify a flush', function() {
    var pokerHandRecord = new PokerHandRecord();
    var numCards = 0;
    var rank = 2;
    var spadesSuit = 'S';
    do {
      var rankStr = rank.toString();
      var newTestCard = new Card(rankStr, spadesSuit);
      pokerHandRecord.saveCard(newTestCard);
      numCards++;
      rank++;
    } while (numCards <= 5);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.equal(pokerHandScore.isFlush, true);
  });

  it('should identify high card', function() {
    var pokerHandRecord = new PokerHandRecord();
    var numCards = 0;
    var rank = 2;
    var spadesSuit = 'S';
    do {
      var rankStr = rank.toString();
      var newTestCard = new Card(rankStr, spadesSuit);
      pokerHandRecord.saveCard(newTestCard);
      numCards++;
      rank++;
    } while (numCards <= 5);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.equal(pokerHandScore.highCard, newTestCard);
  });

  it('should identify a straight', function() {
    var pokerHandRecord = new PokerHandRecord();
    pokerHandRecord.saveCard(new Card('7', 'H'));
    pokerHandRecord.saveCard(new Card('8', 'S'));
    pokerHandRecord.saveCard(new Card('9', 'C'));
    pokerHandRecord.saveCard(new Card('10', 'D'));
    pokerHandRecord.saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.equal(pokerHandScore.isStraight, true);
  });

  it('should identify a straight flush', function() {
    var pokerHandRecord = new PokerHandRecord();
    pokerHandRecord.saveCard(new Card('9', 'H'));
    pokerHandRecord.saveCard(new Card('10', 'H'));
    pokerHandRecord.saveCard(new Card('J', 'H'));
    pokerHandRecord.saveCard(new Card('Q', 'H'));
    pokerHandRecord.saveCard(new Card('K', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.equal(pokerHandScore.isStraight, true);
    assert.equal(pokerHandScore.isFlush, true);
  });

  it('should identify a pair', function() {
    var pokerHandRecord = new PokerHandRecord();
    pokerHandRecord.saveCard(new Card('7', 'H'));
    pokerHandRecord.saveCard(new Card('7', 'S'));
    pokerHandRecord.saveCard(new Card('Q', 'C'));
    pokerHandRecord.saveCard(new Card('K', 'D'));
    pokerHandRecord.saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.equal(pokerHandScore.arrayOfPairs.length, 1);
  });

  it('should identify two pairs', function() {
    var pokerHandRecord = new PokerHandRecord();
    pokerHandRecord.saveCard(new Card('7', 'H'));
    pokerHandRecord.saveCard(new Card('7', 'S'));
    pokerHandRecord.saveCard(new Card('Q', 'C'));
    pokerHandRecord.saveCard(new Card('Q', 'D'));
    pokerHandRecord.saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.equal(pokerHandScore.arrayOfPairs.length, 2);
  });

  it('should identify four of a kind', function() {
    var pokerHandRecord = new PokerHandRecord();
    pokerHandRecord.saveCard(new Card('K', 'H'));
    pokerHandRecord.saveCard(new Card('K', 'S'));
    pokerHandRecord.saveCard(new Card('K', 'C'));
    pokerHandRecord.saveCard(new Card('K', 'D'));
    pokerHandRecord.saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.notEqual(pokerHandScore.fourOfAKindCards, null);
    assert.equal(pokerHandScore.fourOfAKindCards.length, 4);
    assert.equal(pokerHandScore.fourOfAKindCards[2].rank, 'K');
  });

  it('should identify three of a kind', function() {
    var pokerHandRecord = new PokerHandRecord();
    pokerHandRecord.saveCard(new Card('2', 'H'));
    pokerHandRecord.saveCard(new Card('9', 'S'));
    pokerHandRecord.saveCard(new Card('9', 'C'));
    pokerHandRecord.saveCard(new Card('9', 'D'));
    pokerHandRecord.saveCard(new Card('10', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandRecord);

    assert.notEqual(pokerHandScore.threeOfAKindCards, null);
    assert.equal(pokerHandScore.threeOfAKindCards.length, 3);
    assert.equal(pokerHandScore.threeOfAKindCards[1].rank, '9');
  });
});
