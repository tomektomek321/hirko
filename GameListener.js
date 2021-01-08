
var gameListener = (function() {

    return {

        next_character() {
            Spell.resetBtns();
            Spell.resetSpell();

            CharsManager.selectChar(chars);

            InfoBox.setSelectedChar(CharsManager.getSelectedChar());
            updateGameArea();
        },

        checkHover() {
            CharsManager.checkHover();
        },

        actionCharacter() {
            if(Spell.hasSpell()) { // click while using spell

                SpellAction.spellAction()
                    .then(res => {
                        if(res == "nextChar") {
                            this.next_character();
                        } else {
                            this.throwAction();
                        }
                    })

            } else if(CharsManager.getHoveredChar() == null) { // move
                Move.makeMove(CharsManager.getSelectedChar(), Cursor.getPos(), this.next_character, this.throwAction);
            } else {

                if(CharsManager.isCharFromSelectedTeam()) { // click on own team
                    return;
                } else {
                    this.goCloseAndAttack();
                }
            }
        },

        setThrowRangeFraction() {

            if(CharsManager.getSelectedChar().canThrow() && Spell.getChoosen() != null && Spell.getChoosen()['name'] === "throw") {
                CharsManager.getSelectedChar().setThrowRange_Fraction(Cursor.getPos());
            }
        },

        throwAction() {

            Move.throw(CharsManager.getSelectedChar(), CharsManager.getHoveredChar())
                .then(res => {
                    console.log(res);
                    return Attack.defaultAttack(CharsManager.getSelectedChar(), CharsManager.getHoveredChar());
                })
                .then(res => {
                    console.log(res);
                    Spell.resetSpell();
                    Spell.resetBtns();
                    this.next_character();
                    updateGameArea();
                });
        },

        goCloseAndAttack() {

            var _t = this;
            var selected_enemy = CharsManager.getHoveredChar();

            Move.moveTo(CharsManager.getSelectedChar(), selected_enemy)
                .then(res => {
                    return Attack.defaultAttack(CharsManager.getSelectedChar(), selected_enemy);
                })
                .then(res => {
                    _t.next_character();
                })
                .catch(res => {
                    console.log(res);
                })
        },

        setSpellData() {
            Spell.createExtraData();
        }
    }
})();







