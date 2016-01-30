import React, { Component, PropTypes } from 'react';
import s from './BuildDetails.scss';
import withStyles from '../../decorators/withStyles';
import BuildHistory from '../BuildHistory';
import BuildStats from '../BuildStats';

@withStyles(s)
class BuildDetails extends Component {

	static propTypes = {
		build: PropTypes.object.isRequired,
		builds: PropTypes.array.isRequired,
		fetchBuild: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className={s.root}>
				<BuildHistory builds={this.props.builds} fetchBuild={this.props.fetchBuild} className={s.box} />
				<BuildStats build={this.props.build} className={s.box} />
			</div>
		);
	}

}

export default BuildDetails;
