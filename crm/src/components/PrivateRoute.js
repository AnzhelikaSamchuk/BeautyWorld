import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

//расширяет функционал классического Route
//смотрит, если пользователь авторизирован, то что указали (в моем случае это мастер), если нет то навигироваться на страницу авторизации
export function PrivateRouteLogin({ children }) {
	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to="/login" />;
	}

	return children;
}

export function PrivateRouteMain({ children }) {
	const { isAuth } = useAuth();

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return children;
}