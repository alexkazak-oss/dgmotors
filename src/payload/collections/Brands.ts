import type {CollectionConfig} from 'payload'
import {isAdminOrPublished} from '../access'
import {autoPublishedField, seoFields, slugField} from '../fields'

export const Brands: CollectionConfig = {
	slug: 'brands',
	labels: {singular: 'Бренд', plural: 'Бренды'},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'isPublished'],
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
			maxLength: 80,
		},
		slugField,
		{
			name: 'logo',
			label: 'Логотип',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'country',
			label: 'Страна',
			type: 'text',
		},
		{
			name: 'description',
			label: 'Описание',
			type: 'richText',
		},
		{
			name: 'shortDescription',
			label: 'Краткое описание',
			type: 'textarea',
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
