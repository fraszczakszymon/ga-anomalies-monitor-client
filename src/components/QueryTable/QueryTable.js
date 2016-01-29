import React, { Component, PropTypes } from 'react';
import s from './QueryTable.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import $ from 'jquery';

@withStyles(s)
class QueryTable extends Component {

	static propTypes = {
		query: PropTypes.object,
	};

	renderChange(change) {
		const type = change > 0 ? s.up : s.down;
		const arrow = change > 0 ? "▲" : "▼";
		if (change === null) {
			return "-";
		}
		return (
			<div className={type}>
				<div className={s.arrow}>{arrow}</div>
				{change + "%"}
			</div>
		)
	}

	render() {
		let previous = null;
		return (
			<div className={s.root}>
				<table>
					<thead>
					<tr>
						<th></th>
						<th>Date</th>
						<th>Value</th>
						<th>Forecast</th>
						<th>Error</th>
						<th>Change</th>
					</tr>
					</thead>
					<tbody>
					{this.props.query.data.map((row, i) => {
						let change = null;
						if (previous !== null) {
							change = parseFloat(Math.round(10000 * (row.value - previous) / row.value) / 100).toFixed(2);
						}
						previous = row.value;
						return (
							<tr key={i} className={row.exceeded ? s.exceeded : null}>
								<td className={s.flag}>{row.exceeded ? "✖" : null}</td>
								<td className={s.date}>{$.format.toBrowserTimeZone(row.date, "MMMM dd, HH:mm")}</td>
								<td className={s.value}>{row.value}</td>
								<td className={s.value}>{row.forecast}</td>
								<td className={s.error}>{Math.round(row.error * -1)}</td>
								<td className={s.change}>{this.renderChange(change)}</td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		);
	}

}

export default QueryTable;
