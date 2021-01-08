
var FireBallView = (function() {

    return {

        render() {

            FireBall.getData().forEach(x => {
                ctx.fillStyle = "red";
                ctx.fillRect(x[0], x[1], x[2], x[3]);
            })

        },

    }

})();














