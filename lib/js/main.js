var Display = require('./flood-display');
var _display = null;

$(function () {
  $(".start-button").on("click", function (){
    if (_display) { _display.unbindEvents(); }
    var e = document.getElementById("level");
    var size = parseInt(e.options[e.selectedIndex].value);
    $(".instructions, .modal").addClass("hidden");
    $(".nicole, .flood-it, .button-table, .game-nav").removeClass("hidden");
    $("figure").empty();
    _display = new Display(size);
    _display.setupBoard();
    _display.bindEvents();
  });
});
