


var gameController = (function() {

var team = 1;
var char_selected = 1;
var stateGame = "normal";


return {

	renderSelectedCharPosition() {
		View.renderSelectedCharPosition(chars[team][char_selected - 1], team);
	},

	next_character() {

		var odp = CharSelector.selectChar(chars, char_selected, team);
		char_selected = odp[0];
		team = odp[1];
		
		updateGameArea();

	},


	actionCharacter() {
		Move.makeMove(chars[team][char_selected - 1], Cursor.getPos(), this.next_character);


	},

}
})();







