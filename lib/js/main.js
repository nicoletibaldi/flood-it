var Display = require('./flood-display');

$(function () {
  $(".start-button").on("click", function (){
    var e = document.getElementById("level");
    var size = parseInt(e.options[e.selectedIndex].value);
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
