'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

//////////////

var lib = require('./common.js');

//////////////

var ExampleApplication = React.createClass({

    getInitialState: function() {
        return {
            rows: []
        };
    },

    componentDidMount: function() {

        var _app = this;

        lib.runApp(function(pageSet, allRows){
            // simulate updating model with server results, after a scroll
            _app.state.rows = allRows;
            _app.setState(_app.state);
        });
    },

    render: function () {
        return <InfiniteTable rows={this.state.rows}/>;
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

ReactDOM.render(
    <ExampleApplication />,
    document.getElementById('container')
);