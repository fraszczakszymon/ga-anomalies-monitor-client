import React, { Component, PropTypes } from 'react';
import s from './NavigationLink.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class NavigationLink extends Component {

	static propTypes = {
		buildId: PropTypes.number,
		children: PropTypes.string,
		className: PropTypes.string,
		errors: PropTypes.number,
		selected: PropTypes.bool,
		queryId: PropTypes.string,
	};

	render() {
		return (
			<Link
				className={cx(s.root, this.props.className, this.props.selected ? s.selected : null)}
				to={"/build/" + this.props.buildId + "/query/" + this.props.queryId}>
				{this.props.children}
				{
					this.props.errors > 0 ?
						<div className={this.props.errors > 9 ? cx(s.badge, s.wide) : s.badge}>
							{this.props.errors}
						</div> : null
				}
			</Link>
		);
	}

}

export default NavigationLink;
