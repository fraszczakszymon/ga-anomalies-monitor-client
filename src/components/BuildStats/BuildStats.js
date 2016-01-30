import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './BuildStats.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class BuildStats extends Component {

	static propTypes = {
		build: PropTypes.object.isRequired,
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				stats
			</div>
		);
	}

}

export default BuildStats;
