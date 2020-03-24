import React, { Component, Fragment } from 'react';
import CheckSession from '../components/auth/CheckSession';

export class Home extends Component {
	render() {
		return (
			<Fragment>
				<CheckSession />
				<div className="section">
					<div className="container">
						<h3 className="title">Welcome!</h3>
						<h3 className="subtitle">Record all your receipts</h3>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Home;
