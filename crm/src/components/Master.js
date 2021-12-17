import React, { useContext } from "react";
import { MastersContext } from "../contexts/MastersContext";

//{/*Функциональные компоненты, Хуки и наш state мы можем использовать внутри функции: useState */}
export function Master({ master }) {
	const { photo, fullName, position } = master;
	const { remove } = useContext(MastersContext);

	return (
		<div className="Master" style={{ display: 'inline-block', margin: '0 15px' }}>
			{/*Для незакрывающихся тегов /> в конце*/}
			{/*someData*/}
			<div><img src={photo} width="200" alt="" /></div>
			<p>{fullName}</p>
			<p>{position}</p>
			<button onClick={remove}>Удалить X</button>
		</div>
	);
}