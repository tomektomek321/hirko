
var Move = (function() {

    var divide_interv = 40;

    var _getPos = function() {
        return pos;
    }

	is_animation = false;
	nowThrow = false;

    return {
        getPos: _getPos,

        makeMove(char, pos, callback) {


			var moveArea = char.getMoveArea();

			var start_pos = char.getPosition();

			var z = Math.floor(Math.sqrt(Math.pow(pos.X - start_pos.X, 2) + Math.pow(pos.Y - start_pos.Y, 2)));
			
            if(z > moveArea) { console.log("Nie mozna tak daleko"); return; }
            
            var divide_interv = 85;
            var halfSide = char.getSide() / 2;

			var x_len = ((pos.X - start_pos.X)) / divide_interv;
            var y_len = ((pos.Y - start_pos.Y)) / divide_interv;


            console.log(x_len);
            console.log(y_len);


			var next_posX = start_pos.X;
            var next_posY = start_pos.Y;
            

			var cl = 1;

            is_animation = true;
            
			
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



    }




})();














