import { Fragment, useEffect, useState } from "react";
import { Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ApiService } from "../api/api-service";

const columns = [
	{
		 title: 'Имя клиента',
		 dataIndex: 'customer',
		 key: 'customer',
	},
	{
		 title: 'Номер телефона',
		 dataIndex: 'phone',
		 key: 'phone'
	},
	{
		 title: 'Имя мастера',
		 dataIndex: 'master',
		 key: 'master',
	},
	{
		 title: 'Услуга',
		 dataIndex: 'service',
		 key: 'service',
	},
	{
		 title: 'Дата визита',
		 dataIndex: 'visitDate',
		 key: 'visitDate',
	},
	{
		 title: 'Статус',
		 dataIndex: 'status',
		 key: 'status'
	},
	{
		 title: 'Действия',
		 key: 'action',
		 render: () => (
			  <Space size='middle'>
					<EditOutlined style={{cursor: 'pointer'}} />
					<DeleteOutlined style={{cursor: 'pointer'}} />
			  </Space>
		 )
	}
]

export function OrdersPage() {
	const api = new ApiService();

	const [state, setstate] = useState([]);
	const [loading, setloading] = useState(true);
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {

		const result = await api.getOrders();
		setloading(false);
		console.log(result);
		setstate(
			result.map(row => ({
				id: row.id,
				customer: row.customer.fullName,
				phone: row.customer.phone,
				master: row.master.fullName,
				service: row.service.name,
				status: row.status === 'Opened' ? 'Открыта' : 'Закрыта',
				visitDate: row.visitDate,
				key: row.id
			}))
		);
	};


	return (
		<Fragment>
			<h1>Заявки</h1>
			<div>
				{loading ? (
					"Loading"
				) : (
					<Table
						columns={columns}
						dataSource={state}
						pagination={{ pageSize: 50 }}
						scroll={{ y: 240 }}
					/>
				)}
			</div>
		</Fragment>
	)
}
