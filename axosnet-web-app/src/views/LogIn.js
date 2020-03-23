import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LogIn extends Component {
	render() {
		return (
			<div className="section">
				<div className="columns">
					<div class="card column is-half is-offset-one-quarter">
						<div class="card-content">
							<div className="has-text-centered">
								<h3 class="title">Axosnet</h3>
								<h1 class="subtitle">Sign in</h1>
							</div>
							<form>
								<div className="field">
									<label className="label">User</label>
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
									<label className="label">Password</label>
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
		);
	}
}

export default LogIn;
