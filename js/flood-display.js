var Display = function (game, size, $el) {
  this.game = game;
  this.size = size;
  this.colors = ["red", "yellow", "pink", "green", "blue", "purple"];
  this.maxMoves = 25;
  this.moves = 0;
};

Display.prototype.setupBoard = function () {
  var $fig = $("figure");
  var $ul = $("<ul></ul>").addClass("grid group");
  var $p = $("<p></p>").text("Moves: " + this.moves + "/" + this.maxMoves);
  var floodedColor;
  $fig.append($p);
  $fig.append($ul);

  for (var i = 0; i < this.size * this.size; i++) {
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      var $li;
      if (i === 0) {
        floodedColor = randColor;
        $li = $("<li></li>").addClass("square " + randColor + " flooded").data("pos", [i]).text(i);
      } else {
        $li = $("<li></li>").addClass("square " + randColor).data("pos", [i]).text(i);
      }
      $ul.append($li);
  }
  this.floodNeighbors(floodedColor);
};

Display.prototype.floodNeighbors = function (floodedColor) {

  flood(floodedColor);
};

Display.prototype.bindEvents = function () {
  var display = this;
  $(".button").on("click", function(e){
    var color = e.currentTarget.attributes[1].value;
    display.makeMove(color);
  });
};

Display.prototype.makeMove = function (color) {
  this.moves++;
  $("p").empty().text("Moves: " + this.moves + "/" + this.maxMoves);
  $(".flooded").each(function(i) {
    $(this).removeClass("green blue yellow pink red purple");
    $(this).addClass(color);
  });
  flood(color);
  if (this.moves === 25) {
    alert("Game over!");
  }
  //find flooded squares
  //(let's say color is blue)
  //find adjacent of flooded squares that are blue
    //make them flooded
    //check their neighbors
    //stop when none are blue

    //$().append().text
    //$(".color")
};

Display.prototype.checkIfWon = function () {

};

function doesFlood(neighbors, floodedColor) {
  var moved = false;
    neighbors.forEach(function (n){
      var square = $(".square").filterByData("pos", n);
      if (square.is("." + floodedColor) && !square.is(".flooded")){
        moved = true;
      }
    });
  return moved;
}

function flood(floodedColor) {
  var floodedPositions = $(".flooded");
  var neighbors = findNeighbors(floodedPositions);
  if (doesFlood(neighbors, floodedColor) === false) {
    return;
  }
    neighbors.forEach(function (n){
      var square = $(".square").filterByData("pos", n);
      if (square.is("." + floodedColor) && !square.is(".flooded")){
        square.addClass("flooded");
      }
    });

    flood(floodedColor);
}


function findNeighbors(floodedPositions){
  var neighbors = [];
  floodedPositions.each(function (idx, el){

    var pos = parseInt($(el).text());
    neighbors = neighbors.concat(adjSquares(pos));
  });
  return neighbors;
}

function adjSquares(pos) {
  var squares = [];
  if (pos > 13) {
    squares.push(pos - 14);
  }
  if (pos < 182) {
    squares.push(pos + 14);
  }
  if (pos % 14 !== 0) {
    squares.push(pos - 1);
  }
  if ((pos + 1) % 14 !== 0) {
    squares.push(pos + 1);
  }
  return squares;
}

$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
};

module.exports = Display;
