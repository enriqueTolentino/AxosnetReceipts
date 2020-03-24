import React, { Component } from 'react';
import NavbarItem from './NavBarItem';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const initialState = {
	menuActivo: false,
	isAuthorized: false
};

export class Header extends Component {
	state = initialState;

	authService = new AuthService();
	async componentWillMount() {
		const isAuthorized = await this.authService.GetUserSession();
		this.setState({
			isAuthorized
		});
	}

	activarMenu = () => {
		this.setState({
			menuActivo: !this.state.menuActivo
		});
	};

	logOut = async (e) => {
		e.preventDefault();

		await localStorage.removeItem('@AxosnetReceipts.token', '');
		window.location.reload();
	};

	render() {
		const { isAuthorized, menuActivo } = this.state;
		const renderMenu = isAuthorized ? (
			<div className={'is-primary navbar-menu  ' + (menuActivo ? 'is-active' : '')}>
				<div className="navbar-start">
					<NavbarItem pathlink="/" textlink="Home" />
					<NavbarItem pathlink="/receipts" textlink="My Receipts" />
				</div>
				<div className="navbar-end">
					<a onClick={this.logOut} className="navbar-item">
						Log Out
					</a>
				</div>
			</div>
		) : (
			''
		);
		return (
			<nav className="navbar is-link" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item has-text-weight-bold">
						Axosnet Receipts
					</Link>
					<a
						onClick={this.activarMenu}
						className={'navbar-burger ' + (menuActivo ? 'is-active' : '')}
						aria-label="menu"
						aria-expanded="false"
					>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>
				{renderMenu}
			</nav>
		);
	}
}

export default Header;
