var Board = require('./board');
var Constants = require('./constants');

function Game (size) {
  this.size = size;
  this.board = new Board(size);
  this.moves = 0;
  this.maxMoves = this.determineMax();
}

Game.prototype.determineMax = function () {
  if (this.size === Constants.EASY_GRID_SIZE) {
    return Constants.EASY_MAX_MOVES;
  } else if (this.size === Constants.MEDIUM_GRID_SIZE) {
    return Constants.MEDIUM_MAX_MOVES;
  } else if (this.size === Constants.HARD_GRID_SIZE){
    return Constants.HARD_MAX_MOVES;
  }
};


module.exports = Game;
