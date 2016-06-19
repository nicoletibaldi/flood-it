var Display = require('./flood-display');
var Game = require('./game');

$(function () {
  $(".start-button").on("click", function (){
    $(".instructions").addClass("hidden");
    $(".modal").addClass("hidden");
    var e = document.getElementById("level");
    var size = parseInt(e.options[e.selectedIndex].value);
    $("figure").empty();
    var game = new Game(size);
    var display = new Display(game, size);
    display.setupBoard();
    display.bindEvents();
  });
});
