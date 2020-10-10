

function char(char) {

    this.char = char;

    this.state = "norm";

    this.typeOfAttack = "normal";

    this.posX;
    this.posY;

    this.centerXChar;
    this.centerYChar;

    this.hover = false;
    
    this.spellsUpon = [];

    this.setPosition = function(x, y) {

        this.posX = x;
        this.posY = y;

        this.centerXChar = this.posX + Math.floor(this.char.side / 2);
        this.centerYChar = this.posY + Math.floor(this.char.side / 2);

    }


    this.renderPosition = function(team) {
        
        var color = (team == 1) ? "red" : "blue";

        ctx = myGameArea.context;

        var life = (this.char.life * (this.char.amount - 1)) + this.char.lifeOfLast;
        
        View.render_char(ctx, this.posX, this.posY, this.char.side, color);
        View.render_charInfo(ctx, life, this.posX, this.posY, this.char.name, this.char.amount, this.char.demage);

    }


    this.isOnLine = function(lineX, lineY) {

        if((lineX >= this.posX && lineX <= this.posX + this.getSide()) && 
            (lineY >= this.posY && lineY <= this.posY + this.getSide())) {
            
            return true;

        } else {
            return false;
        }

    }

    this.isHover = function(cursor) {
        //console.log(cursor);
        if((cursor.X > this.posX && cursor.X < this.posX + this.char.side) && (cursor.Y > this.posY && cursor.Y < this.posY + this.char.side)) {
            //console.log("HOVER " + this.char.name);
            this.hover = true;
            return true;
        } else {
            this.hover = false;
            return false;
        }
    }

    this.renderHoveredCharMoveArea = function() {
        View.renderHoveredCharMoveArea(this);
    }

    this.getSide = function() {
        return this.char.side;
    }

    this.getMoveArea = function() {
        return this.char.moveArea;
    }

    this.getPosition = function() {
        return {'X':this.centerXChar, 'Y': this.centerYChar};
    }

    this.getXY = function() {
        return {'X': this.posX, 'Y': this.posY};
    }

    this.getName = function() {
        return this.char.name;
    }

    this.getFullLife = function() {
        return ((this.char.amount - 1) * this.char.life) + this.char.lifeOfLast;
    }

    this.getAmount = function() {
        return this.char.amount;
    }
	
}

