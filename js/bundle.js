/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Display = __webpack_require__(1);
	var Game = __webpack_require__(2);
	
	$(function () {
	  $(".start-button").on("click", function (){
	    var e = document.getElementById("level");
	    var size = parseInt(e.options[e.selectedIndex].value);
	    if (size === "none") {
	      alert("Please select a level!");
	    }
	    $(".instructions").addClass("hidden");
	    $(".modal").addClass("hidden");
	    $("figure").empty();
	    var game = new Game(size);
	    var display = new Display(game, size);
	    display.setupBoard();
	    display.bindEvents();
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Display = function (game, size, $el) {
	  this.game = game;
	  this.size = size;
	  this.colors = ["red", "yellow", "pink", "green", "blue", "purple"];
	  if (this.size === 8) {
	    this.maxMoves = 15;
	  } else if (this.size === 12) {
	    this.maxMoves = 20;
	  } else {
	    this.maxMoves = 25;
	  }
	  this.moves = 0;
	};
	
	Display.prototype.setupBoard = function () {
	  var $fig = $("figure");
	  var $ul = $("<ul></ul>").addClass("grid group");
	  var $h3 = $("<h3></h3>").text("Moves: " + this.moves + "/" + this.maxMoves);
	  var floodedColor;
	  $fig.append($h3);
	  $fig.append($ul);
	
	  for (var i = 0; i < this.size * this.size; i++) {
	      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
	      var $li;
	      if (i === 0) {
	        floodedColor = randColor;
	        $li = $("<li></li>").addClass("square " + randColor + " flooded").data("pos", [i]).text(i);
	        if (this.size === 8) {
	          $li.addClass("easy-square");
	        } else if (this.size === 12) {
	          $li.addClass("med-square");
	        } else {
	          $li.addClass("large-square");
	        }
	      } else {
	        $li = $("<li></li>").addClass("square " + randColor).data("pos", [i]).text(i);
	        if (this.size === 8) {
	          $li.addClass("easy-square");
	        } else if (this.size === 12) {
	          $li.addClass("med-square");
	        } else {
	          $li.addClass("large-square");
	        }
	      }
	      $ul.append($li);
	  }
	  this.floodNeighbors(floodedColor);
	};
	
	Display.prototype.floodNeighbors = function (floodedColor) {
	  this.flood(floodedColor);
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
	  $("h3").empty().text("Moves: " + this.moves + "/" + this.maxMoves);
	  $(".flooded").each(function(i) {
	    $(this).removeClass("green blue yellow pink red purple").addClass(color);
	  });
	  this.flood(color);
	
	  this.checkIfWon();
	  this.checkIfLost();
	
	};
	
	Display.prototype.resetGame = function () {
	  this.moves = 0;
	  $("figure").empty();
	  this.setupBoard();
	};
	
	
	Display.prototype.checkIfWon = function () {
	  var game = this;
	  if ($("li.flooded").length == $("li").length) {
	    $(".desc").empty();
	    $(".det").empty();
	    $(".desc").text("You win!");
	    $(".instructions").removeClass("hidden");
	    $(".modal").removeClass("hidden");
	  }
	};
	
	Display.prototype.checkIfLost = function () {
	  var game = this;
	  if (this.moves === this.maxMoves) {
	    $(".desc").empty();
	    $(".det").empty();
	    $(".start-button").empty();
	    $(".start-button").prepend('<img src="playagain2.png" />');
	    $(".desc").text("You're out of moves!");
	    $(".instructions").removeClass("hidden");
	    $(".modal").removeClass("hidden");
	  }
	};
	
	Display.prototype.doesFlood = function(neighbors, floodedColor) {
	  var moved = false;
	    neighbors.forEach(function (n){
	      var square = $(".square").filterByData("pos", n);
	      if (square.is("." + floodedColor) && !square.is(".flooded")){
	        moved = true;
	      }
	    });
	  return moved;
	};
	
	Display.prototype.flood = function(floodedColor) {
	  var floodedPositions = $(".flooded");
	  var neighbors = this.findNeighbors(floodedPositions);
	  if (this.doesFlood(neighbors, floodedColor) === false) {
	    return;
	  }
	    neighbors.forEach(function (n){
	      var square = $(".square").filterByData("pos", n);
	      if (square.is("." + floodedColor) && !square.is(".flooded")){
	        square.addClass("flooded");
	      }
	    });
	
	    this.flood(floodedColor);
	};
	
	Display.prototype.findNeighbors = function(floodedPositions){
	  var game = this;
	  var neighbors = [];
	  floodedPositions.each(function (idx, el){
	
	    var pos = parseInt($(el).text());
	    neighbors = neighbors.concat(game.adjSquares(pos));
	  });
	  return neighbors;
	};
	
	Display.prototype.adjSquares = function (pos) {
	  var squares = [];
	  if (pos > (this.size - 1)) {
	    squares.push(pos - this.size);
	  }
	  if (pos < (this.size * (this.size - 1))) {
	    squares.push(pos + this.size);
	  }
	  if (pos % this.size !== 0) {
	    squares.push(pos - 1);
	  }
	  if ((pos + 1) % this.size !== 0) {
	    squares.push(pos + 1);
	  }
	  return squares;
	};
	
	$.fn.filterByData = function(prop, val) {
	    return this.filter(
	        function() { return $(this).data(prop)==val; }
	    );
	};
	
	module.exports = Display;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	
	function Game (size) {
	  this.board = new Board(size);
	}
	
	
	
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Board (size) {
	  this.grid = Board.makeGrid();
	  this.size = size;
	}
	
	
	Board.makeGrid = function () {
	  var grid = [];
	
	  for (var i = 0; i < this.size; i++) {
	    grid.push([]);
	    for (var j = 0; j < this.size; j++) {
	      grid[i].push(null);
	    }
	  }
	
	  return grid;
	};
	
	
	Board.prototype.print = function () {
	  var strs = [];
	  for (var rowIdx = 0; rowIdx < this.size; rowIdx++) {
	    var marks = [];
	    for (var colIdx = 0; colIdx < this.size; colIdx++) {
	      marks.push(" ");
	    }
	
	    strs.push(marks.join("|") + "\n");
	  }
	};
	
	
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map