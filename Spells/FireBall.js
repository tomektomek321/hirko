
var FireBall = (function() {

    var data = null;

    return {

        getData() {
            return data;
        },

        setData() {

            const { X, Y } = Cursor.getPos();

            let data1 = [];

            var row = -Spell.getChoosen().range;
            var seat = -Spell.getChoosen().range;

            for(var i = 1; i < 50; i++) {
                data1.push( [X - seat, Y - row, 3, 3] );

                seat = seat + 10;

                if(i % 7 == 0) {
                    row += 10;
                    seat = -Spell.getChoosen().range;
                }
            }

            data = data1;
        },
    }

})();














