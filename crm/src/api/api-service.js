import { API_PATH } from '../constants';
import { HttpService } from '../services/http-service';

export class ApiService extends HttpService {

	constructor() {
		super(API_PATH);
	}

	getOrders() {
		return this.get('orders');
	}

	getFilterOrders(data) {
		const query = `orders${data}`;
		return this.get(query);
	}

	createOrders(createData) {
		return this.post('orders', createData);
	}

	deleteOrders(id) {
		const query = `orders/${id}`;
		return this.delete(query);
	}

	login(authData) {
		return this.post('login', authData);
	}
}

export default new ApiService();