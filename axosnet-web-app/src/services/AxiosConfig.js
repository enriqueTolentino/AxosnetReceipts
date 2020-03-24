import axios from 'axios';

const getToken = () => {
    const token = localStorage.getItem('@AxosnetReceipts.token');
    return token ? token : '';
};

export default axios.create({
	baseURL: `https://localhost:5001/api/`,
	headers: {
	  common: {'Authorization': `Bearer ${getToken()}`}
	}
});