import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './BuildStatus.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class BuildStatus extends Component {

	static propTypes = {
		className: PropTypes.string,
		status: PropTypes.number.isRequired,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className, s['status' + this.props.status])}>•</div>
		);
	}

}

export default BuildStatus;
