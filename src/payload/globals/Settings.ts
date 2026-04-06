import type {GlobalConfig} from 'payload'

export const Settings: GlobalConfig = {
	slug: 'settings',
	label: 'Настройки',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'siteName',
			label: 'Название сайта',
			type: 'text',
			defaultValue: 'DG Motors',
		},
		{
			name: 'siteDescription',
			label: 'Описание сайта',
			type: 'textarea',
		},
		{
			name: 'adminEmail',
			type: 'email',
			label: 'Email для уведомлений',
		},
		{
			name: 'phone',
			label: 'Телефон',
			type: 'text',
		},
		{
			name: 'additionalPhones',
			label: 'Дополнительные телефоны',
			type: 'array',
			fields: [
				{name: 'phone', type: 'text'},
				{name: 'label', type: 'text'},
			],
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
		},
		{
			name: 'address',
			label: 'Адрес',
			type: 'textarea',
		},
		{
			name: 'workingHours',
			label: 'Режим работы',
			type: 'textarea',
		},
		{
			name: 'socialLinks',
			label: 'Социальные сети',
			type: 'group',
			fields: [
				{name: 'instagram', type: 'text'},
				{name: 'facebook', type: 'text'},
				{name: 'telegram', type: 'text'},
				{name: 'youtube', type: 'text'},
				{name: 'viber', type: 'text'},
			],
		},
		{
			name: 'scripts',
			label: 'Скрипты',
			type: 'group',
			fields: [
				{name: 'googleAnalytics', type: 'text', label: 'Google Analytics ID'},
				{name: 'facebookPixel', type: 'text', label: 'Facebook Pixel ID'},
			],
		},
	],
}
