

// name, team, life, amount, moveArea, height_Width, demage

function giermek(amount) {
    this.name = "giermek";
    this.life = 20;
    this.lifeOfLast = 20;
    this.moveArea = 630;
    this.side = 10;
    this.demage = 5;
    this.throw = false;
    this.amount = amount;
    this.nowAttack = {};
}


function dragon(amount) {
    this.name = "dragon";
    this.life = 220;
    this.lifeOfLast = 220;
    this.moveArea = 280;
    this.side = 20;
    this.demage = 50;
    this.throw = false;
    this.amount = amount;
    this.nowAttack = {};
}


function elf(amount) {
    this.name = "elf";
    this.life = 70;
    this.lifeOfLast = 70;
    this.moveArea = 140;
    this.side = 15;
    this.demage = 20;
    this.throw = true;
    this.throwRange = 200;
    this.amount = amount;
    this.nowAttack = {};
}



function mag(amount) {
    
    this.name = "mag";
    this.life = 50;
    this.lifeOfLast = 50;
    this.moveArea = 100;
    this.side = 15;
    this.demage = 25;
    this.throw = false;
    this.amount = amount;
    this.nowAttack = {};
    

    this.magic = [
        {
            'name': 'nova',
            'disc': 'create a nova that hits everyone in area of 40px',
            'range': 40,
            'damage': 50
        }, {
            'name': 'fireBall',
            'disc': 'throw fireball that hits in some range',
            'range': 30,
            'damage': 40
        }, {
            'name': 'halfDamage',
            'disc': 'the victim upon its spelled has half damage',
        }, {
            'name': 'halfMove',
            'disc': 'the victim upon its spelled has half damage',
        },



    ]
}

















