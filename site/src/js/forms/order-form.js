export class OrderForm {

	async changedForm(event, loader, success, form) {

	const formData = new FormData();
	Array
	.from(event.target.elements)
	.filter(el => el.name)
	.forEach(el => {
		const { value, name } = el;

		formData.append(name, value);
	});

	for (let item of formData.entries()) {
		console.log(item);
	}

	loader.style.display = 'block';

	const response = await fetch('http://localhost:3001/api/orders', {
		method: 'POST',
		body: formData
	});

	if (response.status === 400 || response.ok) {
		console.log("ok");
		loader.style.display = 'none';
		form.reset(); //сброс формы
		success.style.display = 'block';
		this._timeout(() => {
			success.style.display = 'none';
		}, 3000);
	}

	}

	_timeout(callback, time) {
		setTimeout(callback, time);
	}

}