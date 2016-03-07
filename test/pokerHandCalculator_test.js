var assert = require('assert');
var PokerHandCalculator = require('../helpers/pokerHandCalculator.js');
var PokerHandOrganizer = require('../helpers/pokerHandOrganizer.js');
var Card = require('../helpers/card.js');

describe('PokerHandCalculator', function() {
  var pokerHandCalculator = null;
  var pokerHandOrganizer = null;

  beforeEach(function() {
    pokerHandCalculator = new PokerHandCalculator();
    pokerHandOrganizer = new PokerHandOrganizer();
  });

  it('should identify a flush', function() {
    var numCards = 0;
    var rank = 2;
    var spadesSuit = 'S';
    do {
      var rankStr = rank.toString();
      var newTestCard = new Card(rankStr, spadesSuit);
      pokerHandOrganizer._saveCard(newTestCard);
      numCards++;
      rank++;
    } while (numCards <= 5);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isFlush, true);
  });

  it('should identify high card', function() {
    var numCards = 0;
    var rank = 2;
    var spadesSuit = 'S';
    do {
      var rankStr = rank.toString();
      var newTestCard = new Card(rankStr, spadesSuit);
      pokerHandOrganizer._saveCard(newTestCard);
      numCards++;
      rank++;
    } while (numCards <= 5);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.highCard, newTestCard);
  });

  it('should identify a straight', function() {
    pokerHandOrganizer._saveCard(new Card('7', 'H'));
    pokerHandOrganizer._saveCard(new Card('8', 'S'));
    pokerHandOrganizer._saveCard(new Card('9', 'C'));
    pokerHandOrganizer._saveCard(new Card('10', 'D'));
    pokerHandOrganizer._saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isStraight, true);
  });

  it('should identify a straight starting with ace', function() {
    pokerHandOrganizer._saveCard(new Card('A', 'C'));
    pokerHandOrganizer._saveCard(new Card('K', 'H'));
    pokerHandOrganizer._saveCard(new Card('Q', 'D'));
    pokerHandOrganizer._saveCard(new Card('J', 'D'));
    pokerHandOrganizer._saveCard(new Card('10', 'C'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isStraight, true);
  });

  it('should identify a straight flush', function() {
    pokerHandOrganizer._saveCard(new Card('9', 'H'));
    pokerHandOrganizer._saveCard(new Card('10', 'H'));
    pokerHandOrganizer._saveCard(new Card('J', 'H'));
    pokerHandOrganizer._saveCard(new Card('Q', 'H'));
    pokerHandOrganizer._saveCard(new Card('K', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isStraight, true);
    assert.equal(pokerHandScore.isFlush, true);
  });

  it('should identify a pair', function() {
    pokerHandOrganizer._saveCard(new Card('7', 'H'));
    pokerHandOrganizer._saveCard(new Card('7', 'S'));
    pokerHandOrganizer._saveCard(new Card('Q', 'C'));
    pokerHandOrganizer._saveCard(new Card('K', 'D'));
    pokerHandOrganizer._saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.arrayOfPairs.length, 1);
  });

  it('should identify two pairs', function() {
    pokerHandOrganizer._saveCard(new Card('7', 'H'));
    pokerHandOrganizer._saveCard(new Card('7', 'S'));
    pokerHandOrganizer._saveCard(new Card('Q', 'C'));
    pokerHandOrganizer._saveCard(new Card('Q', 'D'));
    pokerHandOrganizer._saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.arrayOfPairs.length, 2);
  });

  it('should identify four of a kind', function() {
    pokerHandOrganizer._saveCard(new Card('K', 'H'));
    pokerHandOrganizer._saveCard(new Card('K', 'S'));
    pokerHandOrganizer._saveCard(new Card('K', 'C'));
    pokerHandOrganizer._saveCard(new Card('K', 'D'));
    pokerHandOrganizer._saveCard(new Card('J', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.notEqual(pokerHandScore.fourOfAKindCards, null);
    assert.equal(pokerHandScore.fourOfAKindCards.length, 4);
    assert.equal(pokerHandScore.fourOfAKindCards[2].rank, 'K');
  });

  it('should identify three of a kind', function() {
    pokerHandOrganizer._saveCard(new Card('2', 'H'));
    pokerHandOrganizer._saveCard(new Card('9', 'S'));
    pokerHandOrganizer._saveCard(new Card('9', 'C'));
    pokerHandOrganizer._saveCard(new Card('9', 'D'));
    pokerHandOrganizer._saveCard(new Card('10', 'H'));

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.notEqual(pokerHandScore.threeOfAKindCards, null);
    assert.equal(pokerHandScore.threeOfAKindCards.length, 3);
    assert.equal(pokerHandScore.threeOfAKindCards[1].rank, '9');
  });
});
