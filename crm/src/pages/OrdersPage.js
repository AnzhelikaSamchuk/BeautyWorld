import { Fragment } from "react";
import { Table } from "antd";

const dataSource = [
	{
		key: '1',
		name: 'Mike',
		age: 32,
		address: '10 Downing Street',
	},
	{
		key: '2',
		name: 'John',
		age: 42,
		address: '10 Downing Street',
	},
];

const columns = [
	{
		title: 'id',
		dataIndex: 'id',
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
];


export function OrdersPage() {

	/*const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('http://localhost:3001/api/customers');
			const _data = await response.json();
			setData(_data);
		}
		fetchData();
	}, []);*/

	return (
		<Fragment>
			<h1>Заявки</h1>
			<div>
				<Table
					columns={columns}
					dataSource={dataSource}
					pagination={{ pageSize: 50 }}
					scroll={{ y: 240 }}
				/>
			</div>
		</Fragment>
	)
}
