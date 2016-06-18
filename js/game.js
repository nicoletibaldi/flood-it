var Board = require("./board");
var MoveError = require("./moveError");

function Game (size) {
  this.board = new Board(size);
}

Game.prototype.registerStart = function () {
  $(".start-button").on("click", function (){
    $(".instructions").addClass("hidden");
    $(".modal").addClass("hidden");
  });
};

module.exports = Game;
