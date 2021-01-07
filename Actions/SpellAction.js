

var SpellAction = (function() {

    var _getPos = function() {
        return pos;
    }


    return {

        spellAction(team, char_selected, hoveredChar) {
            return new Promise((resolve, reject) => {
                var oponent = (team == 1) ? 2 : 1;
                let noUpdate = false;

                if(Spell.getChoosen().name == "regeneration") {
                    let countRegenerate = Regenerate.countRegenerate(char_selected, team);
                    console.log(countRegenerate);

                    hoveredChar.setSpell({...Spell.getChoosen(), "lifePerRound": countRegenerate});




                } else if(Spell.getChoosen().name == "halfMove"
                            || Spell.getChoosen().name == "halfDamage"
                            || Spell.getChoosen().name == "roundPause") {

                    console.log(Spell.getChoosen());

                    if(hoveredChar.hasSpellUpon(Spell.getChoosen())) {
                        noUpdate = true;
                    } else {
                        hoveredChar.setSpell(Spell.getChoosen());
                    }



                } else if(Spell.getChoosen().name == "throw") {

                    resolve("throwAction");
                    return;

                } else if(Spell.getChoosen().name == "nova") {

                    for(var i = 0; i < chars[oponent].length; i++) {

                        var tempChar = chars[oponent][i];

                        if(chars[oponent][i].isReachedBySpell(Spell.getChoosen(), Cursor.getPos())) {
                            Attack.defaultAttack(chars[team][char_selected], tempChar)
                        }
                    }

                    Spell.resetSpell();
                    Spell.resetBtns();
                    resolve("nextChar");
                    updateGameArea();

                    return;

                } else {

                    for(var i = 0; i < chars[oponent].length; i++) {

                        var tempChar = chars[oponent][i];

                        if(chars[oponent][i].isReachedBySpell(Spell.getChoosen(), Cursor.getPos())) {

                            Attack.defaultAttack(chars[team][char_selected], tempChar);
                        }
                    }
                }

                if(!noUpdate) {
                    console.log("bb");
                    Spell.resetSpell();
                    Spell.resetBtns();
                    resolve("nextChar");
                }

                updateGameArea();

            });
        }
    }

})();