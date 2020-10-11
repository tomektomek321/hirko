

var Cursor = (function() {

    var pos = {
        X: null,
        Y: null
    }

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

        testPos(spell) {
            pos.X = spell;
        }
    }

})();
