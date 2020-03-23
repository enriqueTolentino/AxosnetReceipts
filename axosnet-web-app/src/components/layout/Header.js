import React, { Component } from 'react';
import NavbarItem from './NavBarItem';
import { Link } from 'react-router-dom';

const initialState = {
	menuActivo: false
};

export class Header extends Component {

    state = {
        ...initialState
    }

    activarMenu = () => {
		this.setState({
			menuActivo: !this.state.menuActivo
		});
	};

	render() {
        
		return (
			<nav className="navbar is-link" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item has-text-weight-bold">
						Axosnet Receipts
					</Link>
					<a
						onClick={this.activarMenu}
						className={'navbar-burger ' + (this.state.menuActivo ? 'is-active' : '')}
						aria-label="menu"
						aria-expanded="false"
					>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>
				<div className={'is-primary navbar-menu  ' + (this.state.menuActivo ? 'is-active' : '')}>
					<div className="navbar-start">
						<NavbarItem pathlink="/" textlink="Home" />
						<NavbarItem pathlink="/receipts" textlink="My Receipts" />
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
