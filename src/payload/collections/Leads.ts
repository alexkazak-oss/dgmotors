import type {CollectionConfig} from 'payload'
import {anyone} from '../access'
import {sendLeadNotification} from '../hooks/sendLeadNotification'

export const Leads: CollectionConfig = {
	slug: 'leads',
	labels: {singular: 'Заявка', plural: 'Заявки'},
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'type', 'phone', 'car', 'createdAt'],
	},
	hooks: {
		afterChange: [sendLeadNotification],
	},
	access: {
		read: ({req: {user}}) => Boolean(user),
		create: anyone,
		update: ({req: {user}}) => Boolean(user),
		delete: ({req: {user}}) => Boolean(user),
	},
	fields: [
		{
			name: 'type',
			label: 'Тип заявки',
			type: 'select',
			required: true,
			options: [
				{label: 'Обратный звонок', value: 'callback'},
				{label: 'Контакт', value: 'contact'},
				{label: 'Запрос по авто', value: 'car_inquiry'},
				{label: 'Кредит', value: 'credit'},
				{label: 'Лизинг', value: 'leasing'},
			],
		},
		{
			name: 'name',
			label: 'Имя',
			type: 'text',
			required: true,
		},
		{
			name: 'phone',
			label: 'Телефон',
			type: 'text',
			required: true,
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
		},
		{
			name: 'comment',
			label: 'Комментарий',
			type: 'textarea',
		},
		// Source tracking
		{
			name: 'sourceUrl',
			label: 'URL источника',
			type: 'text',
			admin: {readOnly: true},
		},
		{
			name: 'utmSource',
			type: 'text',
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 'utmMedium',
			type: 'text',
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 'utmCampaign',
			type: 'text',
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 'utmTerm',
			type: 'text',
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 'utmContent',
			type: 'text',
			admin: {readOnly: true, position: 'sidebar'},
		},
		// Related entities
		{
			name: 'car',
			label: 'Автомобиль',
			type: 'relationship',
			relationTo: 'cars',
			hasMany: false,
		},
		{
			name: 'brand',
			label: 'Бренд',
			type: 'relationship',
			relationTo: 'brands',
			hasMany: false,
		},
		{
			name: 'model',
			label: 'Модель',
			type: 'relationship',
			relationTo: 'models',
			hasMany: false,
		},
		// Snapshot fields
		{
			name: 'carTitleSnapshot',
			label: 'Название авто (снимок)',
			type: 'text',
			admin: {readOnly: true},
		},
		{
			name: 'carUrlSnapshot',
			type: 'text',
			admin: {readOnly: true},
		},
		{
			name: 'vinSnapshot',
			type: 'text',
			admin: {readOnly: true},
		},
		{
			name: 'stockNumberSnapshot',
			type: 'text',
			admin: {readOnly: true},
		},
		// Status tracking
		{
			name: 'leadStatus',
			label: 'Статус',
			type: 'select',
			defaultValue: 'new',
			options: [
				{label: 'Новая', value: 'new'},
				{label: 'В работе', value: 'processing'},
				{label: 'Завершена', value: 'completed'},
				{label: 'Отклонена', value: 'rejected'},
			],
			admin: {position: 'sidebar'},
		},
	],
}
