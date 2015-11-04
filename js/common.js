'use strict';

var executionTimes = [],
    startTime = performance.now(),
    //Explicitly copying, as I'm skeptical, when the #'s never change
    initMemory = {
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize
    };

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

    addExecutionTime: function (time) {
        executionTimes.push(time);
    },

    median: function(sequence) {
        //copy
        sequence = sequence.slice();
        // note that direction doesn't matter
        sequence.sort(this.sortAscending);
        if (sequence.length >= 3) {
            return sequence[Math.ceil(sequence.length / 2)];
        }
        return sequence[0];
    },

    printSummary: function () {

        executionTimes.sort(this.sortAscending)

        var medianValue = this.median(executionTimes).toFixed(4);
        var finalTime = performance.now();
        var totalTime = (finalTime - startTime).toFixed(4);

        var printMemory = function(target) {
            return target.jsHeapSizeLimit + ', totalJSHeapSize: ' + target.totalJSHeapSize + ', usedJSHeapSize: ' + target.usedJSHeapSize
        };

        var stats = [
            "------------------------------",
            "Execution completed with parameters: ",
            "maxRows: " + this.maxRows,
            "------------------------------",
            'Execution times: ' + executionTimes,
            'Median time: ' + medianValue + 'ms',
            'Total time: ' + totalTime + 'ms, ' + (totalTime/1000).toFixed(2) + 's',
            "------------------------------",
            'Initial memory: ' + printMemory(initMemory),
            'Final memory: jsHeapSizeLimit: ' + printMemory(performance.memory)
        ];

        var div = document.createElement('div');
        div.innerHTML = stats.join('<br/>');
        document.body.appendChild(div);

        this.scrollToBottom();
    },

    scrollToBottom: function() {
        var docHeight = document.body.offsetHeight;
        docHeight = docHeight == undefined ? window.document.documentElement.scrollHeight : docHeight;

        //console.log("scrollToBottom() - scroll to docHeight: ", docHeight);

        window.scrollTo(0, docHeight);
    },

    sortAscending: function (a, b) {
        return a - b;
    }
};