import React, { Component, PropTypes } from 'react';
import s from './RefreshButton.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

const title = 'Loading...';

@withStyles(s)
class RefreshButton extends Component {

	static propTypes = {
		className: PropTypes.string,
		onRefresh: PropTypes.func.isRequired,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
	};

	refresh() {
		this.props.onRefresh();
		this.context.onSetTitle(title);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)} onClick={this.refresh.bind(this)}>
				<div className={s.icon}></div>
			</div>
		);
	}

}

export default RefreshButton;
