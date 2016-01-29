import React, { Component, PropTypes } from 'react';
import s from './QueryPage.scss';
import withStyles from '../../decorators/withStyles';
import QueryHeader from '../QueryHeader';
import QueryChart from '../QueryChart';
import QueryTable from '../QueryTable';

@withStyles(s)
class QueryPage extends Component {

	static propTypes = {
		loaded: PropTypes.bool.isRequired,
		build: PropTypes.object,
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
				<QueryHeader loaded={this.props.loaded} build={this.props.build} query={query}/>
				{this.props.loaded && query ? <QueryChart query={query}/> : null}
				{this.props.loaded && query ? <QueryTable query={query}/> : null}
			</div>
		);
	}

}

export default QueryPage;
