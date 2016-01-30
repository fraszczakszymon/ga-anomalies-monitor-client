import React, { Component, PropTypes } from 'react';
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
			<div className={s.root}>
				<QueryChart query={this.props.query}/>
				<QueryTable query={this.props.query}/>
			</div>
		);
	}

}

export default QueryDetails;
