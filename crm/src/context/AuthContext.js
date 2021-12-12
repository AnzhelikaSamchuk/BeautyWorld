import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../api/api-service';
import PubSub from '../services/pubsub';
import TokenService from '../services/token-service';

const AuthContext = createContext();

// HOC
function AuthProvider(props) {
	const [isAuth, setIsAuth] = useState(TokenService.isTokenValid());
	const navigate = useNavigate();//после авторизации возвращаем на страницу мастеров

	async function login(authData) {
		try {
			const access_token = await ApiService.login(authData);
			TokenService.setToken(access_token);
			setIsAuth(true);
			navigate('/');
		} catch (e) {
			setIsAuth(false);
			console.log(e);
		}
	}

	function logout() {
		TokenService.removeToken();
		setIsAuth(false);
		navigate('/login');
	}

	PubSub.on('logout', logout);

	return <AuthContext.Provider value={{ login, logout, isAuth }} {...props} />;
}

export { AuthProvider, AuthContext };