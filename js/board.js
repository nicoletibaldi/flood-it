var MoveError = require("./moveError");

function Board (size) {
  this.grid = Board.makeGrid();
  this.size = size;
}


Board.makeGrid = function () {
  var grid = [];

  for (var i = 0; i < this.size; i++) {
    grid.push([]);
    for (var j = 0; j < this.size; j++) {
      grid[i].push(null);
    }
  }

  return grid;
};


Board.prototype.print = function () {
  var strs = [];
  for (var rowIdx = 0; rowIdx < this.size; rowIdx++) {
    var marks = [];
    for (var colIdx = 0; colIdx < this.size; colIdx++) {
      marks.push(" ");
    }

    strs.push(marks.join("|") + "\n");
  }
};



module.exports = Board;
