import { Button } from "antd";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
	const { isAuth, logout } = useAuth();

	return isAuth &&
		<nav>
			<Link style={{ marginRight: '10px' }} to="/">Заявки</Link>
			<Link style={{ marginRight: '10px' }} to="/masters">Мастера</Link>
			<Link style={{ marginRight: '10px' }} to="login">Страница входа</Link>
			<Link style={{ marginRight: '10px' }} to="*">Не найдено</Link>
			<Button type="primary" onClick={logout}>Выйти</Button>
		</nav>
		;
}