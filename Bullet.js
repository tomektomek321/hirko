

var Bullet = (function() {

    var pos = {
        X: null,
        Y: null
    }

    var width = 5;
    var height = 5;

    var _getPos = function() {
        return pos;
    }

    var _setPos = function(x, y) {
        pos.X = x;
        pos.Y = y;
    }

    return {
        getPos: _getPos,
        setPos: _setPos,

        makeThrow() {
            //throwNow = true;
        },

        resetThrow() {
            //throwNow = false;
            pos.X = null;
            pos.Y = null;
        },

        render() {
            if(pos.X != null) {
                ctx.fillStyle = "red";
                ctx.fillRect(pos.X, pos.Y, width, height);
            }
        }
    }


})();
