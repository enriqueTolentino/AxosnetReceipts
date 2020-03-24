import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';

const initialState = {
	user: {
		email: '',
		password: ''
	},
	loading: false,
	redirect: false
};

export class SignUp extends Component {
	state = initialState;

	authService = new AuthService();

	updateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			user: {
				...this.state.user,
				[name]: value
			}
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		if (!this.state.loading) {
			this.setState({
				loading: true
			});

			const ok = await this.authService.Create(this.state.user);

			if (ok) {
				this.setState({
					loading: false,
					redirect: true
				});
			} else {
				this.setState({
					loading: false
				});
			}
		}
	};

	render() {
		const { email, password } = this.state.user;
		const { loading, redirect } = this.state;
		const redirectRender = redirect ? <Redirect to="/login" /> : '';
		return (
			<Fragment>
				{redirectRender}
				<div className="section">
					<div className="columns">
						<div className="card column is-half is-offset-one-quarter">
							<div className="card-content">
								<div className="has-text-centered">
									<h3 className="title">Axosnet</h3>
									<h1 className="subtitle">Create account</h1>
								</div>
								<form onSubmit={this.handleSubmit}>
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
												value={email}
												name="email"
												onChange={this.updateState}
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
												value={password}
												name="password"
												onChange={this.updateState}
											/>
										</div>
									</div>
									<p>
										<Link to="/login">Go back to log in</Link>
									</p>
									<div className="has-text-centered">
										<button
											type="submit"
											className={'button is-link' + (loading ? ' is-loading' : '')}
										>
											Sign up
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

export default SignUp;
