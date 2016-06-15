var View = function (game, size, $el) {
  this.game = game;
  this.size = size;
  this.colors = ["red", "yellow", "pink", "green", "blue", "purple"];
};

View.prototype.setupBoard = function () {
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


module.exports = View;
