'use strict';

var lib = require('./common.js');

//////

var table = document.getElementById('item_table_body');

var rows = [];

lib.runApp(function(pageSet, allRows){
    // simulate updating model with server results, after a scroll
    pageSet.forEach(function(row){
        writeRow(row);
    });
});

function writeRow(row) {
    var tr = document.createElement('tr');
    tr.innerHTML =
        "<td>" + row.rowNum + "</td>"
        + "<td>&nbsp;</td>"
        + "<td>" + row.artist + "</td>"
        + "<td>" + row.album + "</td>";
    table.appendChild(tr);
}