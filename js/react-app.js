'use strict';

console.log("react-app.js()");

var React = require('react');
var ReactDOM = require('react-dom');

//Read url params for: maxRows
var getMaxRows = function() {
    var result = 1000;
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

//ensure copy
var initMemory = {
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize
    },
    executionTimes = [],
    startTime = performance.now(),
    maxRows = getMaxRows(),
    pageSize = 50,
    updateInterval = 750,
    maxRows = maxRows;

console.log("startTime: ", startTime);

//////////////

var median = function(sequence) {
    // note that direction doesn't matter
    sequence.sort(function (a, b) {
        return a - b;
    });
    return sequence[Math.ceil(sequence.length / 2)];
}

var scrollToBottom = function() {
    var docHeight = document.body.offsetHeight;
    docHeight = docHeight == undefined ? window.document.documentElement.scrollHeight : docHeight;

    //console.log("scrollToBottom() - scroll to docHeight: ", docHeight);

    window.scrollTo(0, docHeight);
}

var ExampleApplication = React.createClass({

    getInitialState: function() {
        console.log("ExampleApplication.getInitialState()");
        return {
            rows: []
        };
    },

    componentDidMount: function() {

        console.log("ExampleApplication.componentDidMount() - will render with initial state: ", this.state);
        console.log("ExampleApplication.componentDidMount() - initial performance.memory: ", initMemory);

        var _app = this;

        var updateInterval = setInterval(function () {
            var rows = _app.state.rows;
            if (rows.length < maxRows) {

                //Simulate that user 'scrolled' to bottom

                // simulate updating model with server results, after a scroll
                for (var i = 0; i < pageSize; i++) {
                    var last = rows[rows.length - 1];
                    var id = (last ? last.id : 0) + 1;
                    var row = {
                        id: id,
                        rowNum: id,
                        artist: 'Artist ' + id,
                        album: 'Album ' + id
                    };

                    rows.push(row);
                }

                var t0 = performance.now();

                _app.setState(_app.state);

                scrollToBottom();

                var t1 = performance.now();
                executionTimes.push(t1 - t0);

            } else {
                clearInterval(updateInterval);

                console.log("ExampleApplication.interval() - DONE at rows: ", maxRows);

                console.log("ExampleApplication.interval() - initial performance.memory: ", initMemory);
                console.log("ExampleApplication.interval() - performance.memory: ", performance.memory);

                // SIDE EFFECT: Sorts array
                var medianValue = median(executionTimes).toFixed(4);
                var finalTime = performance.now();
                var totalTime = (finalTime - startTime).toFixed(4);

                console.log("Execution completed with parameters: ");
                console.log("maxRows: ", maxRows);
                console.log("------------------------------");
                console.log('Execution times: ', executionTimes);
                console.log('Median time: ', medianValue, 'ms');
                console.log('Total time: ', totalTime, 'ms, ', (totalTime/1000).toFixed(2), 's');

            }

        }, this.state.updateInterval);
    },

    render: function () {
        console.log("ExampleApplication.render() - state.rows.length: ", this.state.rows.length);

        return <InfiniteTable rows={this.state.rows}/>;
    }
});

var TableRow = React.createClass({
    render: function () {
        return <tr>
            <td>{this.props.data.rowNum}</td>
            <td>&nbsp;</td>
            <td>{this.props.data.artist}</td>
            <td>{this.props.data.album}</td>
        </tr>;
    }
});

var InfiniteTable = React.createClass({

    render: function () {

        return <table className="table">
            <caption>React populated table</caption>
            <thead>
            <tr>
                <th>#</th>
                <th>&nbsp;</th>
                <th>Artist</th>
                <th>Album</th>
            </tr>
            </thead>
            <tbody id="item_table_body">
            {
                this.props.rows.map(function (result) {
                    //console.log("InfiniteTable.render() - props.rows.map(", result, ")");
                    return <TableRow key={result.id} data={result}/>;
                })
            }
            </tbody>
        </table>;
    }
});

ReactDOM.render(
    <ExampleApplication />,
    document.getElementById('container')
);