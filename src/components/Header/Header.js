import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Header extends Component {

	render() {
		return (
			<div className={s.root}>
				<div className={s.container}>
					<Link className={s.brand} to="/">
						<span className={s.brandTxt}>GA Anomalies Monitor</span>
					</Link>
				</div>
			</div>
		);
	}

}

export default Header;
