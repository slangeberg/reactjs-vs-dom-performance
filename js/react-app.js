'use strict';

console.log("react-app.js()");

var React = require('react');
var ReactDOM = require('react-dom');

var scrollToBottom = function() {
    var docHeight = document.body.offsetHeight;
    docHeight = docHeight == undefined ? window.document.documentElement.scrollHeight : docHeight;

    //var winheight = window.innerHeight;
    //winheight = winheight == undefined ? document.documentElement.clientHeight : winheight;
    //
    //var scrollpoint = window.scrollY;
    //scrollpoint = scrollpoint == undefined ? window.document.documentElement.scrollTop : scrollpoint;

    console.log("scrollToBottom() - scroll to docHeight: ", docHeight);

    window.scrollTo(0, docHeight);
}

var ExampleApplication = React.createClass({

    getInitialState: function() {
        console.log("ExampleApplication.getInitialState()");
        return {
            pageSize: 50,
            rows: [],
            updateInterval: 750,
            maxRows: 10000
        };
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

        this.state.rows = rows;
        this.setState(this.state);

        var _app = this;

        var updateInterval = setInterval(function () {

            if (_app.state.rows.length < _app.state.maxRows) {
                //User 'scrolled' to bottom

                // simulate updating model with server results, after a scroll
                for (var i = 0; i < _app.state.pageSize; i++) {
                    var last = rows[rows.length - 1];
                    var id = last.id + 1;
                    var row = {
                        id: id,
                        rowNum: id,
                        artist: 'Artist ' + id,
                        album: 'Album ' + id
                    };

                    rows.push(row);
                }

                _app.state.rows = rows;
                _app.setState(_app.state);

                scrollToBottom();

            } else {
                console.log("ExampleApplication.interval() - DONE at rows: ", _app.state.maxRows);
                clearInterval(updateInterval);
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