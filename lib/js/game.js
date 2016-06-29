var Board = require("./board");

function Game (size) {
  this.size = size;
  this.board = new Board(size);
  this.moves = 0;
  this.maxMoves = this.determineMax();
}

Game.prototype.determineMax = function () {
  if (this.size === 8) {
    return 15;
  } else if (this.size === 12) {
    return 20;
  } else {
    return 25;
  }
};


module.exports = Game;
