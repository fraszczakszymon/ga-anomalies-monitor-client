import React, { Component, PropTypes } from 'react';
import s from './QueryHeader.scss';
import withStyles from '../../decorators/withStyles';
import Loader from '../Loader';
import $ from 'jquery';

@withStyles(s)
class QueryHeader extends Component {

	static propTypes = {
		loaded: PropTypes.bool.isRequired,
		query: PropTypes.object,
		build: PropTypes.object,
	};

	renderQueryDetails() {
		if (this.props.query) {
			return (
				<div className={s.details}>
					<h2>{this.props.query.title}</h2>
					<h4>{this.props.query.description}</h4>
				</div>
			)
		}
	}

	renderBuildDetails() {
		if (this.props.build.id) {
			return (
				<div className={s.build}>
					<h3>
						<div className={this.props.build.status === 0 ? s.done : s.pending}>•</div>
						Build #{this.props.build.id}
					</h3>
					<h5>{$.format.toBrowserTimeZone(this.props.build.date, "MMMM dd, HH:mm")}</h5>
				</div>
			)
		}
	}

	render() {
		return (
			<div className={s.root}>
				{this.renderQueryDetails()}
				{this.renderBuildDetails()}
				{!this.props.loaded ? <Loader className={s.loader}/> : null}
			</div>
		);
	}

}

export default QueryHeader;
