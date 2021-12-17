import { useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd'
import MaskedInput from 'antd-mask-input'
import Modal from 'antd/lib/modal/Modal'

function CreateOrders({ createOrders }) {
	const [isModalVivible, setIsModalVilible] = useState(false)
	const [form] = Form.useForm()

	const showModal = () => {
		setIsModalVilible(true)
	}

	const handleCancel = () => {
		setIsModalVilible(false)
		form.resetFields()
	}

	function formatInput(input) {
		const formatObj = {
			name: input.name,
			phone: input.phone,
			masterId: !input.masterId ? 1 : Number(input.masterId),
			serviceId: !input.serviceId ? 1 : Number(input.serviceId),
			visitDate: !input.visitDate ? '' : new Date(input.visitDate).toISOString()
		}
		return formatObj
	}

	const onFinish = (values) => {
		createOrders(formatInput(values))
		setIsModalVilible(false);
		form.resetFields()
	}

	return (
		<div>
			<Button type="primary" style={{ marginBottom: '14px' }} onClick={showModal}>Создать новую запись</Button>
			<Modal title="Создание новой записи" visible={isModalVivible} onOk={form.submit} onCancel={handleCancel} okText='Создать запись' cancelText='Отменить'>
				<Form
					form={form}
					name="create-order"
					onFinish={onFinish}
					layout="vertical"
				>
					<Form.Item name="name" rules={[{ required: true, message: 'Введите ФИО' }]}>
						<Input type="text" placeholder="Введите ФИО" />
					</Form.Item>
					<Form.Item name="phone" rules={[
						{
							required: true,
							message: 'Введите номер телефона'
						},
						{
							min: 11,
							warningOnly: true
						},
					]}>
						<MaskedInput mask='+7 (111) 111 11-11' maxLength={12} />
					</Form.Item>
					<Form.Item name='masterId'>
						<Select placeholder='Мастер'>
							<Select.Option value='1'>Краснова Ирина Сергеевна</Select.Option>
							<Select.Option value='2'>Иванова Елена Сергеевна</Select.Option>
							<Select.Option value='3'>Калилова Жанна Сергеевна</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name='serviceId'>
						<Select placeholder='Услуга'>
							<Select.Option value='1'>Креативный Стиль</Select.Option>
							<Select.Option value='2'>Визажист-стилист</Select.Option>
							<Select.Option value='3'>Мастер ногтевого сервиса</Select.Option>
							<Select.Option value='4'>Женская стрижка</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name='visitDate'>
						<DatePicker format="DD-MM-YYYY" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default CreateOrders