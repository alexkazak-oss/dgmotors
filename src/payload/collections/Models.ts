import type {CollectionConfig} from 'payload'
import {isAdminOrPublished} from '../access'
import {autoPublishedField, seoFields, slugField} from '../fields'

export const Models: CollectionConfig = {
	slug: 'models',
	labels: {singular: 'Модель', plural: 'Модели'},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'brand', 'isPublished'],
	},
	access: {
		read: isAdminOrPublished,
	},
	fields: [
		{
			name: 'title',
			label: 'Название',
			type: 'text',
			required: true,
			minLength: 1,
			maxLength: 100,
		},
		slugField,
		{
			name: 'brand',
			label: 'Бренд',
			type: 'relationship',
			relationTo: 'brands',
			required: true,
			hasMany: false,
		},
		{
			name: 'image',
			label: 'Изображение',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'shortDescription',
			label: 'Краткое описание',
			type: 'textarea',
		},
		{
			name: 'description',
			label: 'Описание',
			type: 'richText',
		},
		{
			name: 'bodyType',
			label: 'Тип кузова',
			type: 'select',
			options: [
				{label: 'Седан', value: 'sedan'},
				{label: 'Кроссовер', value: 'crossover'},
				{label: 'Хэтчбек', value: 'hatchback'},
				{label: 'Универсал', value: 'wagon'},
				{label: 'Минивэн', value: 'minivan'},
				{label: 'Купе', value: 'coupe'},
				{label: 'Пикап', value: 'pickup'},
			],
		},
		{
			name: 'order',
			label: 'Порядок',
			type: 'number',
			defaultValue: 0,
			admin: {position: 'sidebar'},
		},
		autoPublishedField,
		...seoFields,
	],
}
