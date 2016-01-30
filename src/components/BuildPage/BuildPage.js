import React, { Component, PropTypes } from 'react';
import s from './BuildPage.scss';
import withStyles from '../../decorators/withStyles';
import BuildHeader from '../BuildHeader';
import BuildDetails from '../BuildDetails';
import QueryDetails from '../QueryDetails';
import QueryTable from '../QueryTable';
import $ from 'jquery';

@withStyles(s)
class BuildPage extends Component {

	static propTypes = {
		loaded: PropTypes.bool.isRequired,
		onRefresh: PropTypes.func.isRequired,
		build: PropTypes.object,
		builds: PropTypes.array,
		queryId: PropTypes.string,
	};

	getQuery() {
		const build = this.props.build,
			id = this.props.queryId;

		if (id && build && build.queries) {
			for (var i = 0; i < build.queries.length; i++) {
				if (build.queries[i].id === id) {
					return build.queries[i];
				}
			}
		}
	}

	render() {
		const query = this.getQuery();
		return (
			<div className={s.root}>
				<BuildHeader
					loaded={this.props.loaded}
					build={this.props.build}
					query={query}
					onRefresh={this.props.onRefresh} />
				{query ? <QueryDetails query={query}/> : <BuildDetails build={this.build} builds={this.builds} />}
			</div>
		);
	}

}

export default BuildPage;