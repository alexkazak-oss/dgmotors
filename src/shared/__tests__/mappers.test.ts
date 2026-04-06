import {describe, expect, it} from 'vitest'
import {
	toBrandSummary,
	toCarCard,
	toCarDetail,
	toCarSitemapEntry,
	toSlugDocument,
} from '../lib/mappers'

const mockMedia = {url: '/img.jpg', alt: 'Test image', filename: 'img.jpg'}

describe('toBrandSummary', () => {
	it('maps a brand doc to BrandSummary', () => {
		const doc = {
			slug: 'byd',
			title: 'BYD',
			logo: mockMedia,
			country: 'China',
		}
		const result = toBrandSummary(doc)
		expect(result).toEqual({
			slug: 'byd',
			title: 'BYD',
			logo: {url: '/img.jpg', alt: 'Test image'},
			country: 'China',
		})
	})

	it('handles missing logo and country', () => {
		const result = toBrandSummary({slug: 'x', title: 'X'})
		expect(result.logo).toBeNull()
		expect(result.country).toBeNull()
	})
})

describe('toCarCard', () => {
	const baseCar = {
		id: '1',
		title: 'BYD Han',
		slug: 'byd-han',
		price: 30000,
		oldPrice: 35000,
		status: 'in_stock',
		mainImage: mockMedia,
		brand: {slug: 'byd', title: 'BYD'},
		model: {slug: 'han', title: 'Han'},
		specifications: {year: 2024, power: 200},
		tags: ['new'],
		isFeatured: true,
	}

	it('maps a car doc to CarCard', () => {
		const result = toCarCard(baseCar)
		expect(result.id).toBe('1')
		expect(result.brand.slug).toBe('byd')
		expect(result.mainImage?.url).toBe('/img.jpg')
		expect(result.tags).toEqual(['new'])
	})

	it('applies overrides for brand/model fallback', () => {
		const doc = {...baseCar, brand: 'brand-id', model: 'model-id'}
		const result = toCarCard(doc, {
			brandSlug: 'fallback-brand',
			brandTitle: 'Fallback Brand',
		})
		expect(result.brand.slug).toBe('fallback-brand')
		expect(result.brand.title).toBe('Fallback Brand')
	})

	it('handles null mainImage', () => {
		const doc = {...baseCar, mainImage: null}
		const result = toCarCard(doc)
		expect(result.mainImage).toBeNull()
	})
})

describe('toCarDetail', () => {
	it('maps gallery items', () => {
		const doc = {
			id: '1',
			title: 'Test',
			slug: 'test',
			price: 100,
			status: 'in_stock',
			brand: {slug: 'b', title: 'B'},
			model: {slug: 'm', title: 'M'},
			gallery: [{image: mockMedia}, {image: null}],
		}
		const result = toCarDetail(doc)
		expect(result.gallery).toHaveLength(1)
		expect(result.gallery[0].url).toBe('/img.jpg')
	})

	it('extracts location when populated', () => {
		const doc = {
			id: '1',
			title: 'Test',
			slug: 'test',
			price: 100,
			status: 'in_stock',
			brand: {slug: 'b', title: 'B'},
			model: {slug: 'm', title: 'M'},
			location: {title: 'Moscow', address: 'Red Square 1'},
		}
		const result = toCarDetail(doc)
		expect(result.location?.title).toBe('Moscow')
	})
})

describe('toSlugDocument', () => {
	it('extracts slug and updatedAt', () => {
		const result = toSlugDocument({
			slug: 'byd',
			updatedAt: '2024-01-01',
			title: 'extra',
		})
		expect(result).toEqual({slug: 'byd', updatedAt: '2024-01-01'})
	})
})

describe('toCarSitemapEntry', () => {
	it('resolves nested brand/model slugs', () => {
		const result = toCarSitemapEntry({
			slug: 'han-ev',
			brand: {slug: 'byd'},
			model: {slug: 'han'},
		})
		expect(result.brand?.slug).toBe('byd')
		expect(result.model?.slug).toBe('han')
	})

	it('returns null for unresolved relationships', () => {
		const result = toCarSitemapEntry({
			slug: 'test',
			brand: 'some-id',
			model: 'some-id',
		})
		expect(result.brand).toBeNull()
		expect(result.model).toBeNull()
	})
})
