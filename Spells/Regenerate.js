
var Regenerate = (function() {

    var regeneratePerAmount = 5;

    return {

        countRegenerate(char, team) {
            let amount = chars[team][char].getAmount();

            return amount * regeneratePerAmount;
        },

        makeRegenerate(char) {

            let last = char.getLifeOfLast();

            let life = char.getLife();

            let charsAmount = char.getAmount();
            let charsStartAmount = char.getStartAmount();
            let tempAmount = charsAmount;

            let regenerateAmount = char.getRegenerateAmount();

            if(charsAmount < charsStartAmount) {

                let ov = 0;
                let isOver = false;
                let forNextLoop = null;

                do {
                    let toRegenerate = life - last;

                    if(forNextLoop == null) {
                        forNextLoop = toRegenerate - regenerateAmount;

                        if(forNextLoop < 0) {
                            forNextLoop = Math.abs(forNextLoop);

                            tempAmount++;

                            if(tempAmount > charsStartAmount) {
                                tempAmount--;
                                isOver = true;
                                last = life;
                            } else {
                                last = 0;
                            }

                        } else {

                            last = last + regenerateAmount;
                            isOver = true;
                        }

                    } else {

                        if(forNextLoop > 0) {
                            if(forNextLoop < life) {

                                last = forNextLoop;
                                isOver = true;

                            } else {
                                forNextLoop = forNextLoop - life;
                                tempAmount++;
                            }
                        }
                    }

                    ov++;
                    if(ov > 20) { isOver = true;}

                } while(!isOver)

                char.setAmount(tempAmount);
                char.setLifeOfLast(last);


            } else if(last < life) {

                last = last + regenerateAmount;

                if(last > life) {
                    last = life;
                }
                char.setAmount(tempAmount);
                char.setLifeOfLast(last);
            }

        }
    }

})();