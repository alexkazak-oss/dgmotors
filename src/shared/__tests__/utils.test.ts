import {describe, expect, it} from 'vitest'
import {cn, formatPhone, formatPrice, getSiteUrl} from '../lib/utils'

describe('cn', () => {
	it('merges tailwind classes', () => {
		expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
	})

	it('resolves conflicting classes', () => {
		expect(cn('px-4', 'px-2')).toBe('px-2')
	})

	it('handles conditional classes', () => {
		expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
	})
})

describe('formatPrice', () => {
	it('formats price in USD with no decimals', () => {
		const result = formatPrice(25000)
		// Contains the number 25 and 000 (with possible non-breaking space/comma separators)
		expect(result).toContain('25')
		expect(result).toContain('000')
	})

	it('formats zero', () => {
		const result = formatPrice(0)
		expect(result).toContain('0')
	})
})

describe('formatPhone', () => {
	it('strips non-digit/plus characters', () => {
		expect(formatPhone('+7 (999) 123-45-67')).toBe('+79991234567')
	})

	it('keeps plus sign', () => {
		expect(formatPhone('+380123456789')).toBe('+380123456789')
	})
})

describe('getSiteUrl', () => {
	it('returns NEXT_PUBLIC_SITE_URL when set', () => {
		const original = process.env.NEXT_PUBLIC_SITE_URL
		process.env.NEXT_PUBLIC_SITE_URL = 'https://dgmotors.com'
		expect(getSiteUrl()).toBe('https://dgmotors.com')
		process.env.NEXT_PUBLIC_SITE_URL = original
	})

	it('falls back to localhost', () => {
		const original = process.env.NEXT_PUBLIC_SITE_URL
		delete process.env.NEXT_PUBLIC_SITE_URL
		expect(getSiteUrl()).toBe('http://localhost:3000')
		process.env.NEXT_PUBLIC_SITE_URL = original
	})
})
