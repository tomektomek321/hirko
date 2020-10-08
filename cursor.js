

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
        //console.log(pos);
        
    }

    var _resetPos = function() {
        pos.X = null,
        pos.Y = null
    }       

    return {
        getPos: _getPos,
        setPos: _setPos,

        testPos(spell) {
            pos.X = spell;
        }
    }


})();
