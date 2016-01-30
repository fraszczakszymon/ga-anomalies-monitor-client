import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import NavigationLink from '../NavigationLink';
import Header from '../Header';

@withStyles(s)
class Navigation extends Component {

	static propTypes = {
		className: PropTypes.string,
		build: PropTypes.object,
		params: PropTypes.object,
	};

	render() {
		if (this.props.build.queries && this.props.build.queries.length) {
			return (
				<div className={cx(s.root, this.props.className)} role="navigation">
					<Header build={this.props.build}/>
					<ReactCSSTransitionGroup
						transitionName="fade-in"
						transitionAppear={true}
						transitionAppearTimeout={10000}
						transitionEnterTimeout={0}
						transitionLeaveTimeout={0}>
						{this.props.build.queries.map((query) => {
							return (
								<NavigationLink
									key={query.id}
									className={s.link}
									selected={this.props.params.queryId === query.id}
									buildId={this.props.build.id}
									queryId={query.id}
									errors={query.errors}>
									{query.title}
								</NavigationLink>
							)
						})}
					</ReactCSSTransitionGroup>
				</div>
			);
		}

		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				<Header build={this.props.build}/>
			</div>
		);
	}

}

export default Navigation;
