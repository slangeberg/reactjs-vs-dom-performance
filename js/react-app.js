'use strict';

console.log("react-app.js()");

var React = require('react');
var ReactDOM = require('react-dom');

var ExampleApplication = React.createClass({

    getInitialState: function() {
        console.log("ExampleApplication.getInitialState()");
        return {rows: []};
    },

    componentDidMount: function() {

        console.log("ExampleApplication.componentDidMount()");

        //init app
        var rows = [
            {
                id: 1,
                rowNum: 1,
                artist: 'jebba',
                album: 'bush'
            }
        ];

        //var start = new Date().getTime();

        this.setState({rows: rows});

        var _app = this;

        setInterval(function () {
            // simulate updating model with server results, after a scroll
            var last = rows[rows.length - 1];
            var id = last.id + 1;
            var row = {
                id: id,
                rowNum: id,
                artist: 'Artist ' + id,
                album: 'Album ' + id
            };

            rows.push(row);

            console.log("ExampleApplication.componentDidMount() - interval - new row: ", row);

            _app.setState({rows: rows});

        }, 1000);
    },

    render: function () {
        //var elapsed = Math.round(this.props.elapsed  / 100);
        //var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        //var message =
        //  'React has been successfully running for ' + seconds + ' seconds.';

        console.log("ExampleApplication.render() - state: ", this.state);

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
                    console.log("InfiniteTable.render() - props.rows.map(", result, ")");
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