import { Route, Routes } from "react-router";
import { MastersPage, LoginPage, NotFoundPage } from './pages';
import { Navbar } from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import ApiService from "./api/api-service";
import { PrivateRouteLogin, PrivateRouteMain } from "./components/PrivateRoute";
import './App.css';

//import useEffect from "react";

function App() {

	/*useEffect(() => {
		async function fetch() {
			const customers = await ApiService.getCustomers();
			console.log(customers);
		}
	fetch();
	}, []);//без зависимотсей*/

	async function fetch() {
		const customers = await ApiService.getCustomers();
		console.log(customers);
	}
fetch();


	return (
		<AuthProvider>
			<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={
				<PrivateRouteLogin><MastersPage/></PrivateRouteLogin>
				} />
				<Route path="/login" element={
				<PrivateRouteMain><LoginPage/></PrivateRouteMain>
				} />
				{/*NotFound*/}
				<Route path="*" element={<NotFoundPage/>} />
			</Routes>
		</div>
		</AuthProvider>
	);
}

export default App;
