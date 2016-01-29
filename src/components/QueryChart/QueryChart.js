import React, { Component, PropTypes } from 'react';
import s from './QueryChart.scss';
import withStyles from '../../decorators/withStyles';
import $ from 'jquery';

@withStyles(s)
class QueryChart extends Component {

	static propTypes = {
		query: PropTypes.object,
	};

	getChartOptions(queryData) {
		return {
			xaxis: {
				font: {
					size: 11,
					family: 'sans-serif',
					color: '#545454'
				},
				mode: 'time',
				position: 'top',
				ticks: 7,
				timezone: 'browser'
			},
			yaxis: {
				min: queryData.minValue * 2,
				show: false
			},
			selection: {
				mode: 'x'
			},
			grid: {
				hoverable: true,
				borderWidth: 0
			},
			legend: {
				show: false
			}
		}
	}

	getQueryData() {
		let data = {
				forecast: [],
				max: [],
				min: [],
				real: [],
				error: [],
				zero: [],
				exceeded: [],
				maxValue: 0,
				minValue: 0
			},
			date;
		this.props.query.data.forEach((row) => {
			data.minValue = Math.min(data.minValue, -1 * row.error);
			data.maxValue = Math.max(data.maxValue, row.value);
		});
		data.markerPosition = data.minValue * 1.75;
		this.props.query.data.forEach((row) => {
			data.maxValue = Math.max(data.maxValue, row.value);
			date = (new Date(row.date)).getTime();
			data.forecast.push([date, row.forecast]);
			data.max.push([date, row.max]);
			data.min.push([date, row.min]);
			data.real.push([date, row.value]);
			data.error.push([date, row.error * -1]);
			data.zero.push([date, 0]);
			if (row.exceeded) {
				data.exceeded.push([date, data.markerPosition]);
			}
		});

		return data;
	}

	renderChart() {
		const $chart = $("#chart"),
			queryData = this.getQueryData(),
			options = this.getChartOptions(queryData);
		let plot;

		plot = $chart.plot([
			{
				id: 'minForecast',
				color: '#CFD8DC',
				data: queryData.min,
				lines: {
					fill: false,
					lineWidth: 0,
					show: true
				},
				shadowSize: 0
			},
			{
				id: 'maxForecast',
				color: '#CFD8DC',
				data: queryData.max,
				fillBetween: 'minForecast',
				lines: {
					fill: 0.35,
					lineWidth: 0,
					show: true
				},
				shadowSize: 0
			},
			{
				color: '#CFD8DC',
				data: queryData.forecast,
				label: 'Forecast',
				lines: {
					lineWidth: 1.5,
					show: true
				},
				shadowSize: 0
			},
			{
				color: '#2196F3',
				data: queryData.real,
				label: 'Value',
				lines: {
					lineWidth: 2,
					show: true
				},
				shadowSize: 0
			},
			{
				id: 'zero',
				color: '#D9D9D9',
				data: queryData.zero,
				lines: {
					lineWidth: 1,
					show: true
				},
				shadowSize: 0
			},
			{
				color: '#FF8F00',
				data: queryData.error,
				fillBetween: 'zero',
				label: 'Error',
				lines: {
					fill: 0.1,
					lineWidth: 1,
					show: true
				},
				shadowSize: 0
			},
			{
				color: '#F44336',
				data: queryData.exceeded,
				lines: {
					show: false
				},
				points: {
					radius: 3.5,
					show: true,
					symbol: 'cross'
				},
				shadowSize: 0
			}
		], options).data("plot");

		$chart.on('plotselected', function (event, ranges) {
			$.each(plot.getXAxes(), function (_, axis) {
				var opts = axis.options;
				opts.min = ranges.xaxis.from;
				opts.max = ranges.xaxis.to;
			});
			plot.setupGrid();
			plot.draw();
			plot.clearSelection();
		});
		$chart.dblclick(function () {
			$.each(plot.getXAxes(), function (_, axis) {
				var opts = axis.options;
				opts.min = queryData.real[0][0];
				opts.max = queryData.real[queryData.real.length - 1][0];
			});
			plot.setupGrid();
			plot.draw();
			plot.clearSelection();
		});
		$chart.on('plothover', function (event, pos, item) {
			var x, y, label,
				tooltip = $('#tooltip');
			if (item && item.series.label) {
				x = $.format.date(item.datapoint[0], "MM/dd HH:mm");
				y = item.datapoint[1];
				label = item.series.label + ': ' + Math.round(y) + '<br /><small>Time: ' + x + '</small>';
				tooltip.html(label)
					.css({
						top: item.pageY + 20,
						left: item.pageX - tooltip.width() / 2
					})
					.fadeIn(200);
			} else {
				tooltip.hide();
			}
		});
	}

	render() {
		setTimeout(() => {
			this.renderChart()
		}, 10);
		return (
			<div className={s.root}>
				<div id="chart" className={s.chart}></div>
				<div id="tooltip" className={s.tooltip}></div>
			</div>
		);
	}

}

export default QueryChart;
