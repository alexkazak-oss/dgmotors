import type {CollectionConfig} from 'payload'

export const Users: CollectionConfig = {
	slug: 'users',
	labels: {singular: 'Пользователь', plural: 'Пользователи'},
	auth: true,
	admin: {
		useAsTitle: 'email',
	},
	fields: [
		{
			name: 'role',
			label: 'Роль',
			type: 'select',
			required: true,
			defaultValue: 'admin',
			options: [
				{label: 'Администратор', value: 'admin'},
				{label: 'Менеджер', value: 'manager'},
			],
		},
		{
			name: 'name',
			label: 'Имя',
			type: 'text',
		},
	],
}
