import type {GlobalConfig} from 'payload'

export const Header: GlobalConfig = {
	slug: 'header',
	label: 'Шапка',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'logo',
			label: 'Логотип',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'navItems',
			label: 'Пункты меню',
			type: 'array',
			fields: [
				{
					name: 'label',
					type: 'text',
					required: true,
				},
				{
					name: 'url',
					type: 'text',
					required: true,
				},
				{
					name: 'children',
					label: 'Подпункты',
					type: 'array',
					fields: [
						{name: 'label', type: 'text', required: true},
						{name: 'url', type: 'text', required: true},
					],
				},
			],
		},
		{
			name: 'ctaText',
			label: 'Текст кнопки',
			type: 'text',
			defaultValue: 'Оставить заявку',
		},
		{
			name: 'ctaUrl',
			label: 'Ссылка кнопки',
			type: 'text',
			defaultValue: '#callback',
		},
	],
}
