/**
 * Created by g_fri on 2017-04-18.
 */
var d3 = require('d3');

var lineChart = module.exports = function () {

    var data = [];
    var width = 900;
    var height = 300;
    var margin = {top: 10, right: 10, bottom: 40, left: 40};
    var radius = 3;
    var xAxisLabel = "";
    var yAxisLabel = "";
    var parseDate = d3.time.format("%Y%m%d%H%M%S").parse;
    // 툴팁
    // var div = d3.select(".d3").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);

    var chart = function (container) {
        setDimensions();
        setupXAxis();
        setupYAxis();
        setupLineChartLayout();
        addBackground();
        addXAxisLabel();
        addYAxisLabel();
        addLineChartData();
        addDotData();

        var axisLabelMargin;

        function setDimensions() {
            axisLabelMargin = 10;
        }

        var xScale, xAxis, xAxisCssClass;

        function setupXAxis() {
            xScale = d3.time.scale().range([0, width - axisLabelMargin - margin.left - margin.right, 0.25]);
            xScale.domain(d3.extent(data, function (d) {
                return parseDate(d.X);
            }));

            if (data.length > 12 && width < 500) {
                xAxisCssClass = 'axis-font-small';
            } else {
                xAxisCssClass = '';
            }

            xAxis = d3.svg.axis()
                .scale(xScale)
                .innerTickSize(0)
                .outerTickSize(0)
                .orient('bottom')
                .tickFormat(d3.time.format('%H:%M:%S'));
        }

        var yScale, yAxis;

        function setupYAxis() {

            yScale = d3.scale.linear().range([height - axisLabelMargin - margin.top - margin.bottom, 0]);
            yScale.domain(d3.extent(data, function (d) {
                return d.Y;
            }));

            yAxis = d3.svg
                .axis()
                .ticks(5)
                .innerTickSize(-width + axisLabelMargin + margin.left + margin.right)
                .outerTickSize(0)
                .scale(yScale)
                .orient("left");
        }

        var g;

        function setupLineChartLayout() {
            g = container.append('svg')
                .attr('class', 'svg-chart')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        }

        function addXAxisLabel() {
            g.append('g')
                .attr('class', 'x axis' + xAxisCssClass)
                .attr('transform', 'translate(' + axisLabelMargin + ',' +
                    (height - axisLabelMargin - margin.top - margin.bottom) + ')')
                .call(xAxis)
                .append('text')
                .attr('class', 'axis-label')
                .attr('x', (width - margin.left - margin.right - axisLabelMargin) / 2)
                .attr('y', margin.left)
                .style('text-anchor', 'middle')
                .text(xAxisLabel);
        }

        function addYAxisLabel() {
            g.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + axisLabelMargin + ', 0)')
                .call(yAxis)
                .append('text')
                .attr('class', 'axis-label')
                .attr('transform', 'rotate(-90)')
                .attr('y', -margin.left)
                .attr('x', -(height - margin.top - margin.bottom - axisLabelMargin) / 2)
                .style('text-anchor', 'middle')
                .text(yAxisLabel);
        }

        function addBackground() {
            g.append('rect')
                .attr('class', 'background')
                .attr('x', axisLabelMargin)
                .attr('y', -axisLabelMargin)
                .attr('width', width - axisLabelMargin - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom);
        }

        var line;

        function addLineChartData() {
            line = d3.svg.line()
                .x(function (d) { return xScale(parseDate(d.X)) + axisLabelMargin; })
                .y(function (d) { return yScale(d.Y); });

            g.append("path")
                .attr("class", "line")
                .attr("d", line(data));
        }

        var dot;

        function addDotData() {
            // Add the scatterplot
            var dot = g.selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", radius)
                .attr("fill", '#F08080')
                .attr("cx", function(d) { return xScale(parseDate(d.X)) + axisLabelMargin; })
                .attr("cy", function(d) { return yScale(d.Y); })
                .on('mouseover', function(d) {

                })
                .on('mouseout', function() {

                });
        }

    };
    // Getter and Setter methods
    chart.data = function (value) {
        if (!arguments.length) return data;
        data = value;
        return chart;
    };

    chart.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function (value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.xAxisLabel = function (value) {
        if (!arguments.length) return xAxisLabel;
        xAxisLabel = value;
        return chart;
    };

    chart.yAxisLabel = function (value) {
        if (!arguments.length) return yAxisLabel;
        yAxisLabel = value;
        return chart;
    };

    return chart;
}
