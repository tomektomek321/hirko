

var CharSelector = (function() {

    var _getPos = function() {
        return pos;
    }



    return {

        selectChar(chars_, char_selected, team, callback) {

			var insur = 0;
			var found = false;

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
					found = true;
				}

				if(!found)
					char_selected++;

            } while(!found)

            return [char_selected, team];
        }



    }


})();
