import type {GlobalConfig} from 'payload'

export const Footer: GlobalConfig = {
	slug: 'footer',
	label: 'Подвал',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'columns',
			label: 'Колонки',
			type: 'array',
			maxRows: 4,
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'links',
					type: 'array',
					fields: [
						{name: 'label', type: 'text', required: true},
						{name: 'url', type: 'text', required: true},
					],
				},
			],
		},
		{
			name: 'bottomText',
			label: 'Текст внизу',
			type: 'textarea',
		},
		{
			name: 'copyright',
			label: 'Копирайт',
			type: 'text',
			defaultValue: '© 2025 DG Motors. Все права защищены.',
		},
	],
}
