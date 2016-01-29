import React, { Component, PropTypes } from 'react';
import s from './NavigationLink.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class NavigationLink extends Component {

	static propTypes = {
		buildId: PropTypes.number,
		queryId: PropTypes.string,
		children: PropTypes.string,
		errors: PropTypes.number,
	};

	render() {
		return (
			<Link className={s.root} to={"/build/" + this.props.buildId + "/query/" + this.props.queryId}>
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
