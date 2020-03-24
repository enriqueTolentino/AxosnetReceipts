import API from './AxiosConfig';
import Notification from 'react-bulma-notification';

class AuthService {
	Create = async (user) => {
		let ok = false;

		await API.post(`Auth/CreateUser`, user)
			.then((res) => {
				console.log(res);
				ok = true;
				Notification['success']('User created successfully, now you can Sign In', { duration: 5 });
			})
			.catch(({ response: { data } }) => {
				if(data.errorMessage) {
				    Notification['error'](data.errorMessage, { duration: 5 });
				}
				else if (data.errors) {
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
				}
				else {
					console.log(data);
					Notification['error']('Error', { duration: 5 });
				}
				ok = false;
			});
		return ok;
	};
}

export default AuthService;
