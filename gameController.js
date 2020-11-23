


var gameController = (function() {

var team = 1;
var char_selected = 1;
var hoveredChar = null;

return {

	endGame() {
		View.endGame();
	},

	renderSelectedCharPosition() {
		View.renderSelectedCharPosition(chars[team][char_selected - 1], team);
	},

	renderSelecterCharMoveArea() {
		View.renderSelecterCharMoveArea(chars[team][char_selected - 1]);
	},

	next_character() {
		Spell.resetBtns();
		Spell.resetSpell();

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
		if(Spell.hasSpell()) { // click while using spell
			var oponent = (team == 1) ? 2 : 1;

			if(Spell.getChoosen().name == "halfMove" || Spell.getChoosen().name == "halfDamage") {

				hoveredChar.setSpell(Spell.getChoosen().name);

			} else {

				for(var i = 0; i < chars[oponent].length; i++) {

					var tempChar = chars[oponent][i];

					if(chars[oponent][i].isReachedBySpell(Spell.getChoosen(), Cursor.getPos())) {

						Attack.defaultAttack(chars[team][char_selected - 1], tempChar);
					}
				}
			}

			Spell.resetSpell();
			Spell.resetBtns();
			this.next_character();
			updateGameArea();

		} else if(hoveredChar == null) { // move
			Move.makeMove(chars[team][char_selected - 1], Cursor.getPos(), this.next_character);
		} else {
			var selected_enemy = hoveredChar;

			if(selected_enemy.team == team) {
				return;
			} else {
				var _t = this;

				if(chars[team][char_selected - 1].canThrow()) {

					Move.throw(chars[team][char_selected - 1], selected_enemy, function() {

						Attack.defaultAttack(chars[team][char_selected - 1], selected_enemy);
						_t.next_character();
					})

				} else {

					Move.moveTo(chars[team][char_selected - 1], selected_enemy, function() {

						Attack.defaultAttack(chars[team][char_selected - 1], selected_enemy);
						_t.next_character();
					})

				}

			}

		}

	},

	renderHoveredCharMoveArea() {
		if(hoveredChar != null)
			hoveredChar.renderHoveredCharMoveArea();
	},

	setThrowRangeFraction() {

		if(chars[team][char_selected - 1].canThrow()) {
			chars[team][char_selected - 1].setThrowRange_Fraction(Cursor.getPos());
		}

	},

	showSpells_Btns() {
		let spells;
		if(chars[team][char_selected - 1].canSpell()) {
			spells = chars[team][char_selected - 1].getSpells();

			Spell.showSpells_Btns(spells);
		} else if(chars[team][char_selected - 1].canThrow()) {
			spells = [{'name': 'throw'}, {'name': 'normal hit'}];
			Spell.showSpells_Btns(spells);
		}



	},




}
})();







