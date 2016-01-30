import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Header extends Component {

	static propTypes = {
		build: PropTypes.object,
	};

	render() {
		return (
			<div className={s.root}>
				<div className={s.container}>
					<Link className={s.brand} to={this.props.build ? "/build/" + this.props.build.id : "/"}>
						<span className={s.brandTxt}>GA Anomalies Monitor</span>
					</Link>
				</div>
			</div>
		);
	}

}

export default Header;
