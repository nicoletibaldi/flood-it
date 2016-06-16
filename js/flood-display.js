var Display = function (game, size, $el) {
  this.game = game;
  this.size = size;
  this.colors = ["red", "yellow", "pink", "green", "blue", "purple"];
};

Display.prototype.setupBoard = function () {
  var $fig = $("figure");
  var $ul = $("<ul></ul>").addClass("grid group");
  $fig.append($ul);

  for (var i = 0; i < this.size * this.size; i++) {
      var rand = this.colors[Math.floor(Math.random() * this.colors.length)];
      var $li;
      if (i === 0) {
        $li = $("<li></li>").addClass("square flooded " + rand).data("pos", [i]);
      } else {
        $li = $("<li></li>").addClass("square " + rand).data("pos", [i]);
      }
      $ul.append($li);
  }
};

Display.prototype.bindEvents = function () {
  var display = this;
  $(".button").on("click", function(e){
    var color = e.currentTarget.attributes[1].value;
    display.makeMove(color);
  });
};

Display.prototype.makeMove = function (color) {
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


module.exports = Display;
