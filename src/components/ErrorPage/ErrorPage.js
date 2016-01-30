/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './ErrorPage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Error';

@withStyles(s)
class ErrorPage extends Component {

	static contextTypes = {
		onPageNotFound: PropTypes.func.isRequired,
		onSetTitle: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(title);
	}

	render() {
		return (
			<div>
				<h1>{title}</h1>
				<p>Sorry, an critical error occurred on this page.</p>
			</div>
		);
	}

}

export default ErrorPage;
