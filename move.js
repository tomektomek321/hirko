
var Move = (function() {

    var _getPos = function() {
        return pos;
	}

	var divide_interv = 40;
	var is_animation = false;
	var nowThrow = false;

    return {
        getPos: _getPos,

        makeMove(char, pos, callback) {


			var moveArea = char.getMoveArea();

			var start_pos = char.getPosition();

			var z = Math.floor(Math.sqrt(Math.pow(pos.X - start_pos.X, 2) + Math.pow(pos.Y - start_pos.Y, 2)));

            if(z > moveArea) { console.log("Nie mozna tak daleko"); return; }

			//var divide_interv = 85;

			var x_len = (pos.X - start_pos.X) / divide_interv;
            var y_len = (pos.Y - start_pos.Y) / divide_interv;

			var next_posX = start_pos.X;
            var next_posY = start_pos.Y;

			var cl = 1;

			var counterDivider = 0;
			var intervalek = setInterval(function() {

                cl++;
                counterDivider++;

				next_posX = next_posX + x_len;
				next_posY = next_posY + y_len;

				char.setPosition(next_posX - 7, next_posY - 7);

                updateGameArea();

				if(cl > 90) clearInterval(intervalek);

				if(counterDivider > divide_interv) {

					clearInterval(intervalek);
					callback();
				}

			}, 10);

        },

		moveTo(char, hoveredChar) {

			return new Promise((resolve, reject) => {

				const {X , Y} = Cursor.getPos();
				console.log(X, Y);

				var aim_char = hoveredChar;

				var aim_pos = hoveredChar.getXY();

				var sel_pos = char.getXY();

				var moveArea = char.getMoveArea();

				var z = Math.floor(Math.sqrt(Math.pow(X - sel_pos.X, 2) + Math.pow(Y - sel_pos.Y, 2)));

				if(z > moveArea) { console.log("Nie mozna tak daleko"); reject("nieOK1"); return; }

				var x_len = (aim_pos.X - sel_pos.X) / 70;
				var y_len = (aim_pos.Y - sel_pos.Y) / 70;

				var next_posX = sel_pos.X;
				var next_posY = sel_pos.Y;
				var cl = 1;

				var intervalek = setInterval(function() {
					cl++;


					char.setPosition(next_posX, next_posY);

					var height = char.getSide();

					updateGameArea();

					if((next_posY + height + 3 > aim_pos.Y && next_posY < aim_pos.Y + aim_char.getSide() + 3) &&
						(next_posX + height + 3 > aim_pos.X && next_posX < aim_pos.X + aim_char.getSide() + 3) ) {

						resolve("ok1");
						clearInterval(intervalek);
					}

					if(cl > 160) {clearInterval(intervalek);resolve("ok1");}


					next_posX = next_posX + x_len;
					next_posY = next_posY + y_len;

				}, 25);

			});

		},



		throw(char, aim_char) {

			return new Promise((resolve, reject) => {

				var {X, Y} = aim_char.getXY();

				var sel_pos = char.getXY();

				var x_len = (X - sel_pos.X) / divide_interv;
				var y_len = (Y - sel_pos.Y) / divide_interv;

				var next_posX = sel_pos.X;
				var next_posY = sel_pos.Y;
				var cl = 1;

				//is_animation = true;

				var intervalek = setInterval(function() {


					Bullet.setPos(next_posX, next_posY);

					var height = char.getSide();

					if((next_posY + height > Y && next_posY < Y + aim_char.getSide()) &&
						(next_posX + height > X && next_posX < X + aim_char.getSide()) ) {
							Bullet.resetThrow();
							resolve("OK1")
							clearInterval(intervalek);
					}

					if(cl > 160) {clearInterval(intervalek);} cl++;

					updateGameArea();

					next_posX = next_posX + x_len;
					next_posY = next_posY + y_len;


				}, 5);

			});
		}

    }




})();














