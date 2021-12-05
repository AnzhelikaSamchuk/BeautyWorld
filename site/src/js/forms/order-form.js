export class OrderForm {

	changedForm(event, loader, success, form) {
		const formData = Array
			.from(event.target.elements)
			.filter(el => el.name)
			.map(el => {
				const { value, name } = el;
				return { [name]: value };
			});

		console.log(formData);

		/*fetch(`http://localhost:3001/api/customers?fullName`)
		//информация об ответе, статус, заголовки и данные и распаковываем методом json
		.then(response => response.json());//ворачивается данные*/

		loader.style.display = 'block';
		this._sendRequest(() => {
			//после того как получили ответ блокируем лоадер
			loader.style.display = 'none';
			form.reset(); //сброс формы
			success.style.display = 'block';
			this._timeout(() => {
				success.style.display = 'none';
			}, 3000);

		});
	}

	_timeout(callback, time) {
		setTimeout(callback, time);
	}

	//якобы отправляется запрос на сервер
	_sendRequest(callback) {
		setTimeout(callback, 2000);
	}
}