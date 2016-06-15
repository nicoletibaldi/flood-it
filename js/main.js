var View = require('./flood-view');
var Game = require('./game');

$(function () {
  var size = 14;
  var game = new Game(size);
  var view = new View(game, size);

  view.setupBoard();
  view.bindEvents();
});
