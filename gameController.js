

var gameController = (function() {

return {

	showSpells_Btns() {

		let spells;
		if(CharsManager.getSelectedChar().canSpell()) {
			spells = CharsManager.getSelectedChar().getSpells();

			var spellki = [{'name': 'move/attack'}, ...spells];

			Spell.showSpells_Btns(spellki);
		} else if(CharsManager.getSelectedChar().canThrow()) {
			spells = [ {'name': 'move/attack'}, {'name': 'throw'} ];
			Spell.showSpells_Btns(spells);
		}

	},

	endGame() {
		View.endGame();
	},

	renderSelectedCharPosition() {
		View.renderSelectedCharPosition(CharsManager.getSelectedChar(), CharsManager.getSelectedTeam());
	},

	renderSelecterCharMoveArea() {
		View.renderSelecterCharMoveArea(CharsManager.getSelectedChar());
	},

	renderHoveredCharMoveArea() {
		let hovC = CharsManager.getHoveredChar();
		if(hovC != null) {
			hovC.renderHoveredCharMoveArea();
		}
	},

	setThrowRangeFraction() {

		if(CharsManager.getSelectedChar().canThrow() && Spell.getChoosen() != null && Spell.getChoosen()['name'] === "throw") {
			CharsManager.getSelectedChar().setThrowRange_Fraction(Cursor.getPos());
		}
	},

	renderRangeFraction() {
		CharsManager.getSelectedChar().renderRangeFraction();
	},


	renderSpell() {
		Spell.renderSpell();
	},

	renderSpellsAbove() {
		Spell.renderSpellsAbove();
	},

}
})();







