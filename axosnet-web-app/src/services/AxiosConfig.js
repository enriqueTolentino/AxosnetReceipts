import axios from 'axios';

export default axios.create({
	baseURL: `https://localhost:5001/api/`
	// headers: {
	//   common: {'Authorization': `Bearer ${getToken()}`}
	// }
});


//put here token storage and consultant