

var CharAction = (function() {

    var _getPos = function() {
        return pos;
    }


    return {

        renderAction(team, char) {

            let ctx = myGameArea.context;

            var color = (team == 1) ? "red" : "blue";

            if(Spell.hasSpell() && Spell.getChoosen().name === "fireBall" && !gameController.isCharFromSelectedTeam(char.team)) {

                var spell = Spell.getChoosen();
                const { X, Y } = Cursor.getPos();

                var area = {
                    'X': X - spell.range,
                    'Y': Y - spell.range,
                    'side': spell.range * 2
                }

                if((area.X + area.side + 3 >= char.posX && area.X <= char.posX + char.char.side) &&
                        (area.Y + area.side + 3 >= char.posY && area.Y <= char.posY + char.char.side)) {
                    color = "yellow";

                    char.setSpell("fireBall");

                }

            } else if(Spell.hasSpell() && Spell.getChoosen().name === "doubleBelt" && !gameController.isCharFromSelectedTeam(char.team)) {

                let extr = Spell.getExtraData();

                let curs = Cursor.getPos();

                for(let i=0; i < extr.linesPos.length; i++) {
                    let cuts = 35;

                    let x1 = Math.abs(extr.linesPos[i].line1endX - extr.char.X);
                    let y1 = Math.abs(extr.linesPos[i].line1endY - extr.char.Y);

                    let x1cut = x1 / cuts;
                    let y1cut = y1 / cuts;

                    for(let j=1; j <= cuts; j++) {

                        if(extr.matrix[0] && extr.matrix[1]) { // 1
                            if((( char.posX <= extr.char.X + (x1cut*j) )) && ((char.posX + char.char.side) > (extr.char.X) + (x1cut*j))  &&
                            (( char.posY <= extr.char.Y - (y1cut*j) ))  && ((char.posY + char.char.side) > (extr.char.Y) - (y1cut*j))) {

                                console.log("przcina");
                                color = "yellow";
                            }

                        } else if(extr.matrix[0] && !extr.matrix[1]) { // prawy dol
                            if((( char.posX <= extr.char.X + (x1cut*j) )) && ((char.posX + char.char.side) > (extr.char.X) + (x1cut*j))  &&
                            (( char.posY <= extr.char.Y + (y1cut*j) ))  && ((char.posY + char.char.side) > (extr.char.Y) + (y1cut*j))) {

                                console.log("przcina");
                                color = "yellow";
                            }
                        } else if(!extr.matrix[0] && !extr.matrix[1]) { // lewy dol
                            if((( char.posX <= extr.char.X - (x1cut*j) )) && ((char.posX + char.char.side) > (extr.char.X) - (x1cut*j))  &&
                            (( char.posY <= extr.char.Y + (y1cut*j) ))  && ((char.posY + char.char.side) > (extr.char.Y) + (y1cut*j))) {

                                console.log("przcina");
                                color = "yellow";
                            }
                        } else if(!extr.matrix[0] && extr.matrix[1]) { // lewy gora
                            if((( char.posX <= extr.char.X - (x1cut*j) )) && ((char.posX + char.char.side) > (extr.char.X) - (x1cut*j))  &&
                            (( char.posY <= extr.char.Y - (y1cut*j) ))  && ((char.posY + char.char.side) > (extr.char.Y) - (y1cut*j))) {

                                console.log("przcina");
                                color = "yellow";
                            }
                        }


                    }

                    View.renderDoubleBelt(ctx);
                }

            } else if(Spell.hasSpell() && Spell.getChoosen().name === "nova"/* && !gameController.isCharFromSelectedTeam(char.team)*/) {

                var selPos = gameController.getSelectedChar().getPosition();

                var charXY = char.getXY();
                let span = char.getSide();

                let spanDivided = Math.floor(span / 5);

                let points = [];

                for(let i=0; i < 5; i++) {

                    for (let j = 0; j < 5; j++) {

                        let b = Math.floor(thisXY['X'] + (j * spanDivided));
                        let y = Math.floor(thisXY['Y'] + (i * spanDivided));

                        points.push({'X': b, "Y": y});
                    }
                }

                let moveArea = Nova.getRange();
                let _t = char;
                for(let i=0; i < points.length; i++) {
                    var z = Math.floor(Math.sqrt(Math.pow(points[i].X - selPos.X, 2) + Math.pow(points[i].Y - selPos.Y, 2)));

                    if(z < moveArea) {
                        color = "yellow";
                        char.setSpell({"name": "nova"});
                    }
                }
            }

            var life = (char.char.life * (char.char.amount - 1)) + char.char.lifeOfLast;

            View.render_char(ctx, char.posX, char.posY, char.char.side, color);
            View.render_charInfo(ctx, life, char.posX, char.posY, char.char.name, char.char.amount, char.char.demage);

        }
    }

})();
