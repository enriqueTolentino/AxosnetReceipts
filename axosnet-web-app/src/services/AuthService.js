import API from './AxiosConfig';
import Notification from 'react-bulma-notification';

class AuthService {
	CreateUser = async (user) => {
		let ok = false;

		await API.post(`Auth/CreateUser`, user)
			.then((res) => {
				console.log(res);
				ok = true;
				Notification['success']('User created successfully, now you can Sign In', { duration: 5 });
			})
			.catch(({ response: { data } }) => {
				if (data.errorMessage) {
					Notification['error'](data.errorMessage, { duration: 5 });
				} else if (data.errors) {
					if (data.errors.Password) {
						data.errors.Password.forEach((errorMessage) => {
							Notification['error'](errorMessage, { duration: 5 });
						});
					}

					if (data.errors.Email) {
						data.errors.Email.forEach((errorMessage) => {
							Notification['error'](errorMessage, { duration: 5 });
						});
					}
				} else {
					console.log(data);
					Notification['error']('Error', { duration: 5 });
				}
				ok = false;
			});
		return ok;
	};

	GetUserSession = async () => {
		let ok = false;
		await API.get(`Auth/GetUserSession`)
			.then(async (res) => {
				ok = true;
			})
			.catch((error) => {
				console.log(error);
				ok = false;
			});

		//console.log(ok,ok)
		return ok;
	};

	Login = async (login) => {
		let ok = false;
		await API.post(`Auth/Login`, login)
			.then((res) => {
				console.log(res);
				localStorage.setItem('@AxosnetReceipts.token', res.data.token);
				ok = true;
			})
			.catch(({ response: { data } }) => {
				if (data.errorMessage) {
					Notification['error'](data.errorMessage, { duration: 5 });
				} else if (data.errors) {
					if (data.errors.Password) {
						data.errors.Password.forEach((errorMessage) => {
							Notification['error'](errorMessage, { duration: 5 });
						});
					}

					if (data.errors.Email) {
						data.errors.Email.forEach((errorMessage) => {
							Notification['error'](errorMessage, { duration: 5 });
						});
					}
				} else {
					console.log(data);
					Notification['error']('Error', { duration: 5 });
				}
			});
		return ok;
	};
}

export default AuthService;
