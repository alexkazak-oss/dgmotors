import {describe, expect, it} from 'vitest'
import {slugify} from '../../payload/fields'

describe('slugify', () => {
	it('transliterates cyrillic to latin', () => {
		expect(slugify('Привет мир')).toBe('privet-mir')
	})

	it('lowercases and replaces spaces with hyphens', () => {
		expect(slugify('Hello World')).toBe('hello-world')
	})

	it('removes special characters', () => {
		expect(slugify('BYD Han EV (2024)')).toBe('byd-han-ev-2024')
	})

	it('strips leading and trailing hyphens', () => {
		expect(slugify('  Тест  ')).toBe('test')
	})

	it('handles mixed cyrillic and latin', () => {
		expect(slugify('Zeekr 001 Электро')).toBe('zeekr-001-elektro')
	})
})
