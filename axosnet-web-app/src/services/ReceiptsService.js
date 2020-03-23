import API from './AxiosConfig';

class ReceiptsService {
	GetAllReceipts = async () => {
		let data;
		await API.get(`Receipts/GetAll`)
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

export default ReceiptsService;