import API from './AxiosConfig';
import Notification from 'react-bulma-notification';
import { convertUTCDateToLocalDate } from '../helpers/Formats';

class ReceiptsService {
	GetAllReceipts = async () => {
		let receipts;
		await API.get(`Receipts/GetAll`)
			.then(async (res) => {
				receipts = res.data;
			})
			.catch((error) => {
				console.log(error.message);
				receipts = [];
			});
		return receipts;
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

	GetReceiptById = async (idReceipt) => {
		let receipt;
		await API.get(`Receipts/GetById/${idReceipt}`)
			.then(async (res) => {
				receipt = res.data;
				receipt.date = convertUTCDateToLocalDate(receipt.date);
			})
			.catch((error) => {
				console.log(error.message);
				receipt = {
					idReceipt: 0,
					providerCode: '',
					amount: '',
					comments: '',
					idCurrency: '',
					date: new Date()
				};
			});
		return receipt;
	};

	Edit = async (receipt) => {
		let id;
		receipt.amount = parseFloat(receipt.amount).toFixed(2);

		await API.post(`Receipts/Edit/${receipt.idReceipt}`, receipt)
			.then((res) => {
				console.log(res);
				id = res.data.idReceipt;
				Notification['success']('Receipt was updated successfully', { duration: 5 });
			})
			.catch((error) => {
				console.log(error);
				id = -1;
				Notification['error']('Error', { duration: 5 });
			});
		return id;
	};

	Delete = async (idReceipt) => {
		let ok;
		await API.delete(`Receipts/Delete/${idReceipt}`)
			.then((res) => {
				ok = true;
				Notification['success']('Receipt was deleted successfully', { duration: 5 });
			})
			.catch((error) => {
				console.log(error);
				ok = false;
				Notification['error']('Error', { duration: 5 });
			});

		return ok;
	};
}

export default ReceiptsService;
