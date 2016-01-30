import React, { Component, PropTypes } from 'react';
import s from './BuildButton.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

const title = 'Loading...';

@withStyles(s)
class BuildButton extends Component {

	static propTypes = {
		className: PropTypes.string,
		onBuild: PropTypes.func,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={s.icon}></div>
			</div>
		);
	}

}

export default BuildButton;
