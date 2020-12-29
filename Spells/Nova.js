
var Nova = (function() {

    var range = null;

    var extraData = null;

    return {

        createExtraData(_data) {
            extraData = _data;
        },

        getRange() {
            return (extraData['range']) ? extraData['range'] : null;
        }
    }

})();