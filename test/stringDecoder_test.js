var assert = require('assert');
var Card = require('../helpers/card.js');
var StringDecoder = require('../helpers/stringDecoder.js');

describe('StringDecoder', function() {
  it('should properly decode the cards in a string representing a poker hand', function() {
    var stringDecoder = new StringDecoder();
    var testString = 'AC AD 7H 5D 5H';
    var cardArray = stringDecoder.convertToCards(testString);

    var expectedCardArray = [];
    var expectedFirstCard = new Card ('A', 'C');
    expectedCardArray.push(expectedFirstCard);
    var expectedSecondCard = new Card ('A', 'D');
    expectedCardArray.push(expectedSecondCard);
    var expectedThirdCard = new Card ('7', 'H');
    expectedCardArray.push(expectedThirdCard);
    var expectedFourthCard = new Card ('5', 'D');
    expectedCardArray.push(expectedFourthCard);
    var expectedFifthCard = new Card ('5', 'H');
    expectedCardArray.push(expectedFifthCard);

    for(var index = 0; index < cardArray.length; index++) {
      assert.equal(cardArray[index].suit, expectedCardArray[index].suit);
      assert.equal(cardArray[index].rank, expectedCardArray[index].rank);
    }
  });
});
