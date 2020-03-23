import API from './AxiosConfig';

class CurrenciesService {
	GetAllCurrencies = async () => {
		let data;
		await API.get(`Currencies/GetAll`)
			.then(async (res) => {
				data = res.data;
			})
			.catch((error) => {
				console.log(error.message);
				data = [];
			});
		return data;
	};
}

export default CurrenciesService;