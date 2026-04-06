import {postgresAdapter} from '@payloadcms/db-postgres'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import {s3Storage} from '@payloadcms/storage-s3'
import {ru} from '@payloadcms/translations/languages/ru'
import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'

import {
	Brands,
	Cars,
	Leads,
	Locations,
	Media,
	Models,
	Pages,
	Users,
} from './src/payload/collections'
import {Footer, Header, Settings} from './src/payload/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const s3Enabled =
	process.env.S3_BUCKET &&
	process.env.S3_ACCESS_KEY_ID &&
	process.env.S3_SECRET_ACCESS_KEY &&
	process.env.S3_REGION

export default buildConfig({
	admin: {
		user: Users.slug,
		meta: {
			titleSuffix: ' — DG Motors Admin',
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},

	i18n: {
		supportedLanguages: {ru},
		fallbackLanguage: 'ru',
	},
	localization: false,

	collections: [Users, Media, Brands, Models, Cars, Locations, Leads, Pages],
	globals: [Settings, Header, Footer],

	editor: lexicalEditor(),

	secret: process.env.PAYLOAD_SECRET || '',

	typescript: {
		outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
	},

	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
	}),

	plugins: [
		...(s3Enabled
			? [
					s3Storage({
						collections: {
							media: {
								prefix: 'media',
							},
						},
						bucket: process.env.S3_BUCKET!,
						config: {
							credentials: {
								accessKeyId: process.env.S3_ACCESS_KEY_ID!,
								secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
							},
							region: process.env.S3_REGION!,
							...(process.env.S3_ENDPOINT
								? {
										endpoint: process.env.S3_ENDPOINT,
										forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
									}
								: {}),
						},
					}),
				]
			: []),
	],
})
