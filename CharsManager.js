

var CharsManager = (function() {

	var team = 1;

	var char_selected = 0;

	var hoveredChar = null;

	var startGame = false;

	var moralsData = {
		nowOverride: false,
		madedIndex: null,
		bonusTab: [],
		team1queue: [],
		team2queue: [],
		tempTeamIndex: null,
		tempCharIndex: null
	}

    return {

		getMoralsData() { return moralsData },

		getHoveredChar() { return hoveredChar; },

		getChar(team_, sel) {
			return chars[team_][sel];
		},

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
						hoveredChar = chars[i][j];
						InfoBox.setHoveredChar(hoveredChar);
						updateGameArea();
						return;
					}
				}
			}

			hoveredChar = null;
			//updateGameArea();

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

			if(!startGame) {
				startGame = true;
				this.countMorals();
				if(moralsData.bonusTab.length == 0) {
					chars_ = chars;
				}
			} else {
				char_selected++;
			}

			do {
				if(insur > 30) break;
				insur++;

				// next is bigger than length
				if( (moralsData.nowOverride == false) && char_selected > chars_[team].length - 1) {
					char_selected = 0;
					team = (team == 1) ? 2 : 1;
					if(team == 1) {
						this.countMorals();
					}
				}

				if(moralsData.nowOverride) {
					if(moralsData.bonusTab[moralsData.madedIndex]) {
						let tempNextChar = moralsData.bonusTab[moralsData.madedIndex];
						team = tempNextChar[0];
						char_selected = tempNextChar[1];
						moralsData.madedIndex++;

						if(moralsData.madedIndex > moralsData.bonusTab.length) {
							moralsData.nowOverride = false;
						}
						break;
					} else {
						moralsData.nowOverride = false;
						team = 1;
						char_selected = 0;

					}

				}

				if(moralsData.bonusTab.filter(i => (i[0] === team && i[1] === char_selected)).length > 0) {
					char_selected++;
					continue;
				}else if(chars_[team][char_selected].getAmount() == 0) {
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

		},

		countMorals() {

			moralsData.team1queue = [];
			moralsData.team2queue = [];
			for(var i=1; i < chars.length; i++) {
				for(var j=0; j < chars[i].length; j++) {
					if(i==1) { moralsData.team1queue.push(chars[i][j].getMorals()) }
					if(i==2) { moralsData.team2queue.push(chars[i][j].getMorals()) }
				}
			}

			let t1max = Math.max(...moralsData.team1queue);
			let t1min = Math.min(...moralsData.team1queue);

			let t2max = Math.max(...moralsData.team2queue);
			let t2min = Math.min(...moralsData.team2queue);

			let queueBonus = [];

			if(t1max == 0 && t1min == 0 && t2max == 0 && t2min == 0) return;

			let _t = this;
			moralsData.team1queue = moralsData.team1queue.map(function(val, i) {
				let x, ret = 0;
				if(val > 0) {
					x = getRndInteger(0, 5);
					_t.getChar(1, i).setMorals(x);
					if(x < val) {
						queueBonus.push([1, i]);
						_t.getChar(1, i).setMoralsBonus(x);
						ret = true
					}
				}

				return ret;
			});

			moralsData.team2queue = moralsData.team2queue.map(function(val, i) {
				let x, ret = 0;
				if(val > 0) {
					x = getRndInteger(0, 5);
					_t.getChar(2, i).setMorals(x);
					if(x < val) {
						queueBonus.push([2, i]);
						_t.getChar(2, i).setMoralsBonus(x);
						ret = true
					}
				}
				return ret;
			});

			queueBonus = randomizeArray(queueBonus);

			moralsData.bonusTab = [...queueBonus];

			if(moralsData.bonusTab.length == 0) {
				this.setNoOverride();
				return;
			}

			this.setStartOverride();
		},

		setStartOverride() {
			moralsData.nowOverride = true;
			moralsData.madedIndex = 0;
		},


		setNoOverride() {
			moralsData.nowOverride = false;
			moralsData.madedIndex = null;
			moralsData.bonusTab = [];
			moralsData.antybonusTab = [];
			moralsData.team1queue = [];
			moralsData.team2queue = [];
		}
    }

})();
