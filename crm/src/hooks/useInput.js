import { useState } from "react";

export function useInput(initialState = '') {
	const [value, setValue] = useState(initialState);

	function onChange(event) {
		//если чекбокс, то не value, а checked
		//event.target.type === 'checkbox';
		//setValue(event.target.checked);

		setValue(event.target.value);
	}

	return { value, onChange, setValue };
}