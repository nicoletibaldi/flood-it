var Display = function (game, size, $el) {
  this.game = game;
  this.size = size;
  this.colors = ["red", "yellow", "pink", "green", "blue", "purple"];
};

Display.prototype.setupBoard = function () {
  var $fig = $("figure");
  var $ul = $("<ul></ul>").addClass("grid group");
  $fig.append($ul);

  for (var k = 0; k < this.size; k++) {
    for (var j = 0; j < this.size; j++) {
      var rand = this.colors[Math.floor(Math.random() * this.colors.length)];
      var $li = $("<li></li>").addClass("square " + rand).data("pos", [k,j]);
      $ul.append($li);
    }
  }
};

Display.prototype.bindEvents = function () {
  var display = this;
  $(".button").on("click", function(e){
    var $button = $(e.currentTarget);
    //makeMove
  });
};

Display.prototype.makeMove = function ($color) {
  //change color class of prev squares to new color
  //check if game is over (moves or won)
    //if won congratulate
    //if lost give option to start over
    //$().append().text
    //$(".color")
};


module.exports = Display;
