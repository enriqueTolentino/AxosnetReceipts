import API from './AxiosConfig';
import Notification from 'react-bulma-notification';

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

	Create = async (receipt) => {
		let id;
		receipt.amount = parseFloat(receipt.amount).toFixed(2);

		await API.post(`Receipts/Create`, receipt)
			.then((res) => {
				console.log(res);
				id = res.data.idReceipt;
				Notification['success']('Receipt was created successfully', { duration: 5 });			
			})
			.catch((error) => {
				console.log(error);
				id = -1;
				Notification['error']('Error', { duration: 5 });	
			});
		return id;
	};
}

export default ReceiptsService;