import type {CollectionConfig} from 'payload'
import {isAdminOrPublished} from '../access'
import {publishedField, seoFields, slugField} from '../fields'

export const Pages: CollectionConfig = {
	slug: 'pages',
	labels: {singular: 'Страница', plural: 'Страницы'},
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
			label: 'Заголовок',
			type: 'text',
			required: true,
		},
		slugField,
		{
			name: 'content',
			label: 'Содержимое',
			type: 'richText',
		},
		publishedField,
		...seoFields,
	],
}
