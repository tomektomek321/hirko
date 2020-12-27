
var Regenerate = (function() {

    var regeneratePerAmount = 5;

    return {

        countRegenerate(char, team) {
            console.log(arguments);
            let amount = chars[team][char].getAmount();
            console.log(amount);

            return amount * regeneratePerAmount;
        },

        makeRegenerate(char) {

            console.log(char);

            let last = char.getLifeOfLast();

            let life = char.getLife();

            console.log(last);
            console.log(life);

            let charsAmount = char.getAmount();
            let charsStartAmount = char.getStartAmount();
            let tempAmount = charsAmount;

            let regenerateAmount = char.getRegenerateAmount();

            if(charsAmount < charsStartAmount) {
                console.log("tak");

                console.log(regenerateAmount);

                let ov = 0;
                //let tempAmount = char.getAmount();

                let tempFranction;
                let isOver = false;
                let forNextLoop = null;

                do {
                    console.log("next loop ==================");
                    let toRegenerate = life - last;
                    console.log(toRegenerate);

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
                                //tempAmount++;

                                /*if(tempAmount > charsStartAmount) {
                                    tempAmount--;
                                }*/

                            } else {
                                forNextLoop = forNextLoop - life;
                                tempAmount++;

                            }

                        }
                    }

                    console.log(forNextLoop);

                    ov++;
                    if(ov > 20) { isOver = true;}

                } while(!isOver)


                char.setAmount(tempAmount);
                char.setLifeOfLast(last);

                console.log("end LOOP===");
                console.log(tempAmount);
                console.log(last);


            } else if(last < life) {

                last = last + regenerateAmount;

                if(last > life) {
                    last = life;
                }
                char.setAmount(tempAmount);
                char.setLifeOfLast(last);
                console.log("niet");
            }



        }
    }

})();