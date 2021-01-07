

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
        CharAction.renderAction(team, this);
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

        if(this.canThrow()) {
            Spell.createExtraData(ctx, this.char.nowAttack['range'], this.getPosition(), Cursor.getPos());
        }

    }

    this.renderRangeFraction = function() {
        if(Spell.getChoosen() != null && Spell.getChoosen()['name'] === "throw" && this.char.nowAttack['range'] != null) {
            View.renderThrowRangeFraction(ctx, this.char.nowAttack['range'], Cursor.getPos());
        }
    }

    this.isReachedBySpell = function(spell, {X, Y}) {

        if(spell.name == "nova") {

            if(this.hasSpellUpon("nova")) {
                return true;
            } else {
                return false;
            }
        }

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
        let tempDmg = this.char.demage;

        let x = Spell.getChoosen();

        if(this.char.nowAttack['range'] != null) {
            tempDmg = tempDmg * this.char.nowAttack['range'];
        }
        tempDmg =  (this.spellsUpon.includes("halfDamage")) ? tempDmg / 2 : tempDmg;

        return tempDmg;
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

    this.hasSpellUpon = function(spell) {

        if(typeof(spell) == 'object') {
            let x = this.spellsUpon.find(spell_ => spell_.name === spell.name);
            return (x !== undefined) ? true : false;
        } else {
            let x = this.spellsUpon.find(spell_ => spell_.name === spell);
            return (x !== undefined) ? true : false;
        }
    }

    this.removeSpellUpon = function(spell) {

        if(this.hasSpellUpon(spell)) {
            this.spellsUpon = this.spellsUpon.filter(spell_ => spell_.name !== spell.name);
            return "success";
        } else {
            return "no_such_spellUpon";
        }
    }

    this.getSelectedSpell = function() {
        return null;
    }

    this.setSpell = function(spell) {

        if(!this.hasSpellUpon(spell)) {
            this.spellsUpon.push((typeof(spell) == 'object' ? spell : {'name': spell }));
        } else {
            console.log("ALREADY SPELLED");
        }
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

    this.regenerate = function() {
        Regenerate.makeRegenerate(this);
    }

    this.getStartAmount = function() {
        return this.char.startAmount;
    }

    this.getRegenerateAmount = function() {
        let x = this.spellsUpon.filter(sp => sp.name === "regeneration");
        return x[0]['lifePerRound'];
    }
}

