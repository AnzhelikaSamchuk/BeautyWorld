import { Fragment, useRef, useState } from "react";
import { Masters } from "../components/Masters";
import { MastersContext } from "../contexts/MastersContext";
import { useInput } from "../hooks/useInput";

function masterFactory(id, fullName = 'Краснова Ирина') {
	return {
		id,
		fullName,
		position: 'Мастер ногтевого сервиса',
		photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/9df59234053606.56c27d7f1e127.jpg'
	}
}

const mastersMockData = [
	masterFactory(1),
	masterFactory(2),
	masterFactory(3)
];

export function MastersPage() {
	//Условный рендеринг
	const [masters, setMasters] = useState(mastersMockData);
	const nameInput = useInput();
	const inputRef = useRef();

	function remove(master) {
		setMasters(masters.filter(m => m.id !== master.id));
	}

	function handleForm(event) {
		event.preventDefault();

		if (inputRef.current) {
			//const value = inputRef.current.value;//получаем value, може обнулять, следить за событиями, установить фокус
			inputRef.current.focus();
		}

		const master = masterFactory(4, nameInput.value);
		setMasters(masters.concat([master]));
		//setMasters([...masters, master]);
	}

	return (
		<Fragment>
			<h1>Страница мастеров</h1>
			{/*Ref'ы */}
			<form onSubmit={handleForm}>
				<input ref={inputRef} {...nameInput} placeholder="Введите имя сотрудника" />
				<button>Добавить</button>
			</form>
			<br />

			<MastersContext.Provider value={{ remove }}>
				<Masters masters={masters} />
			</MastersContext.Provider>
		</Fragment>
	)
}