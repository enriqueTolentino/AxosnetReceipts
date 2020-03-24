import React, { Component, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CheckSession from '../components/auth/CheckSession';

const initialState = {
	login: {
		email: '',
		password: ''
	},
	loading: false,
	redirect: false
};

export class LogIn extends Component {
	state = initialState;

	authService = new AuthService();

	updateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			login: {
				...this.state.login,
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

			const ok = await this.authService.Login(this.state.login);

			if (ok) {
				window.location.reload();
			} else {
				this.setState(initialState);
			}
		}
	};

	render() {
		const { email, password } = this.state.login;
		const { loading, redirect } = this.state;
		const redirectRender = redirect ? <Redirect to="/" /> : '';
		return (
			<Fragment>
				<CheckSession />
				{redirectRender}
				<div className="section">
					<div className="columns">
						<div className="card column is-half is-offset-one-quarter">
							<div className="card-content">
								<div className="has-text-centered">
									<h3 className="title">Axosnet</h3>
									<h1 className="subtitle">Sign in</h1>
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
										No account? <Link to="/signup">Create One!</Link>
									</p>
									<div className="has-text-centered">
										<button
											type="submit"
											className={'button is-link' + (loading ? ' is-loading' : '')}
										>
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

export default withRouter(LogIn);
