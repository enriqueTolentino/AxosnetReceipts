import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class SignUp extends Component {
    render() {
        return (
            <div className="section">
				<div className="columns">
					<div class="card column is-half is-offset-one-quarter">
						<div class="card-content">
							<div className="has-text-centered">
								<h3 class="title">Axosnet</h3>
								<h1 class="subtitle">Create account</h1>
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
									<Link to="/login">Go back to log in</Link>
								</p>
								<div className="has-text-centered">
									<button type="submit" className="button is-link">
										Sign up
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

export default SignUp
