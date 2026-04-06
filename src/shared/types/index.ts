/**
 * Frontend domain types.
 *
 * These represent the *resolved* shapes we pass to React components after
 * mapping Payload documents.  They are intentionally decoupled from the
 * Payload-generated types so that the UI layer never depends on CMS
 * internals directly.
 */

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------
export interface MediaImage {
	url: string
	alt: string
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export interface BrandSummary {
	slug: string
	title: string
	logo: MediaImage | null
	country: string | null
}

export interface BrandDetail extends BrandSummary {
	shortDescription: string | null
	seo?: SeoMeta | null
}

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
export interface ModelSummary {
	slug: string
	title: string
}

export interface ModelDetail extends ModelSummary {
	shortDescription: string | null
	seo?: SeoMeta | null
}

// ---------------------------------------------------------------------------
// Car — Specifications
// ---------------------------------------------------------------------------
export interface CarSpecifications {
	year?: number | null
	mileage?: number | null
	engineType?: string | null
	power?: number | null
	battery?: string | null
	range?: number | null
	drivetrain?: string | null
	transmission?: string | null
	color?: string | null
	interiorColor?: string | null
}

// ---------------------------------------------------------------------------
// Car — Card (list pages)
// ---------------------------------------------------------------------------
export interface CarCard {
	id: string
	title: string
	slug: string
	price: number
	oldPrice?: number | null
	status: string
	mainImage: MediaImage | null
	brand: {slug: string; title: string}
	model: {slug: string; title: string}
	specifications: CarSpecifications | null
	tags: string[] | null
	isFeatured?: boolean
}

// ---------------------------------------------------------------------------
// Car — Detail (single page)
// ---------------------------------------------------------------------------
export interface CarDetail extends CarCard {
	vin?: string | null
	stockNumber?: string | null
	shortDescription?: string | null
	gallery: MediaImage[]
	location?: {
		title: string
		address: string
	} | null
	seo?: SeoMeta | null
}

// ---------------------------------------------------------------------------
// Location
// ---------------------------------------------------------------------------
export interface LocationInfo {
	title: string
	address: string
	city?: string | null
	phone?: string | null
	email?: string | null
	workingHours?: string | null
	mapCoordinates?: {lat?: number; lng?: number} | null
}

// ---------------------------------------------------------------------------
// Lead
// ---------------------------------------------------------------------------
export type LeadType =
	| 'callback'
	| 'contact'
	| 'car_inquiry'
	| 'credit'
	| 'leasing'
export type LeadStatus = 'new' | 'processing' | 'completed' | 'rejected'

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export interface SeoMeta {
	title?: string | null
	description?: string | null
	image?: MediaImage | null
}

// ---------------------------------------------------------------------------
// Sitemap helpers
// ---------------------------------------------------------------------------
export interface SlugDocument {
	slug: string
	updatedAt?: string
}

export interface CarSitemapEntry extends SlugDocument {
	brand?: {slug: string} | null
	model?: {slug: string} | null
}
