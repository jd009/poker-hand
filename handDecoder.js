'use strict';

var Card = require('./card.js');

module.exports = HandDecoder;

function HandDecoder () {}

HandDecoder.prototype.decodeCards = function(handString) {
  var SPACECHAR = ' ';
  var cardStringArray = handString.split(SPACECHAR);

  var cardArray = [];
  var thatHandDecoder = this;
  cardStringArray.forEach(function(cardString) {
    var cardSuit = thatHandDecoder._decodeSuit(cardString);
    var cardRank = thatHandDecoder._decodeRank(cardString);
    var newCard = new Card(cardSuit, cardRank);
    cardArray.push(newCard);
  });

  return cardArray;
};

HandDecoder.prototype._decodeSuit = function (cardString) {
  var suitIndex = this._getSuitIndex(cardString);
  var suit = cardString[suitIndex];
  return suit;
};

HandDecoder.prototype._decodeRank = function (cardString) {
  var suitIndex = this._getSuitIndex(cardString);
  var startIndex = 0;
  var stopAtIndex = suitIndex;
  var rank = cardString.slice(startIndex, stopAtIndex);
  return rank;
};

HandDecoder.prototype._getSuitIndex = function (cardString) {
  return cardString.length - 1;
};


