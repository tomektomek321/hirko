

var Attack = (function() {

    var _getPos = function() {
        return pos;
    }


    return {

        defaultAttack(attacker, enemy) {


            return new Promise((resolve, reject) => {

                var length = attacker.getAmount();

                var damage;


                damage = attacker.getDamage();


                var totalDemage = damage * length;

                var def = enemy.getLife();


                var lastDef = enemy.getLifeOfLast();
                var totalDef = (def * (enemy.getAmount() - 1)) + lastDef;

                var newAmount, modul;
                if(totalDemage > totalDef) {

                    enemy.makeDead();
                    resolve("OK2");

                } else {

                    if(totalDemage > lastDef) {

                        totalDef = totalDef - totalDemage;

                        modul = totalDef % def

                        newAmount = totalDef / def;
                        newAmount = newAmount.toFixed();
                        newAmount = parseInt(newAmount);

                    } else {

                        totalDef = totalDef - totalDemage;

                        modul = totalDef % def;

                        newAmount = enemy.getAmount();

                    }


                    enemy.setAmount(newAmount);

                    enemy.setLifeOfLast(modul);
                    resolve("OK2");
                }
			});

        }
    }


})();
