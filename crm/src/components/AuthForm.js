import { useInput } from '../hooks/useInput';

export function AuthForm({ onLogin }) {
	const loginInput = useInput();
	const passwordInput = useInput();

	function reset() {
		loginInput.setValue('');
		passwordInput.setValue('');
	}

	//Обработчик формы, который собирает данные
	function handleSubmit(e) {
		e.preventDefault();

		const data = {
			userName: loginInput.value,
			password: passwordInput.value
		};

		onLogin(data);//через пропсы вызывает колбэк и обновляет форму
		reset();
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<span>Логин</span>
				<input {...loginInput} placeholder="Введите логин" />
			</label>
			<br />
			<label>
				<span>Пароль</span>
				<input {...passwordInput} type="password" placeholder="Введите пароль" />
			</label>
			<br />
			<button>Войти</button>
		</form>
	)
}
