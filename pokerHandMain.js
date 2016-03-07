'use strict';

var PokerHandRanker = require('./pokerHandRanker.js');

var pokerHandRanker = new PokerHandRanker();

var testStringArray = [];
testStringArray.push('AC AD 7H 5D 5H');
testStringArray.push('AC AD 7H 5D 6C');
testStringArray.push('AC KH QD JD 10C');
testStringArray.push('2C 2D 2H JH 9C');
testStringArray.push('3C 4D 4H 4C 4S');
testStringArray.push('QH JH KS AC 10C');
testStringArray.push('AH JH QH KH 10H');
testStringArray.push('2H 3H 6C KH 10S');

testStringArray.forEach(function(testString) {
  console.log('Poker Hand: ', testString);
  var pokerRankingArray = pokerHandRanker.computeRanking(testString);
  console.log('Ranking: ', pokerRankingArray);
});

