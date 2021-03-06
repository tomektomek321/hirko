
var Spell = (function() {

	var spell = {
		choosen: null,
		spellsBox: null,
		extraData: {},
	}

	var _getChoosen = function() {
		return spell.choosen;
	}


	var _resetSpell = function() {
		_resetBtns();
		spell.choosen = null;
    }

    var _setChoosen = function(spell_) {
		//console.log(spell_);	// spell makes recursion xD

		if(spell_.name == "nova") {
			Nova.createExtraData(
				{
					"range": spell_.range,
					"damage": spell_.damage,
				}
			)
		}

		if(spell_.name == "move/attack") {
			spell.choosen = null;
		} else {
			spell.choosen = spell_;
		}
	}

	var _setExtraData = function(_extra) {
		spell.extraData = _extra;
	}

	var _getExtraData = function() {
		return spell.extraData;
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
		setExtraData: _setExtraData,
		getExtraData: _getExtraData,
        showSpells_Btns: _showSpells_Btns,
        hasSpell: _hasSpell,
		resetBtns: _resetBtns,
		resetSpell: _resetSpell,

		renderSpell() {
			if(spell.choosen == null) return;

			if(spell.choosen.name == "fireBall") {
				FireBallView.render();
			}
		},

		renderSpellsAbove() {
			if(spell.choosen == null) return;

			if(spell.choosen.name == "nova") {

				let char = CharsManager.getSelectedChar();

				ctx.beginPath();
				ctx.arc(char.centerXChar, char.centerYChar, 115, 0, 2 * Math.PI);
				ctx.fillStyle = "#7CB9E8";
				ctx.fill();
				ctx.strokeStyle = "#4B5320";
				ctx.stroke();
			}
		},

		createExtraData(ctx, range, charPos, cursorPos) {
			if(spell.choosen == null) return;

			if(spell.choosen.name == "fireBall") {
				FireBall.setData();
				return;
			}
/*
			let matrix = [];

            if(charPos.X - cursorPos.X < 0) {
                matrix.push(true);
            } else {
                matrix.push(false);
            }

            if(charPos.Y - cursorPos.Y > 0) {
                matrix.push(true);
            } else {
                matrix.push(false);
            }

            let shiftX, shiftY;
            let shiftX2, shiftY2;
            if(matrix[0] && matrix[1]) {
                shiftX = (cursorPos.X - 25)
                shiftX2 = (cursorPos.X + 25);

                shiftY = (cursorPos.Y - 25)
                shiftY2 = (cursorPos.Y + 25);
            } else if(matrix[0] && !matrix[1]) {
                shiftX = (cursorPos.X + 25)
                shiftX2 = (cursorPos.X - 25);

                shiftY = (cursorPos.Y - 25)
                shiftY2 = (cursorPos.Y + 25);
            } else if(!matrix[0] && !matrix[1]) {
                shiftX = (cursorPos.X + 25)
                shiftX2 = (cursorPos.X - 25);

                shiftY = (cursorPos.Y + 25)
                shiftY2 = (cursorPos.Y - 25);
            } else if(!matrix[0] && matrix[1]) {
                shiftX = (cursorPos.X + 25)
                shiftX2 = (cursorPos.X - 25);

                shiftY = (cursorPos.Y - 25)
                shiftY2 = (cursorPos.Y + 25);
            }

            spell.extraData = {
                'char': charPos,
                'cursor': cursorPos,
                'linesPos': [
                    {'line1endX': shiftX, 'line1endY': shiftY},
                    {'line1endX': shiftX2, 'line1endY': shiftY2},
                ],
                'matrix': matrix,
            }
*/

		}
	}

})();










