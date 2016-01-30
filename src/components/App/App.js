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
import BuildPage from '../BuildPage';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';

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
		this.builds = [];
		this.build = {};
	}

	runBuild() {
		fetch(Api.url + Api.endpoint.build, {
			method: 'POST'
		}).then(() => {
			this.refresh();
		});
	}

	fetchBuild(id) {
		this.build.queries = [];
		this.setState({loaded: false});
		fetch(Api.url + Api.endpoint.build + '/' + id)
			.then((response) => response.text())
			.then((responseText) => {
				this.build = JSON.parse(responseText);
				this.setState({loaded: true});

				if (this.build.status === 1) {
					setTimeout(this.refresh.bind(this), 2500);
				}
			})
			.catch(() => {
				this.setState({loaded: true});
			});
	}

	fetchBuilds() {
		this.setState({loaded: false});
		return fetch(Api.url + Api.endpoint.build)
			.then((response) => response.text())
			.then((responseText) => {
				this.builds = JSON.parse(responseText);
			})
			.catch(() => {
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
		this.fetchBuilds()
			.then(() => {
				const id = this.props.params.buildId || this.builds[0].id;
				let path = '/build/' + id;

				if (this.props.params.queryId) {
					path += '/query/' + this.props.params.queryId;
				}

				Location.push({
					...(parsePath(path)),
					state: this.props && this.props.state || null,
				});

				return this.fetchBuild(id);
			})
	}

	componentWillUnmount() {
		this.removeCss();
	}

	refresh() {
		this.fetchBuilds()
			.then(() => {
				const buildId = this.props.params.buildId;
				if (buildId) {
					Location.push({
						...(parsePath('/build/' + buildId)),
						state: this.props && this.props.state || null,
					});
					this.fetchBuild(buildId);
				}
			});
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
				<Navigation
					className={s.nav}
					build={this.build}
					params={this.props.params}/>
				<div className={s.content}>
					<BuildPage
						loaded={this.state.loaded}
						build={this.build}
						builds={this.builds}
						queryId={this.props.params.queryId}
						params={this.props.params}
						runBuild={this.runBuild.bind(this)}
						fetchBuild={this.fetchBuild.bind(this)}
						onRefresh={this.refresh.bind(this)}/>
				</div>
			</div>
		);
	}

}

export default App;
