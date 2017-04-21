/**
 * Created by g_fri on 2017-04-18.
 */
var d3 = require('d3');
var jsdom = require('jsdom');
var doc = jsdom.jsdom();
var barChart = require('./bar');


var getBarChart = function (params) {

    var chart = barChart()
        .data(params.data)
        .width(params.width)
        .height(params.height)
        .xAxisLabel(params.xAxisLabel)
        .yAxisLabel(params.yAxisLabel);
    debugger;
    d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

    var selector = params.containerId;
    var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
    d3.select(doc.getElementById(selector)).remove();

    return svg;

};


module.exports = {
    getBarChart: getBarChart
};