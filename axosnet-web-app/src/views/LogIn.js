import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CheckSession from '../components/auth/CheckSession';

export class LogIn extends Component {
	render() {
		return (
			<Fragment>
				<CheckSession />
				<div className="section">
					<div className="columns">
						<div className="card column is-half is-offset-one-quarter">
							<div className="card-content">
								<div className="has-text-centered">
									<h3 className="title">Axosnet</h3>
									<h1 className="subtitle">Sign in</h1>
								</div>
								<form>
									<div className="field">
										<label className="label">
											<i className="fas fa-user fa-fw" />User
										</label>
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="email@mail.com"
												required={true}
												// value={providerCode}
												// name="providerCode"
												// onChange={this.updateState}
											/>
										</div>
									</div>
									<div className="field">
										<label className="label">
											<i className="fas fa-key fa-fw" />Password
										</label>
										<div className="control">
											<input
												className="input"
												type="password"
												placeholder="************"
												required={true}
												// value={providerCode}
												// name="providerCode"
												// onChange={this.updateState}
											/>
										</div>
									</div>
									<p>
										No account? <Link to="/signup">Create One!</Link>
									</p>
									<div className="has-text-centered">
										<button type="submit" className="button is-link">
											Sign in
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default LogIn;
