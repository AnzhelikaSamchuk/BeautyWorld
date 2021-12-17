import { useInput } from '../hooks/useInput';
import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function AuthForm({ onLogin }) {
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

		onLogin(data);
		reset();
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<UserOutlined />
				<input {...loginInput} placeholder="Введите логин" style={{ marginBottom: '10px' }} />
			</label>
			<br />
			<label>
				<UnlockOutlined />
				<input {...passwordInput} type="password" placeholder="Введите пароль" style={{ marginBottom: '10px' }} />
			</label>
			<br />
			<Button type="primary" htmlType="submit">Войти</Button>
		</form>
	);
}