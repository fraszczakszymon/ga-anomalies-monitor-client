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
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				<Header build={this.props.build}/>
				<ReactCSSTransitionGroup
					transitionName="fade-in"
					transitionAppear={true}
					transitionEnterTimeout={0}
					transitionLeaveTimeout={0}
					transitionAppearTimeout={10000}>
					{this.props.build.queries ? this.props.build.queries.map((query) => {
						return (
							<NavigationLink
								key={query.id}
								className={s.link}
								buildId={this.props.build.id}
								queryId={query.id}
								errors={query.errors}>
								{query.title}
							</NavigationLink>
						)
					}) : null}
				</ReactCSSTransitionGroup>
			</div>
		);
	}

}

export default Navigation;
