var Display = require('./flood-display');
var Game = require('./game');

$(function () {
  var size = 14;
  var game = new Game(size);
  var display = new Display(game, size);

  display.setupBoard();
});
