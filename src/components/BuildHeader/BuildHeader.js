import React, { Component, PropTypes } from 'react';
import s from './BuildHeader.scss';
import withStyles from '../../decorators/withStyles';
import Loader from '../Loader';
import RefreshButton from '../RefreshButton';
import BuildButton from '../BuildButton';
import BuildStatus from '../BuildStatus';
import $ from 'jquery';

@withStyles(s)
class BuildHeader extends Component {

	static propTypes = {
		loaded: PropTypes.bool.isRequired,
		onRefresh: PropTypes.func.isRequired,
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
						<BuildStatus status={this.props.build.status} className={s.status} />
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
				<div className={s.icon}>
					{!this.props.loaded ?
						<Loader className={s.loader}/> :
						<RefreshButton className={s.refresh} onRefresh={this.props.onRefresh} />
					}
				</div>
				<div className={s.icon}>
					<BuildButton className={s.run} />
				</div>
				{this.renderBuildDetails()}
			</div>
		);
	}

}

export default BuildHeader;
