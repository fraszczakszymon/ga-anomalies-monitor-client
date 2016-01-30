import React, { Component, PropTypes } from 'react';
import s from './BuildDetails.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class BuildDetails extends Component {

	static propTypes = {
		query: PropTypes.object,
	};

	render() {
		return (
			<div className={s.root}>
				build details @WIP
			</div>
		);
	}

}

export default BuildDetails;
