/**
 * Map raw Payload documents (depth ≥ 2) into typed frontend DTOs.
 *
 * All `any` from Payload responses is confined here. When real generated
 * Payload types exist, swap `PayloadDoc` for the concrete type.
 */
import type {
	BrandDetail,
	BrandSummary,
	CarCard,
	CarDetail,
	CarSitemapEntry,
	MediaImage,
	SlugDocument,
} from '@/src/shared/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Payload document before type generation
type PayloadDoc = Record<string, any>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toMediaImage(media: unknown): MediaImage | null {
	if (
		media &&
		typeof media === 'object' &&
		'url' in media &&
		typeof (media as PayloadDoc).url === 'string'
	) {
		const m = media as PayloadDoc
		return {url: m.url, alt: (m.alt as string) ?? ''}
	}
	return null
}

function resolveRelation<T extends {slug: string; title: string}>(
	rel: unknown,
	fallbackSlug = '',
	fallbackTitle = '',
): T {
	if (rel && typeof rel === 'object' && 'slug' in rel) {
		const r = rel as PayloadDoc
		return {slug: r.slug ?? fallbackSlug, title: r.title ?? fallbackTitle} as T
	}
	return {slug: fallbackSlug, title: fallbackTitle} as T
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export function toBrandSummary(doc: PayloadDoc): BrandSummary {
	return {
		slug: doc.slug,
		title: doc.title,
		logo: toMediaImage(doc.logo),
		country: doc.country ?? null,
	}
}

export function toBrandDetail(doc: PayloadDoc): BrandDetail {
	return {
		...toBrandSummary(doc),
		shortDescription: doc.shortDescription ?? null,
		seo: doc.seo ?? null,
	}
}

// ---------------------------------------------------------------------------
// Car
// ---------------------------------------------------------------------------
export function toCarCard(
	doc: PayloadDoc,
	overrides?: {
		brandSlug?: string
		brandTitle?: string
		modelSlug?: string
		modelTitle?: string
	},
): CarCard {
	return {
		id: doc.id,
		title: doc.title,
		slug: doc.slug,
		price: doc.price,
		oldPrice: doc.oldPrice ?? null,
		status: doc.status,
		mainImage: toMediaImage(doc.mainImage),
		brand: resolveRelation(
			doc.brand,
			overrides?.brandSlug,
			overrides?.brandTitle,
		),
		model: resolveRelation(
			doc.model,
			overrides?.modelSlug,
			overrides?.modelTitle,
		),
		specifications: doc.specifications ?? null,
		tags: doc.tags ?? null,
		isFeatured: doc.isFeatured ?? false,
	}
}

export function toCarDetail(doc: PayloadDoc): CarDetail {
	const gallery: MediaImage[] = Array.isArray(doc.gallery)
		? (doc.gallery as PayloadDoc[])
				.map((item) => toMediaImage(item.image))
				.filter((img): img is MediaImage => img !== null)
		: []

	const location =
		doc.location && typeof doc.location === 'object'
			? {
					title: doc.location.title as string,
					address: doc.location.address as string,
				}
			: null

	return {
		...toCarCard(doc),
		vin: doc.vin ?? null,
		stockNumber: doc.stockNumber ?? null,
		shortDescription: doc.shortDescription ?? null,
		gallery,
		location,
		seo: doc.seo ?? null,
	}
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------
export function toSlugDocument(doc: PayloadDoc): SlugDocument {
	return {
		slug: doc.slug,
		updatedAt: doc.updatedAt,
	}
}

export function toCarSitemapEntry(doc: PayloadDoc): CarSitemapEntry {
	return {
		slug: doc.slug,
		updatedAt: doc.updatedAt,
		brand:
			doc.brand && typeof doc.brand === 'object'
				? {slug: doc.brand.slug}
				: null,
		model:
			doc.model && typeof doc.model === 'object'
				? {slug: doc.model.slug}
				: null,
	}
}
