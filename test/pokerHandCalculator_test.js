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
    var cards = [];
    cards.push(new Card('7', 'H'));
    cards.push(new Card('8', 'S'));
    cards.push(new Card('9', 'C'));
    cards.push(new Card('10', 'D'));
    cards.push(new Card('J', 'H'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isStraight, true);
  });

  it('should identify a straight starting with ace', function() {
    var cards = [];
    cards.push(new Card('A', 'C'));
    cards.push(new Card('K', 'H'));
    cards.push(new Card('Q', 'D'));
    cards.push(new Card('J', 'D'));
    cards.push(new Card('10', 'C'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isStraight, true);
  });

  it('should identify a straight flush', function() {
    var cards = [];
    cards.push(new Card('9', 'H'));
    cards.push(new Card('10', 'H'));
    cards.push(new Card('J', 'H'));
    cards.push(new Card('Q', 'H'));
    cards.push(new Card('K', 'H'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.isStraight, true);
    assert.equal(pokerHandScore.isFlush, true);
  });

  it('should identify a pair', function() {
    var cards = [];
    cards.push(new Card('7', 'H'));
    cards.push(new Card('7', 'S'));
    cards.push(new Card('Q', 'C'));
    cards.push(new Card('K', 'D'));
    cards.push(new Card('J', 'H'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.arrayOfPairs.length, 1);
  });

  it('should identify two pairs', function() {
    var cards = [];
    cards.push(new Card('7', 'H'));
    cards.push(new Card('7', 'S'));
    cards.push(new Card('Q', 'C'));
    cards.push(new Card('Q', 'D'));
    cards.push(new Card('J', 'H'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.equal(pokerHandScore.arrayOfPairs.length, 2);
  });

  it('should identify four of a kind', function() {
    var cards = [];
    cards.push(new Card('K', 'H'));
    cards.push(new Card('K', 'S'));
    cards.push(new Card('K', 'C'));
    cards.push(new Card('K', 'D'));
    cards.push(new Card('J', 'H'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.notEqual(pokerHandScore.fourOfAKindCards, null);
    assert.equal(pokerHandScore.fourOfAKindCards.length, 4);
    assert.equal(pokerHandScore.fourOfAKindCards[2].rank, 'K');
  });

  it('should identify three of a kind', function() {
    var cards = [];
    cards.push(new Card('2', 'H'));
    cards.push(new Card('9', 'S'));
    cards.push(new Card('9', 'C'));
    cards.push(new Card('9', 'D'));
    cards.push(new Card('10', 'H'));
    pokerHandOrganizer.saveCards(cards);

    var pokerHandScore = pokerHandCalculator.scorePokerHand(pokerHandOrganizer);

    assert.notEqual(pokerHandScore.threeOfAKindCards, null);
    assert.equal(pokerHandScore.threeOfAKindCards.length, 3);
    assert.equal(pokerHandScore.threeOfAKindCards[1].rank, '9');
  });
});
