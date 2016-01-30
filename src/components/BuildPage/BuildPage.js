import React, { Component, PropTypes } from 'react';
import s from './BuildPage.scss';
import withStyles from '../../decorators/withStyles';
import BuildHeader from '../BuildHeader';
import BuildHistory from '../BuildHistory';
import QueryDetails from '../QueryDetails';
import QueryTable from '../QueryTable';
import $ from 'jquery';

@withStyles(s)
class BuildPage extends Component {

	static propTypes = {
		fetchBuild: PropTypes.func.isRequired,
		loaded: PropTypes.bool.isRequired,
		onRefresh: PropTypes.func.isRequired,
		runBuild: PropTypes.func.isRequired,
		build: PropTypes.object,
		builds: PropTypes.array,
		params: PropTypes.object,
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
					build={this.props.build}
					loaded={this.props.loaded}
					onRefresh={this.props.onRefresh}
					runBuild={this.props.runBuild}
					query={query} />
				{query ? <QueryDetails query={query}/> : null}
				{ !query && this.props.build.id ?
					<BuildHistory
						fetchBuild={this.props.fetchBuild}
						build={this.props.build}
						builds={this.props.builds}
						params={this.props.params} /> :
					null
				}
			</div>
		);
	}

}

export default BuildPage;
