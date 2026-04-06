import type {CollectionConfig} from 'payload'

export const Media: CollectionConfig = {
	slug: 'media',
	labels: {singular: 'Медиа', plural: 'Медиа'},
	upload: {
		mimeTypes: ['image/*'],
		imageSizes: [
			{name: 'thumbnail', width: 400, height: 300},
			{name: 'card', width: 768, height: 512},
			{name: 'hero', width: 1920, height: 1080},
		],
	},
	access: {
		read: () => true,
	},
	fields: [
		{name: 'alt', type: 'text', required: true, label: 'Альтернативный текст'},
	],
}
