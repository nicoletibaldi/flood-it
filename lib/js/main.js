var Display = require('./flood-display');
var Utils = require('./utils');

$(function () {
  $(".start-button").on("click", function (){
    var e = document.getElementById("level");
    var selectedLevel = parseInt(e.options[e.selectedIndex].value);
		var size = Utils.determineBoardSize(selectedLevel);
    $(".instructions").addClass("hidden");
    $(".modal").addClass("hidden");
    $(".nicole").removeClass("hidden");
    $(".flood-it").removeClass("hidden");
    $(".button-table").removeClass("hidden");
    $(".game-nav").removeClass("hidden");
    $("figure").empty();
    var display = new Display(size);
    display.setupBoard();
    display.bindEvents();
  });
});
