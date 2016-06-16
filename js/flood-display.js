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
        $li = $("<li></li>").addClass("square flooded " + randColor).data("pos", [i]);
      } else {
        $li = $("<li></li>").addClass("square " + randColor).data("pos", [i]);
      }
      $ul.append($li);
  }
  this.floodNeighbors(floodedColor);
  console.log($(".flooded"))
};

Display.prototype.floodNeighbors = function (floodedColor) {
  var floodedPositions = [];
  $(".flooded").each(function(_) {
    var pos = $(this).data("pos");
    floodedPositions.push(pos[0]);
  });

  var neighbors = [];
  floodedPositions.forEach(function (pos){
    neighbors = neighbors.concat(adj_squares(pos));
  });

  neighbors.forEach(function (n){
    var square = $(".square").filterByData("pos", n);
    if (square.is("." + floodedColor)){
      square.addClass("flooded");
    }
  });
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
  //find flooded squares
  //(let's say color is blue)
  //find adjacent of flooded squares that are blue
    //make them flooded
    //check their neighbors
    //stop when none are blue

    //$().append().text
    //$(".color")
};

function adj_squares(pos) {
  var squares = [];
  if (pos > 14) {
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
  return squares.sort();
}

$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
};

module.exports = Display;
