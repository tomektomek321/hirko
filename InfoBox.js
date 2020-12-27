

var InfoBox = (function() {

    var char = null;
    var charSel = null;

    return {

        setHoveredChar(_char) {
            char = _char;
        },

        setSelectedChar(_charSel) {
            charSel = _charSel;
        },


        renderHoveredChar() {

            let box = document.getElementById("char_info");

            if(box == null) {  return; }

            if(charSel !== null) {

                box.innerHTML =
                    "SELECTED CHAR <br />" +
                    "life: " +  (charSel.char.lifeOfLast + (charSel.char.life * (charSel.char.amount - 1))) + "<br />" +
                    "dmg: " +  charSel.char.demage * charSel.char.amount + "<br />" +
                    "amount: " +  charSel.char.amount + "<br />" +
                    "spells Upon: " +  charSel.spellsUpon + "<br />";

                if(Spell.getChoosen() !== null) {
                    box.innerHTML += "SPELL CHOOSEN: <br /> " +  Spell.getChoosen()['name'] + "<br />";
                }

            }


            if(char !== null) {

                box.innerHTML +=
                    "HOVERED CHAR <br />" +
                    "life: " +  (char.char.lifeOfLast + (char.char.life * (char.char.amount - 1))) + "<br />" +
                    "dmg: " +  char.char.demage * char.char.amount + "<br />" +
                    "amount: " +  char.char.amount + "<br />" +
                    "spells Upon: " +  char.spellsUpon + "<br />";

            }




        }
    }


})();
