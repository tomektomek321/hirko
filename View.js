

var View = (function() {

    var _getPos = function() {
        return pos;
    }


    var _render_char = function(ctx, posX, posY, side, color) {
        ctx.fillStyle = color;
        ctx.fillRect(posX, posY, side, side);
    } 
    
    var _render_charInfo = function(ctx, life, x, y, name, amount, dmg) {
        ctx.font = this.font + "px Ariel";
        ctx.fillStyle = "red";
        ctx.fillText(name + ", life: " + life + ", (" + amount + "), dmg: " +  dmg * amount, x, y - 10);
    }   

    var _renderSelectedCharPosition = function(char, team) {
        var xy = char.getXY();
		var posX = (team == 1) ? xy['X'] -15 : xy['X'] + 25;
        ctx.fillStyle = "green";
        ctx.fillRect(posX, xy['Y'] + 3, 7, 7);
    }

    return {
        getPos: _getPos,
        render_char: _render_char,
        render_charInfo: _render_charInfo,
        renderSelectedCharPosition: _renderSelectedCharPosition,







    }


})();
