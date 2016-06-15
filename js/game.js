var Board = require("./board");
var MoveError = require("./moveError");

function Game (size) {
  this.board = new Board(size);
}

module.exports = Game;
