


var gameController = (function() {

var team = 1;
var char_selected = 0;
var hoveredChar = null;

showSpells_Btns = function() {

	let spells;
	if(chars[team][char_selected].canSpell()) {
		spells = chars[team][char_selected].getSpells();
		///*let sp1 = */spells.unshift({'name': 'move/attack'});

		var spellki = [{'name': 'move/attack'}, ...spells];

		//console.log(spellki);
		Spell.showSpells_Btns(spellki);
	} else if(chars[team][char_selected].canThrow()) {
		spells = [ {'name': 'move/attack'}, {'name': 'throw'} ];
		Spell.showSpells_Btns(spells);
	}

}

return {

	endGame() {
		View.endGame();
	},

	renderSelectedCharPosition() {
		View.renderSelectedCharPosition(chars[team][char_selected], team);
	},

	renderSelecterCharMoveArea() {
		View.renderSelecterCharMoveArea(chars[team][char_selected]);
	},

	next_character() {
		Spell.resetBtns();
		Spell.resetSpell();

		var odp = CharSelector.selectChar(chars, char_selected, team);
		char_selected = odp[0];
		team = odp[1];

		InfoBox.setSelectedChar(chars[team][char_selected]);
		showSpells_Btns();
		updateGameArea();

	},

	getSelectedChar() {
		return chars[team][char_selected];
	},

	checkHover() {

		for(var i=1; i < chars.length; i++) {

			for(var j=0; j < chars[i].length; j++) {

				if(chars[i][j].isHover(Cursor.getPos())) {
					hoveredChar = chars[i][j];
					InfoBox.setHoveredChar(hoveredChar);
					updateGameArea();
					return;
				}
			}
		}

		hoveredChar = null;
		updateGameArea();

	},

	isCharFromSelectedTeam(_team) {
		if(_team === team) {
			return true;
		} else {
			return false;
		}
	},

	actionCharacter() {
		if(Spell.hasSpell()) { // click while using spell
			var oponent = (team == 1) ? 2 : 1;
			let noUpdate = false;

			if(Spell.getChoosen().name == "regeneration") {
				let countRegenerate = Regenerate.countRegenerate(char_selected, team);
				console.log(countRegenerate);

				hoveredChar.setSpell({...Spell.getChoosen(), "lifePerRound": countRegenerate});




			} else if(Spell.getChoosen().name == "halfMove"
						|| Spell.getChoosen().name == "halfDamage"
						|| Spell.getChoosen().name == "roundPause") {

				console.log(Spell.getChoosen());

				if(hoveredChar.hasSpellUpon(Spell.getChoosen())) {
					noUpdate = true;
				} else {
					hoveredChar.setSpell(Spell.getChoosen());
				}



			} else if(Spell.getChoosen().name == "throw") {

				this.throwAction();
				return;

			} else if(Spell.getChoosen().name == "nova") {

				for(var i = 0; i < chars[oponent].length; i++) {

					var tempChar = chars[oponent][i];

					if(chars[oponent][i].isReachedBySpell(Spell.getChoosen(), Cursor.getPos())) {
						Attack.defaultAttack(chars[team][char_selected], tempChar)
					}
				}

				Spell.resetSpell();
				Spell.resetBtns();
				this.next_character();
				updateGameArea();

				return;

			} else {

				for(var i = 0; i < chars[oponent].length; i++) {

					var tempChar = chars[oponent][i];

					if(chars[oponent][i].isReachedBySpell(Spell.getChoosen(), Cursor.getPos())) {

						Attack.defaultAttack(chars[team][char_selected], tempChar);
					}
				}
			}

			if(!noUpdate) {
				console.log("bb");
				Spell.resetSpell();
				Spell.resetBtns();
				this.next_character();
			}

			updateGameArea();

		} else if(hoveredChar == null) { // move
			Move.makeMove(chars[team][char_selected], Cursor.getPos(), this.next_character);
		} else {
			var selected_enemy = hoveredChar;

			if(selected_enemy.team == team) { // click on own team
				return;
			} else {
				this.goCloseAndAttack();

			}

		}

	},

	renderHoveredCharMoveArea() {
		if(hoveredChar != null)
			hoveredChar.renderHoveredCharMoveArea();
	},

	setThrowRangeFraction() {

		if(chars[team][char_selected].canThrow() && Spell.getChoosen() != null && Spell.getChoosen()['name'] === "throw") {
			chars[team][char_selected].setThrowRange_Fraction(Cursor.getPos());
		}

	},

	renderRangeFraction() {
		chars[team][char_selected].renderRangeFraction();
	},



	renderSpell() {

		Spell.renderSpell();


	},

	renderSpellsAbove() {
		Spell.renderSpellsAbove();
	},

	throwAction() {

		var selected_enemy = hoveredChar;

		Move.throw(chars[team][char_selected], selected_enemy)
			.then(res => {
				console.log(res);
				return Attack.defaultAttack(chars[team][char_selected], selected_enemy);
			})
			.then(res => {
				console.log(res);
				Spell.resetSpell();
				Spell.resetBtns();
				this.next_character();
				updateGameArea();
			});
	},

	goCloseAndAttack() {

		var _t = this;
		var selected_enemy = hoveredChar;

		Move.moveTo(chars[team][char_selected], selected_enemy)
		.then(res => {
			return Attack.defaultAttack(chars[team][char_selected], selected_enemy);
		})
		.then(res => {
			_t.next_character();
		})
	},




}
})();







