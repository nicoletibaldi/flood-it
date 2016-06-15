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

	var Display = __webpack_require__(5);
	var Game = __webpack_require__(2);
	
	$(function () {
	  var size = 14;
	  var game = new Game(size);
	  var display = new Display(game, size);
	
	  display.setupBoard();
	});


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	var MoveError = __webpack_require__(4);
	
	function Game (size) {
	  this.board = new Board(size);
	}
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map