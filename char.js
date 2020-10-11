

function char(char_) {

    this.char = char_;

    this.state = "norm";

    this.typeOfAttack = "normal";

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

        let ctx = myGameArea.context;

        var life = (this.char.life * (this.char.amount - 1)) + this.char.lifeOfLast;

        View.render_char(ctx, this.posX, this.posY, this.char.side, color);
        View.render_charInfo(ctx, life, this.posX, this.posY, this.char.name, this.char.amount, this.char.demage);

    }


    this.isOnLine = function(lineX, lineY) {
        return ((lineX >= this.posX && lineX <= this.posX + this.getSide()) && (lineY >= this.posY && lineY <= this.posY + this.getSide())) ? true : false;
    }

    this.isHover = function(cursor) {
        if((cursor.X > this.posX && cursor.X < this.posX + this.char.side) && (cursor.Y > this.posY && cursor.Y < this.posY + this.char.side)) {
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

    this.isDead = function() {
        return (this.char.amount === 0) ? true : false;
    }

    this.makeDead = function() {

        this.char.life = 0;
        this.char.lifeOfLast = 0;
        this.char.amount = 0;
        this.posX = null;
        this.posY = null;
        this.centerXChar = null;
        this.centerYChar = null;

    }

    this.attacked = function(demage) {
        this.char.life -= demage;
    }

    this.getDamage = function() {
        return this.char.demage;
    }

    this.getLife = function() {
        return this.char.life;
    }

    this.getLifeOfLast = function() {
        return this.char.lifeOfLast;
    }

    this.setLifeOfLast = function(val) {
        this.char.lifeOfLast = val;
    }

    this.returnFullDamage = function() {
        return this.char.amount * this.char.demage;
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
        return this.char.name; // hehe
    }

    this.getFullLife = function() {
        return ((this.char.amount - 1) * this.char.life) + this.char.lifeOfLast;
    }

    this.getAmount = function() {
        return this.char.amount;
    }

    this.setAmount = function(val) {
        this.char.amount = val;
    }
}

