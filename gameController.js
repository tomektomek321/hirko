


var gameController = (function() {

var team = 1;
var char_selected = 1;
var stateGame = "normal";
var hoveredChar = null;


return {

	renderSelectedCharPosition() {
		View.renderSelectedCharPosition(chars[team][char_selected - 1], team);
	},

	renderSelecterCharMoveArea() {
		View.renderSelecterCharMoveArea(chars[team][char_selected - 1]);
	},

	next_character() {

		var odp = CharSelector.selectChar(chars, char_selected, team);
		char_selected = odp[0];
		team = odp[1];
		
		updateGameArea();

	},

	checkHover() {
		
		for(var i=1; i < chars.length; i++) {

			for(var j=0; j < chars[i].length; j++) {
				
				if(chars[i][j].isHover(Cursor.getPos())) {
					hoveredChar = chars[i][j];
					updateGameArea();
					return;
				}

			}

		}

		hoveredChar = null;
		updateGameArea();

	},


	actionCharacter() {
		Move.makeMove(chars[team][char_selected - 1], Cursor.getPos(), this.next_character);


	},

	renderHoveredCharMoveArea() {
		if(hoveredChar != null)
			hoveredChar.renderHoveredCharMoveArea();

	}

}
})();







