import type {CollectionConfig} from 'payload'

export const Locations: CollectionConfig = {
	slug: 'locations',
	labels: {singular: 'Локация', plural: 'Локации'},
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			label: 'Название',
			type: 'text',
			required: true,
		},
		{
			name: 'address',
			label: 'Адрес',
			type: 'text',
			required: true,
		},
		{
			name: 'city',
			label: 'Город',
			type: 'text',
		},
		{
			name: 'phone',
			label: 'Телефон',
			type: 'text',
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
		},
		{
			name: 'workingHours',
			label: 'Режим работы',
			type: 'textarea',
		},
		{
			name: 'mapCoordinates',
			label: 'Координаты',
			type: 'group',
			fields: [
				{name: 'lat', type: 'number', label: 'Широта'},
				{name: 'lng', type: 'number', label: 'Долгота'},
			],
		},
		{
			name: 'image',
			label: 'Изображение',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'order',
			label: 'Порядок',
			type: 'number',
			defaultValue: 0,
		},
	],
}
