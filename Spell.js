
var Spell = (function() {

	var spell = {
		choosen: null,
		spellsBox: null
	}

	var _getChoosen = function() {
		return spell.choosen;
	}


	var _resetSpell = function() {
		_resetBtns();
		spell.choosen = null;
    }

    var _setChoosen = function(spell_) {	// spell makes recursion xD
		if(spell_.name == "normal hit") {
			spell.choosen = null;
		} else {
			spell.choosen = spell_;
		}
	}

	var _resetBtns = function() {
		var existed = document.getElementsByClassName("spellBtn");

		for(var j = existed.length - 1; j >= 0; j--) {
			spell.spellsBox.removeChild(existed[j]);
		}
	}

	var _showSpells_Btns = function(spells) {

		spell.spellsBox = document.getElementById("spellsBtns");
		_resetBtns();

		for(var i=0; i < spells.length; i++) {

			(function(j) {

				var btn = document.createElement("input");

					btn.setAttribute("type", "button");
					if(j == 0) {
						btn.setAttribute("class", "spellBtn btn btn-primary active");
					} else {
						btn.setAttribute("class", "spellBtn btn btn-primary");
					}
					btn.setAttribute("value", spells[j].name);

					btn.addEventListener("click", function() {
						_setChoosen(spells[j]);
						this.classList.toggle("active");
					});

				spell.spellsBox.appendChild(btn);

			})(i);

		}

    }

    var _hasSpell = function() {
		return (spell.choosen != null) ? true : false;
	}


	return {
		getChoosen: _getChoosen,
		setChoosen: _setChoosen,
        showSpells_Btns: _showSpells_Btns,
        hasSpell: _hasSpell,
		resetBtns: _resetBtns,
		resetSpell: _resetSpell,

		renderSpell() {
			if(spell.choosen == null) return;

			if(spell.choosen.name == "fireBall") {
				const { X, Y } = Cursor.getPos();

				var row = -spell.choosen.range;
				var seat = -spell.choosen.range;
				for(var i = 1; i < 50; i++) {

					ctx.fillStyle = "red";
					ctx.fillRect(X - seat, Y - row, 3, 3);

					seat = seat + 10;

					if(i % 7 == 0) {
						row += 10;
						seat = -spell.choosen.range;
					}

				}

			}

		}
	}

})();










