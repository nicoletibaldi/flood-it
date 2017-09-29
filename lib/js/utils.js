var Constants = require('./constants');

function determineBoardSize (selectedLevel) {
	if (selectedLevel === Constants.EASY) {
		return Constants.EASY_GRID_SIZE;
	} else if (selectedLevel === Constants.MEDIUM) {
		return Constants.MEDIUM_GRID_SIZE;
	} else if (selectedLevel === Constants.HARD) {
		return Constants.HARD_GRID_SIZE;
	}
};

module.exports = Utils;
