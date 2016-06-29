var Game = require('./game');

var Display = function (size) {
  this.game = new Game(size);
  this.colors = ["red", "yellow", "pink", "green", "blue", "purple"];
};

Display.prototype.setupBoard = function () {
  var $fig = $("figure");
  var $ul = $("<ul></ul>").addClass("grid group");
  $(".moves").empty().text("Moves: " + this.game.moves + "/" + this.game.maxMoves);
  var floodedColor;
  $fig.append($ul);

  for (var i = 0; i < Math.pow(this.game.size, 2); i++) {
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      var $li;
      if (i === 0) {
        floodedColor = randColor;
        $li = $("<li></li>").addClass("square " + randColor + " flooded").data("pos", [i]).text(i);
        this.handleSize($li);
      } else {
        $li = $("<li></li>").addClass("square " + randColor).data("pos", [i]).text(i);
        this.handleSize($li);
      }
      $ul.append($li);
  }
  this.flood(floodedColor);
};

Display.prototype.handleSize = function ($li) {
  if (this.game.size === 8) {
    $li.addClass("easy-square");
  } else if (this.game.size === 12) {
    $li.addClass("med-square");
  } else {
    $li.addClass("large-square");
  }
};

Display.prototype.bindEvents = function () {
  var display = this;
  $(".button").on("click", function(e){
    var color = e.currentTarget.attributes[1].value;
    display.makeMove(color);
  });
  $(".menu").on("click", function () {
    $(".instructions").removeClass("hidden");
    $(".modal").removeClass("hidden");
  });
  $(".refresh").on("click", function () {
    display.resetGame();
  });
};

Display.prototype.makeMove = function (color) {
  this.game.moves++;
  $("h3").empty().text("Moves: " + this.game.moves + "/" + this.game.maxMoves);
  $(".flooded").each(function(i) {
    $(this).removeClass("green blue yellow pink red purple").addClass(color);
  });
  this.flood(color);
  this.checkIfWon();
  this.checkIfLost();
};

Display.prototype.resetGame = function () {
  this.game = new Game();
  $("h3").empty();
  $("figure").empty();
  this.setupBoard();
};

Display.prototype.endGame = function (wonLost) {
  var $desc = $(".desc");
  var $startButton = $(".start-button");
  $desc.empty();
  $(".det").empty();
  $startButton.empty();
  $startButton.prepend('<img src="./assets/playagain2.png" />');
  if (wonLost === "won") {
    $desc.text("You win!");
  } else if (wonLost === "lost") {
    $desc.text("You're out of moves!");
  }
  $(".instructions").removeClass("hidden");
  $(".modal").removeClass("hidden");
};

Display.prototype.checkIfWon = function () {
  var game = this;
  if ($("li.flooded").length === $("li").length) {
    this.endGame("won");
  }
};

Display.prototype.checkIfLost = function () {
  var game = this;
  if (this.game.moves === this.game.maxMoves && $("li.flooded").length !== $("li").length) {
    this.endGame("lost");
  }
};

Display.prototype.doesFlood = function(neighbors, floodedColor) {
  var moved = false;
    neighbors.forEach(function (n){
      var $square = $(".square").filterByData("pos", n);
      if ($square.is("." + floodedColor) && !$square.is(".flooded")){
        moved = true;
      }
    });
  return moved;
};

Display.prototype.flood = function(floodedColor) {
  var floodedPositions = $(".flooded");
  var neighbors = this.findNeighbors(floodedPositions);
  if (this.doesFlood(neighbors, floodedColor) === false) {
    return;
  }
    neighbors.forEach(function (n){
      var $square = $(".square").filterByData("pos", n);
      if ($square.is("." + floodedColor) && !$square.is(".flooded")){
        $square.addClass("flooded");
      }
    });

    this.flood(floodedColor);
};

Display.prototype.findNeighbors = function(floodedPositions){
  var display = this;
  var neighbors = [];
  floodedPositions.each(function (idx, el){
    var pos = parseInt($(el).text());
    neighbors = neighbors.concat(display.adjSquares(pos));
  });
  return neighbors;
};


Display.prototype.adjSquares = function (pos) {
  var squares = [];
  if (pos > (this.game.size - 1)) {
    squares.push(pos - this.game.size);
  }
  if (pos < (this.game.size * (this.game.size - 1))) {
    squares.push(pos + this.game.size);
  }
  if (pos % this.game.size !== 0) {
    squares.push(pos - 1);
  }
  if ((pos + 1) % this.game.size !== 0) {
    squares.push(pos + 1);
  }
  return squares;
};

$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
};

module.exports = Display;
