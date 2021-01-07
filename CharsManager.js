

var CharsManager = (function() {

	var team = 1;

	var char_selected = 0;

	var hoveredChar = null;

    return {

		getHoveredChar() { return hoveredChar; },

		getSelectedChar() {
			return chars[team][char_selected];
		},

		getSelectedTeam() {
			return team;
		},

		getSelectedTeamAndChar() {
			return [team, char_selected];
		},

		checkHover() {

			for(var i=1; i < chars.length; i++) {

				for(var j=0; j < chars[i].length; j++) {

					if(chars[i][j].isHover(Cursor.getPos())) {
						console.log(3);
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


        selectChar(chars_) {

			var insur = 0;
			var found = false;

			let nowSelectedChar = char_selected;
			let nowSelectedTeam = team;
			console.log(nowSelectedChar);
			console.log(nowSelectedTeam);

			char_selected++;

			do {
				if(insur > 30) break;
				insur++;

				// next is bigger than length
				if((char_selected > 0) && (char_selected > chars_[team].length - 1)) {
					char_selected = 0;
					team = (team == 1) ? 2 : 1;
				}

				if(chars_[team][char_selected].getAmount() == 0) {
					char_selected++;
					continue;
				} else {
					if(chars_[team][char_selected].hasSpellUpon({"name": "regeneration"})) {
						chars_[team][char_selected].regenerate();
					}

					if(chars_[team][char_selected].hasSpellUpon({"name": "roundPause"})) {
						chars_[team][char_selected].removeSpellUpon({"name": "roundPause"});
						char_selected++;
						continue;
					} else {
						found = true;
					}
				}

				if(!found)
					char_selected++;

            } while(!found)

        }
    }

})();
