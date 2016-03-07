'use strict';

var Card = require('./card.js');

module.exports = StringDecoder;

function StringDecoder () {}

StringDecoder.prototype.convertToCards = function(handString) {
  var SPACECHAR = ' ';
  var cardStringArray = handString.split(SPACECHAR);

  var cardArray = [];
  var thatStringDecoder = this;
  cardStringArray.forEach(function(cardString) {
    var cardRank = thatStringDecoder._decodeRank(cardString);
    var cardSuit = thatStringDecoder._decodeSuit(cardString);
    var newCard = new Card(cardRank, cardSuit);
    cardArray.push(newCard);
  });

  return cardArray;
};

StringDecoder.prototype._decodeSuit = function (cardString) {
  var suitIndex = this._getSuitIndex(cardString);
  var suit = cardString[suitIndex];
  return suit;
};

StringDecoder.prototype._decodeRank = function (cardString) {
  var suitIndex = this._getSuitIndex(cardString);
  var startIndex = 0;
  var stopAtIndex = suitIndex;
  var rank = cardString.slice(startIndex, stopAtIndex);
  return rank;
};

StringDecoder.prototype._getSuitIndex = function (cardString) {
  return cardString.length - 1;
};


