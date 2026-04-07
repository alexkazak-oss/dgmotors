import type {Field, FieldHook, PayloadRequest} from 'payload'

// ---------------------------------------------------------------------------
// Slug field factory
// ---------------------------------------------------------------------------

interface SlugSource {
	/** Field path in `data` (supports nested: 'specifications.year') */
	field: string
	/** If this field is a relationship, resolve it and pick this sub-field */
	relationField?: string
	/** Collection slug for relationship resolution */
	relationTo?: string
}

type SlugConfig = {
	/** Fields to compose the slug from, in order */
	sources: SlugSource[]
}

/** Resolve a potentially nested field value from data object */
function getNestedValue(data: Record<string, unknown>, path: string): unknown {
	return path.split('.').reduce<unknown>((obj, key) => {
		if (obj && typeof obj === 'object' && key in obj) {
			return (obj as Record<string, unknown>)[key]
		}
		return undefined
	}, data)
}

/** Resolve relationship ID → document title */
async function resolveRelation(
	req: PayloadRequest,
	collection: string,
	id: string | number,
	field: string,
): Promise<string> {
	try {
		const doc = await req.payload.findByID({collection, id, depth: 0})
		const val = doc?.[field]
		return typeof val === 'string' ? val : ''
	} catch {
		return ''
	}
}

function createSlugHook(sources: SlugSource[]): FieldHook {
	return async ({data, req}) => {
		if (!data) return undefined

		const parts: string[] = []

		for (const src of sources) {
			const raw = getNestedValue(data, src.field)

			if (src.relationTo && src.relationField && raw) {
				// relationship — resolve to get the human-readable value
				const id =
					typeof raw === 'object' && raw !== null && 'id' in raw
						? (raw as {id: string | number}).id
						: raw
				const resolved = await resolveRelation(
					req,
					src.relationTo,
					id as string | number,
					src.relationField,
				)
				if (resolved) parts.push(resolved)
			} else if (raw != null && raw !== '') {
				parts.push(String(raw))
			}
		}

		if (parts.length === 0) return undefined
		return slugify(parts.join(' '))
	}
}

/**
 * Create a slug field that auto-generates from specified source fields.
 *
 * @example
 * // Brands / Models — slug from title only
 * createSlugField()
 *
 * // Cars — slug from brand + model + title + year
 * createSlugField({
 *   sources: [
 *     { field: 'brand', relationTo: 'brands', relationField: 'title' },
 *     { field: 'model', relationTo: 'models', relationField: 'title' },
 *     { field: 'specifications.year' },
 *   ],
 * })
 */
export function createSlugField(config?: SlugConfig): Field {
	const sources: SlugSource[] = config?.sources ?? [{field: 'title'}]

	return {
		name: 'slug',
		label: 'Слаг (URL)',
		type: 'text',
		required: true,
		unique: true,
		admin: {
			position: 'sidebar',
			readOnly: true,
			description: 'Генерируется автоматически.',
		},
		hooks: {
			beforeValidate: [createSlugHook(sources)],
		},
	}
}

/** Simple default for backward compatibility */
export const slugField: Field = createSlugField()

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

/** For reference collections (brands, models) — published by default */
export const autoPublishedField: Field = {
	name: 'isPublished',
	label: 'Опубликовано',
	type: 'checkbox',
	defaultValue: true,
	admin: {position: 'sidebar'},
}
