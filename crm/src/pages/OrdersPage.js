import { Fragment, useEffect, useState } from "react";
import { Space, Table } from "antd";
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, Select } from 'antd'
import { ApiService } from "../api/api-service";

const { RangePicker } = DatePicker;

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
				<EditOutlined style={{ cursor: 'pointer' }} />
				<DeleteOutlined style={{ cursor: 'pointer' }} />
			</Space>
		)
	}
]

export function OrdersPage() {

	//GET - получение данных
	const [state, setstate] = useState([]);
	const [loading, setloading] = useState(true);
	useEffect(() => {
		getData();
	}, []);

	const api = new ApiService();

	const getData = async () => {
		const result = await api.getOrders();
		setloading(false);
		console.log(result);
		setstate(
			result.map(rec => ({
				id: rec.id,
				customer: rec.customer.fullName,
				phone: rec.customer.phone,
				master: rec.master.fullName,
				service: rec.service.name,
				status: rec.status === 'Opened' ? 'Открыта' : 'Закрыта',
				visitDate: rec.visitDate,
				key: rec.id
			}))
		);
	};

	async function filterData(data) {
		const result = await api.getFilterOrders(data);
		setloading(false);
		console.log(result);
		setstate(
			result.map(rec => ({
				id: rec.id,
				customer: rec.customer.fullName,
				phone: rec.customer.phone,
				master: rec.master.fullName,
				service: rec.service.name,
				status: rec.status === 'Opened' ? 'Открыта' : 'Закрыта',
				visitDate: rec.visitDate,
				key: rec.id
			}))
		);
	};

	//фильтрация
	const [form] = Form.useForm();

	const formatInput = (input) => {
		let obj = {};
		
		if (input.visitDate) {
			obj.from = new Date(input.visitDate[0]).toISOString();
			obj.to = new Date(input.visitDate[1]).toISOString();
		}

		if (input.status) {
			obj.status = input.status;
		}

		if (input.name) {
			obj.search = input.name;
		}

		return new URLSearchParams(obj).toString();
	}

	const onFinish = (values) => {
		var get = '?';
		get += formatInput(values);
		filterData(get);
	}

	function clearFilter() {
		form.resetFields();
		getData();
	}

	//

	return (
		<Fragment>
			<h1>Заявки</h1>
			<div>
				<Form
					form={form}
					name="filter"
					onFinish={onFinish}
					layout='inline'
					style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}
				>
					<Form.Item name="visitDate">
						<RangePicker />
					</Form.Item>
					<Form.Item name="name" >
						<Input type="text" placeholder="Введите ФИО клиента"/>
					</Form.Item>
					<Form.Item name='status'>
						<Select placeholder='Статус заявки'>
							<Select.Option value='Opened'>Открыта</Select.Option>
							<Select.Option value='Closed'>Закрыта</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item shouldUpdate>
						{() => (
							<Button type="primary" htmlType="submit" >Фильтровать</Button>
						)}
					</Form.Item>
					<Form.Item name="name" >
						<Button type="primary" htmlType="submit" onClick={clearFilter}>Очистить фильтр</Button>
					</Form.Item>
						</Form>
				{loading ? (
					<LoadingOutlined />
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
