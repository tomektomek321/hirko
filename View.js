

var View = (function() {

    var _getPos = function() {
        return pos;
    }

    var _render_char = function(ctx, posX, posY, side, color) {
        ctx.fillStyle = color;
        if(posX == null || posY == null) return;
        ctx.fillRect(posX, posY, side, side);
        //ctx.drawImage(monster, posX, posY);
    }

    var _render_charInfo = function(ctx, life, x, y, name, amount, dmg) {
        ctx.font = this.font + "px Ariel";
        ctx.fillStyle = "red";
        ctx.fillText(name + ", life: " + life + ", (" + amount + "), dmg: " +  dmg * amount, x, y - 10);
    }

    var _renderSelectedCharPosition = function(char, team) {
        var xy = char.getXY();
		var posX = (team == 1) ? xy['X'] -15 : xy['X'] + 35;
        ctx.fillStyle = "green";
        ctx.fillRect(posX, xy['Y'] + 3, 7, 7);
    }

    return {
        getPos: _getPos,
        render_char: _render_char,
        render_charInfo: _render_charInfo,
        renderSelectedCharPosition: _renderSelectedCharPosition,

        renderHoveredCharMoveArea(char) {
            ctx.beginPath();
            ctx.arc(char.centerXChar, char.centerYChar, char.getMoveArea(), 0, 2 * Math.PI);
            ctx.fillStyle = "#b7b4b4";
            ctx.fill();
            ctx.strokeStyle = "#C0C0C0";
            ctx.stroke();
        },

        renderSelecterCharMoveArea(char) {
            if(char.getAmount() == 0) return;

            ctx.beginPath();
            ctx.arc(char.centerXChar, char.centerYChar, char.getMoveArea(), 0, 2 * Math.PI);
            ctx.fillStyle = "#DCDCDC";
            ctx.fill();
            ctx.strokeStyle = "#C0C0C0";
            ctx.stroke();
        },

        endGame() {
             ctx.fillText(" GAME OVER ", 300, 10);
        },

        renderThrowRangeFraction(ctx, range, {X, Y}) {
            ctx.fillStyle = "black";
            ctx.fillText(range + " %", X, Y - 15);
        },

        renderDoubleBelt(ctx) {

            //let theta = Math.atan2(distY, distX);
            //theta *= 180/Math.PI;

            let {char, linesPos} = Spell.getExtraData();
            ctx.beginPath();
            ctx.moveTo(char.X, char.Y);
            ctx.lineTo(linesPos[0].line1endX , linesPos[0].line1endY);
            //ctx.lineTo(cursorPos.X + r * Math.cos(Math.PI * (theta - 6) / 180.0),
            //cursorPos.Y + r * Math.sin(Math.PI * (theta - 6) / 180.0));
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(char.X, char.Y);
            ctx.lineTo(linesPos[1].line1endX , linesPos[1].line1endY);
            ctx.stroke();



        }
   }


})();
