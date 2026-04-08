import type {CollectionConfig} from 'payload'

export const Media: CollectionConfig = {
	slug: 'media',
	labels: {singular: 'Медиа', plural: 'Медиа'},
	upload: {
		mimeTypes: ['image/*'],
		filesRequiredOnCreate: false,
		imageSizes: [
			{name: 'thumbnail', width: 400, height: 300},
			{name: 'card', width: 768, height: 512},
			{name: 'hero', width: 1920, height: 1080},
		],
	},
	admin: {
		components: {
			beforeListTable: ['@/src/payload/components/S3SyncButton'],
		},
	},
	access: {
		read: () => true,
	},
	fields: [
		{name: 'alt', type: 'text', required: true, label: 'Альтернативный текст'},
		{
			name: 's3Key',
			type: 'text',
			label: 'S3 Key',
			unique: true,
			index: true,
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 'source',
			type: 'select',
			label: 'Источник',
			defaultValue: 'payload',
			options: [
				{label: 'Payload Upload', value: 'payload'},
				{label: 'S3 Import', value: 's3-import'},
			],
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 's3ETag',
			type: 'text',
			label: 'S3 ETag',
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 's3LastModified',
			type: 'date',
			label: 'S3 Last Modified',
			admin: {readOnly: true, position: 'sidebar'},
		},
		{
			name: 'syncedAt',
			type: 'date',
			label: 'Синхронизировано',
			admin: {readOnly: true, position: 'sidebar'},
		},
	],
}
