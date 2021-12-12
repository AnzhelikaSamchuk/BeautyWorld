import { Fragment } from "react";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
	const { login } = useAuth();

	return (
		<Fragment>
			<h1>Вход</h1>
			<AuthForm onLogin={login} />
		</Fragment>
	);
}