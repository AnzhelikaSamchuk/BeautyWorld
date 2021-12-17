class PubSub {
	constructor() {
		this.listeners = {};
	}

	//событие подписки
	on(action, callback) {
		if (this.listeners[action]) {
			this.listeners[action].push(callback);
		} else {
			this.listeners[action] = [callback];
		}
	}

	//будет оповещать наших слушателей
	emit(action, data) {
		if (this.listeners[action]) {
			this.listeners[action].forEach(l => l(data));
		}
	}
}

export default new PubSub();
//Применение
/*PubSub.on('logout'', () => {
})*/
//Уведомить, что произошло некоторое событие в http-ser
//PubSub.emit('logout')