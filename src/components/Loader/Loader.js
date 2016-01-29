import React, { Component, PropTypes } from 'react';
import s from './Loader.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

const title = 'Loading...';

@withStyles(s)
class Loader extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(title);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={s.circle}>
					<div className={cx(s.circle1, s.child)}></div>
					<div className={cx(s.circle2, s.child)}></div>
					<div className={cx(s.circle3, s.child)}></div>
					<div className={cx(s.circle4, s.child)}></div>
					<div className={cx(s.circle5, s.child)}></div>
					<div className={cx(s.circle6, s.child)}></div>
					<div className={cx(s.circle7, s.child)}></div>
					<div className={cx(s.circle8, s.child)}></div>
					<div className={cx(s.circle9, s.child)}></div>
					<div className={cx(s.circle10, s.child)}></div>
					<div className={cx(s.circle11, s.child)}></div>
					<div className={cx(s.circle12, s.child)}></div>
				</div>
			</div>
		);
	}

}

export default Loader;
