'use strict';

//Read url params for: maxRows
var getMaxRows = function() {
    var result = 500;
    var loc = location.search.slice(1);
    if (loc) {
        var params = {};
        var tokens = loc.split('&');
        tokens.forEach(function(token) {
            var bits = token.split('=');
            params[bits[0].toLowerCase()] = bits[1];
        });
        if (params['maxRows'.toLowerCase()]) {
            result = parseInt(params['maxRows'.toLowerCase()], 10);
        }
    }
    console.log("getMaxRows(): ", result);
    return result;
}

module.exports = {
    maxRows: getMaxRows(),

    median: function(sequence) {
        // note that direction doesn't matter
        sequence.sort(function (a, b) {
            return a - b;
        });
        if (sequence.length >= 3) {
            return sequence[Math.ceil(sequence.length / 2)];
        }
        return sequence[0];
    },

    scrollToBottom: function() {
        var docHeight = document.body.offsetHeight;
        docHeight = docHeight == undefined ? window.document.documentElement.scrollHeight : docHeight;

        //console.log("scrollToBottom() - scroll to docHeight: ", docHeight);

        window.scrollTo(0, docHeight);
    }
};