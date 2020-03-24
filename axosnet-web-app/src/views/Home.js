import React, { Component, Fragment } from 'react';
import CheckSession from '../components/auth/CheckSession';

export class Home extends Component {
	render() {
		return (
			<Fragment>
				<CheckSession />
				<div>This is home</div>
			</Fragment>
		);
	}
}

export default Home;
