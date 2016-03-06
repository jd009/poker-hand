'use strict';

var HandRecord = require('./handRecord.js');

module.exports = HandOrganizer;

function HandOrganizer () {}

HandOrganizer.prototype.convertToHandRecord = function (cardsArray) {
  var handRecord = new HandRecord();
  cardsArray.forEach(function(card) {
    handRecord.saveCard(card);
  });

  return handRecord;
};

