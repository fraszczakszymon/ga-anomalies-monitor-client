import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import s from './QueryDetails.scss';
import withStyles from '../../decorators/withStyles';
import BuildHeader from '../BuildHeader';
import QueryChart from '../QueryChart';
import QueryTable from '../QueryTable';

@withStyles(s)
class QueryDetails extends Component {

	static propTypes = {
		query: PropTypes.object,
	};

	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="fade-in"
				transitionAppear={true}
				transitionAppearTimeout={10000}
				transitionEnterTimeout={0}
				transitionLeaveTimeout={0}>
				<div className={s.root}>
					<QueryChart query={this.props.query}/>
					<QueryTable query={this.props.query}/>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

}

export default QueryDetails;
