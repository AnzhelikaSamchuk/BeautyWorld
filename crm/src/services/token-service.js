//import jwtDecode from 'jwt-decode';
import { TOKEN_KEY } from '../constants';

class TokenService {
	//положить
	setToken(token) {
		localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
	}

	//получать
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	}

	//удалять
	removeToken() {
		localStorage.removeItem(TOKEN_KEY);
	}

	//проверять на валидность
	isTokenValid() {
		const token = this.getToken();
		//нужно допилить логику
		return token !== undefined && token !== null;
	}
}

export default new TokenService();