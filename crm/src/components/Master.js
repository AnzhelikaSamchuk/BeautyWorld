import React, { useContext } from "react";
import { MastersContext } from "../context/MastersContext";

/*export class Master extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			someData: 'aaa'
		};
	}

	remove = () => {
		alert('Remove');
		this.setState({someData: 'bbb'});
	}
	
	render() {
		const { master } = this.props;
		const { photo, fullName, position } = master;
		const { someData } = this.state;

		return (
			//как называется компонент так и обертка
			<div className="Master">
				{/*Для незакрывающихся тегов /> в конце}
				{someData}
				<div><img src={photo} width="200" alt=""/></div>
				<p>{fullName}</p>
				<p>{position}</p>
				<button onClick={this.remove}>Удалить Х</button>
			</div>
		)
	}
}*/

//{/*Функциональные компоненты, Хуки и наш state мы можем использовать внутри функции: useState */}
export function Master({ master }) {
	const { photo, fullName, position } = master;
	const { remove } = useContext(MastersContext);

	//хранит некое состояние, возвращает массив = кортеж
	//само состаяние и некий метод, который может менять данное состояние 
	//const [someData, setSomeData] = useState('aaa');

	return (
		<div className="Master" style={{ display: 'inline-block', margin: '0 15px'}}>
				{/*Для незакрывающихся тегов /> в конце*/}
				{/*someData*/}
				<div><img src={photo} width="200" alt=""/></div>
				<p>{fullName}</p>
				<p>{position}</p>
				<button onClick={remove}>Удалить Х</button>
			</div>
	);
}
