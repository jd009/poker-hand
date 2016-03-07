module.exports = Card;

function Card (cardRank, cardSuit) {
  this.rank = cardRank;
  this.suit = cardSuit;
}

Card.prototype.toString = function() {
  var cardAsString = '';
  cardAsString += this.rank;
  cardAsString += this.suit;
  return cardAsString;
}
