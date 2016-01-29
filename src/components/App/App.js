/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import fetch from '../../core/fetch';
import Api from '../../constants/Api';
import Navigation from '../Navigation';
import QueryPage from '../QueryPage';

const title = 'GA Anomalies Monitor';

class App extends Component {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			onSetTitle: PropTypes.func,
			onSetMeta: PropTypes.func,
			onPageNotFound: PropTypes.func,
		}),
		params: PropTypes.object,
		children: PropTypes.object,
		error: PropTypes.object,
	};

	static childContextTypes = {
		insertCss: PropTypes.func.isRequired,
		onSetTitle: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
		this.build = {};
	}

	fetchData() {
		fetch(Api.url + Api.endpoint.build)
			.then((response) => response.text())
			.then((responseText) => {
				this.build = JSON.parse(responseText);
				this.setState({loaded: true});
			});
	}

	getChildContext() {
		const context = this.props.context;
		return {
			insertCss: context.insertCss || emptyFunction,
			onSetTitle: context.onSetTitle || emptyFunction,
			onSetMeta: context.onSetMeta || emptyFunction,
			onPageNotFound: context.onPageNotFound || emptyFunction,
		};
	}

	componentWillMount() {
		this.removeCss = this.props.context.insertCss(s);
	}

	componentDidMount() {
		this.fetchData();
	}

	componentWillUnmount() {
		this.removeCss();
	}

	render() {
		if (this.props.error) {
			return this.props.children;
		}

		if (this.state.loaded) {
			this.props.context.onSetTitle(title);
		}

		return (
			<div>
				<Navigation className={s.nav} build={this.build}/>
				<div className={s.content}>
					<QueryPage
						loaded={this.state.loaded}
						build={this.build}
						queryId={this.props.params.queryId}/>
				</div>
			</div>
		);
	}

}

export default App;
