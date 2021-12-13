import { Route, Routes } from 'react-router';
import { useEffect } from 'react';
import { OrdersPage, LoginPage, MastersPage, NotFoundPage } from './pages';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import ApiService from './api/api-service';
import { PrivateRouteLogin, PrivateRouteMain } from "./components/PrivateRoute";
import './App.css';

function App() {

	useEffect(() => {
		async function fetch() {
			const customers = await ApiService.getCustomers();
			console.log(customers);
		}

		fetch();
	}, []);

	return (
		<AuthProvider>
			<div className="App">
				<Navbar />

				<Routes>
					<Route path="/" element={<OrdersPage />} />
					<Route path="/masters" element={
						<PrivateRouteLogin><MastersPage /></PrivateRouteLogin>
					} />
					<Route path="/login" element={
						<PrivateRouteMain><LoginPage /></PrivateRouteMain>
					} />
					{/*NotFound*/}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</AuthProvider>
	);
}

export default App;
