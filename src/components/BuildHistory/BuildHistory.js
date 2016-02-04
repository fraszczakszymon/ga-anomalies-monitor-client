import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import s from './BuildHistory.scss';
import withStyles from '../../decorators/withStyles';
import $ from 'jquery';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';
import BuildStatus from '../BuildStatus';

@withStyles(s)
class BuildHistory extends Component {

	static propTypes = {
		builds: PropTypes.array.isRequired,
		className: PropTypes.string,
		fetchBuild: PropTypes.func.isRequired,
		params: PropTypes.object,
	};

	goToBuild(id) {
		Location.push({
			...(parsePath('/build/' + id)),
			state: this.props && this.props.state || null,
		});
		this.props.fetchBuild(id);
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="fade-in"
				transitionAppear={true}
				transitionAppearTimeout={10000}
				transitionEnterTimeout={0}
				transitionLeaveTimeout={0}>
				<div className={cx(s.root, this.props.className)}>
					<h3>History</h3>
						<table>
							<tbody>
							{this.props.builds.slice(0, 48).map((build) => {
								return (
									<tr
										className={this.props.params.buildId == build.id ? s.selected : null}
										key={build.id}
										onClick={this.goToBuild.bind(this, build.id)}>
										<td className={s.status}><BuildStatus status={build.status} /></td>
										<td>Build #{build.id}</td>
										<td className={s.date}>{$.format.toBrowserTimeZone(build.date)}</td>
									</tr>
								);
							})}
							</tbody>
						</table>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

}

export default BuildHistory;
