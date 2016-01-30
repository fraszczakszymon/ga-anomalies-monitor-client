import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './BuildInfo.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class BuildInfo extends Component {

	static propTypes = {
		build: PropTypes.object.isRequired,
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				info
			</div>
		);
	}

}

export default BuildInfo;
