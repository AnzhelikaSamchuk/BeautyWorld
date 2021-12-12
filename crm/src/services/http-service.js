import PubSub from './pubsub';
import TokenService from './token-service';

//логикаЖ при каждом обращении у нас берется токен и подставляется в bearer
export class HttpService {

	constructor(baseApiPath) {
		this.baseApi = baseApiPath;
	}

	//TokenService - отдельная сущность, которая будет работать только с токином (доставать, ложить и проверять на валидность)
	get baseHeaders() {
		return {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${TokenService.getToken()}`//авторизационный токен
		};
	}

	//в каждом методе в момент вызова составляем путь API, указываем заголовки
	async get(path) {
		const response = await fetch(`${this.baseApi}/${path}`, { headers: this.baseHeaders });
		return this._handleResponse(response);
	}

	async post(path, body) {
		const stringifiedData = JSON.stringify(body);

		const response = await fetch(`${this.baseApi}/${path}`, {
			method: 'POST',
			body: stringifiedData,
			headers: this.baseHeaders
		});

		return this._handleResponse(response);
	}

	//общий для всех методов, распарсивает ответ
	async _handleResponse(response) {
		const parsedData = await response.json();

		if (response.ok) {
			return parsedData;
		}

		//не авторизован, будем вызывать что-то, что будет разлогинивать пользователя
		if (response.status === 401) {
			//Pubsub - паттерн, который позволяет подписываться на некие события и уведомлять подписчиков
			//этими данными и чтобы слушатель обработал событие
			PubSub.emit('logout');
		}

		throw parsedData;
	}
}