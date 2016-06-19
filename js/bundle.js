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
	  var size = 14;
	  var game = new Game(size);
	  var display = new Display(game, size);
	
	  display.setupBoard();
	  display.bindEvents();
	  game.registerStart();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	      } else {
	        $li = $("<li></li>").addClass("square " + randColor).data("pos", [i]).text(i);
	      }
	      $ul.append($li);
	  }
	  this.floodNeighbors(floodedColor);
	};
	
	Display.prototype.floodNeighbors = function (floodedColor) {
	
	  flood(floodedColor);
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
	  flood(color);
	
	  this.checkIfWon();
	  this.checkIfLost();
	
	};
	
	Display.prototype.resetGame = function () {
	  this.moves = 0;
	  $("figure").empty();
	  this.setupBoard();
	};
	
	
	Display.prototype.checkIfWon = function () {
	  if ($("li.flooded").length == $("li").length) {
	    $(".desc").empty();
	    $(".det").empty();
	    $(".desc").text("You win!");
	    $(".instructions").removeClass("hidden");
	    $(".modal").removeClass("hidden");
	    this.resetGame();
	  }
	};
	
	Display.prototype.checkIfLost = function () {
	  if (this.moves === 25) {
	    $(".desc").empty();
	    $(".det").empty();
	    $(".start-button").empty();
	    $(".start-button").prepend('<img src="playagain2.png" />');
	    $(".desc").text("You're out of moves!");
	    $(".instructions").removeClass("hidden");
	    $(".modal").removeClass("hidden");
	    this.resetGame();
	  }
	};
	
	function doesFlood(neighbors, floodedColor) {
	  var moved = false;
	    neighbors.forEach(function (n){
	      var square = $(".square").filterByData("pos", n);
	      if (square.is("." + floodedColor) && !square.is(".flooded")){
	        moved = true;
	      }
	    });
	  return moved;
	}
	
	function flood(floodedColor) {
	  var floodedPositions = $(".flooded");
	  var neighbors = findNeighbors(floodedPositions);
	  if (doesFlood(neighbors, floodedColor) === false) {
	    return;
	  }
	    neighbors.forEach(function (n){
	      var square = $(".square").filterByData("pos", n);
	      if (square.is("." + floodedColor) && !square.is(".flooded")){
	        square.addClass("flooded");
	      }
	    });
	
	    flood(floodedColor);
	}
	
	
	function findNeighbors(floodedPositions){
	  var neighbors = [];
	  floodedPositions.each(function (idx, el){
	
	    var pos = parseInt($(el).text());
	    neighbors = neighbors.concat(adjSquares(pos));
	  });
	  return neighbors;
	}
	
	function adjSquares(pos) {
	  var squares = [];
	  if (pos > 13) {
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
	  return squares;
	}
	
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
	var MoveError = __webpack_require__(4);
	
	function Game (size) {
	  this.board = new Board(size);
	}
	
	Game.prototype.registerStart = function () {
	  $(".start-button").on("click", function (){
	    $(".instructions").addClass("hidden");
	    $(".modal").addClass("hidden");
	  });
	};
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var MoveError = __webpack_require__(4);
	
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MoveError (msg) {
	  this.msg = msg;
	}
	
	module.exports = MoveError;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map