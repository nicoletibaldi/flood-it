var Display = require('./flood-display');
var Game = require('./game');

$(function () {
  $(".start-button").on("click", function (){
    var e = document.getElementById("level");
    var size = parseInt(e.options[e.selectedIndex].value);
    if (size === "none") {
      alert("Please select a level!");
    }
    $(".instructions").addClass("hidden");
    $(".modal").addClass("hidden");
    $(".nicole").removeClass("hidden");
    $(".flood-it").removeClass("hidden");
    $(".button-table").removeClass("hidden");
    $(".game-nav").removeClass("hidden");
    $("figure").empty();
    var game = new Game(size);
    var display = new Display(game, size);
    display.setupBoard();
    display.bindEvents();
  });
});
