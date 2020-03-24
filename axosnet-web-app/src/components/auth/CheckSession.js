import React, { Component } from 'react';
// import API from '../../helpers/Api';
import AuthService from '../../services/AuthService';
import { withRouter, useLocation } from 'react-router-dom';

class CheckSession extends Component {
	authService = new AuthService();
	async componentWillMount() {
        const {pathname} = this.props.location;
        const isAuthorized = await this.authService.GetUserSession();
        //console.log(isAuthorized, pathname);
		if (!isAuthorized && (pathname !== "/signup")) {
			this.props.history.push('/login');
        }
        else if(isAuthorized && (pathname === '/login' || pathname === '/signup')){
            this.props.history.push('/');
        }
	}

	render() {
		return <div />;
	}
}

export default withRouter(CheckSession);
