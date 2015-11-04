'use strict';

console.log("react-app.js()");

var React = require('react');
var ReactDOM = require('react-dom');
var lib = require('./common.js');

console.log("lib: ", lib.getMaxRows);

//ensure copy
var startTime = performance.now(),
    pageSize = 50,
    updateInterval = 750;

console.log("startTime: ", startTime);

//////////////

var ExampleApplication = React.createClass({

    getInitialState: function() {
        console.log("ExampleApplication.getInitialState()");
        return {
            rows: []
        };
    },

    componentDidMount: function() {

        console.log("ExampleApplication.componentDidMount() - will render with initial state: ", this.state);

        var _app = this;

        var updateInterval = setInterval(function () {
            var rows = _app.state.rows;
            if (rows.length < lib.maxRows) {

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

                lib.scrollToBottom();

                var t1 = performance.now();
                lib.addExecutionTime(t1 - t0);

            } else {
                clearInterval(updateInterval);

                lib.printSummary();
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