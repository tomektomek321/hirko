

function char(char_, team) {

    this.char = char_;

    this.team = team;

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

        let ctx = myGameArea.context;

        var color = (team == 1) ? "red" : "blue";

        if(Spell.hasSpell() && Spell.getChoosen().name === "fireBall" && !gameController.isCharFromSelectedTeam(this.team)) {

            var spell = Spell.getChoosen();
            const { X, Y } = Cursor.getPos();

            var area = {
                'X': X - spell.range,
                'Y': Y - spell.range,
                'side': spell.range * 2
            }

            if((area.X + area.side + 3 >= this.posX && area.X <= this.posX + this.char.side) &&
                    (area.Y + area.side + 3 >= this.posY && area.Y <= this.posY + this.char.side)) {
                color = "yellow";
            }

        } else if(Spell.hasSpell() && Spell.getChoosen().name === "doubleBelt" && !gameController.isCharFromSelectedTeam(this.team)) {

            let extr = Spell.getExtraData();
            //console.log(this.char.name);

            let curs = Cursor.getPos();

            for(let i=0; i < extr.linesPos.length; i++) {
                let cuts = 35;

                let x1 = Math.abs(extr.linesPos[i].line1endX - extr.char.X);
                let y1 = Math.abs(extr.linesPos[i].line1endY - extr.char.Y);

                let x1cut = x1 / cuts;
                let y1cut = y1 / cuts;

                for(let j=1; j <= cuts; j++) {
                    if(j > 34) {
                        //console.log( extr.char.Y + (y1cut*j) );
                        //console.log(this.posY);
                        //console.log("========");
                    }

                    if(extr.matrix[0] && extr.matrix[1]) { // 1
                        if((( this.posX <= extr.char.X + (x1cut*j) )) && ((this.posX + this.char.side) > (extr.char.X) + (x1cut*j))  &&
                        (( this.posY <= extr.char.Y - (y1cut*j) ))  && ((this.posY + this.char.side) > (extr.char.Y) - (y1cut*j))) {

                            console.log("przcina");
                            color = "yellow";
                        }

                    } else if(extr.matrix[0] && !extr.matrix[1]) { // prawy dol
                        if((( this.posX <= extr.char.X + (x1cut*j) )) && ((this.posX + this.char.side) > (extr.char.X) + (x1cut*j))  &&
                        (( this.posY <= extr.char.Y + (y1cut*j) ))  && ((this.posY + this.char.side) > (extr.char.Y) + (y1cut*j))) {

                            console.log("przcina");
                            color = "yellow";
                        }
                    } else if(!extr.matrix[0] && !extr.matrix[1]) { // lewy dol
                        if((( this.posX <= extr.char.X - (x1cut*j) )) && ((this.posX + this.char.side) > (extr.char.X) - (x1cut*j))  &&
                        (( this.posY <= extr.char.Y + (y1cut*j) ))  && ((this.posY + this.char.side) > (extr.char.Y) + (y1cut*j))) {

                            console.log("przcina");
                            color = "yellow";
                        }
                    } else if(!extr.matrix[0] && extr.matrix[1]) { // lewy gora
                        if((( this.posX <= extr.char.X - (x1cut*j) )) && ((this.posX + this.char.side) > (extr.char.X) - (x1cut*j))  &&
                        (( this.posY <= extr.char.Y - (y1cut*j) ))  && ((this.posY + this.char.side) > (extr.char.Y) - (y1cut*j))) {

                            console.log("przcina");
                            color = "yellow";
                        }
                    }


                }

                View.renderDoubleBelt(ctx);
            }

        }



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

    this.setThrowRange_Fraction = function({X, Y}) {

        var z = Math.floor(Math.sqrt(Math.pow(X - this.centerXChar, 2) + Math.pow(Y - this.centerYChar, 2)));

        var isRange = z - this.char.throwRange;

        if(isRange < 0) {
            this.char.nowAttack['range'] = 1;
        } else if(isRange > 0 && isRange < 100) {
            this.char.nowAttack['range'] = 0.50;
        } else if(isRange > 100 /*&& isRange > -200*/) {
            this.char.nowAttack['range'] = 0.25;
        }

        if(this.canThrow() && this.char.nowAttack['range'] != null) {
            //View.renderThrowRangeFraction(ctx, this.char.nowAttack['range'], Cursor.getPos());
            Spell.setChoosen({'name': "doubleBelt"});
            Spell.createExtraData(ctx, this.char.nowAttack['range'], this.getPosition(), Cursor.getPos());
        }

    }

    this.isReachedBySpell = function(spell, {X, Y}) {

        var rectArea = {
            'X': X - spell.range,
            'Y': Y - spell.range,
            'side': spell.range * 2
        }

        return ((rectArea.X + rectArea.side + 3 >= this.posX && rectArea.X <= this.posX + this.getSide()) &&
            (rectArea.Y + rectArea.side + 3 >= this.posY && rectArea.Y <= this.posY + this.getSide()))


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
        return (this.spellsUpon.includes("halfDamage")) ? this.char.demage / 2 : this.char.demage;
    }

    this.getLife = function() {
        return (this.spellsUpon.includes("halfLife")) ? this.char.life / 2 : this.char.life;
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
        return (this.spellsUpon.includes("halfMove")) ? this.char.moveArea / 2 : this.char.moveArea;
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

    this.canThrow = function() {
        return (this.char.throw) ? true : false;
    }

    this.canSpell = function() {
        return (this.char.magic && this.char.magic.length > 0) ? true : false;
    }

    this.getSpells = function() {
        return this.char.magic;
    }

    this.getSelectedSpell = function() {
        return null;
    }

    this.setSpell = function(spell) {
        this.spellsUpon.push(spell);
    }

    this.getSettedSpells = function() {
        return this.spellsUpon;
    }

    this.getTeam = function() {
        return this.team;
    }

    this.setTeam = function(team) {
        this.team = team
    }
}

