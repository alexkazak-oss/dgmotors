import {Field} from 'payload'

export const slugField: Field = {
	name: 'slug',
	label: 'Слаг (URL)',
	type: 'text',
	required: true,
	unique: true,
	admin: {
		position: 'sidebar',
	},
	hooks: {
		beforeValidate: [
			({value, data}) => {
				if (!value && data?.title) {
					return slugify(data.title)
				}
				return value
			},
		],
	},
}

export function slugify(text: string): string {
	const translitMap: Record<string, string> = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'yo',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'j',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
	}

	return text
		.toLowerCase()
		.split('')
		.map((char) => translitMap[char] ?? char)
		.join('')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

export const seoFields: Field[] = [
	{
		name: 'seo',
		type: 'group',
		admin: {position: 'sidebar'},
		fields: [
			{name: 'title', type: 'text', label: 'SEO Заголовок'},
			{name: 'description', type: 'textarea', label: 'SEO Описание'},
			{
				name: 'image',
				type: 'upload',
				relationTo: 'media',
				label: 'OG Изображение',
			},
		],
	},
]

export const publishedField: Field = {
	name: 'isPublished',
	label: 'Опубликовано',
	type: 'checkbox',
	defaultValue: false,
	admin: {position: 'sidebar'},
}
