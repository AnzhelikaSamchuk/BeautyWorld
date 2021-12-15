import { API_PATH } from '../constants';
import { HttpService } from '../services/http-service';

export class ApiService extends HttpService {

	constructor() {
		super(API_PATH);
	}

	getCustomers() {
		return this.get('customers');
	}

	getOrders() {
		return this.get('orders');
	}

	login(authData) {
		return this.post('login', authData);
	}

}

export default new ApiService();