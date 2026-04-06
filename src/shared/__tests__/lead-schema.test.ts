import {describe, expect, it} from 'vitest'
import {leadSchema} from '../../features/leads/schema/lead'

describe('leadSchema', () => {
	const validLead = {
		type: 'callback' as const,
		name: 'Ivan',
		phone: '+79991234567',
	}

	it('validates a minimal valid lead', () => {
		const result = leadSchema.safeParse(validLead)
		expect(result.success).toBe(true)
	})

	it('validates with all optional fields', () => {
		const result = leadSchema.safeParse({
			...validLead,
			email: 'test@example.com',
			comment: 'Test comment',
			sourceUrl: '/cars/byd/han/test',
			utmSource: 'google',
			carId: 'car-123',
			brandId: 'brand-123',
			carTitleSnapshot: 'BYD Han EV',
		})
		expect(result.success).toBe(true)
	})

	it('rejects missing name', () => {
		const result = leadSchema.safeParse({type: 'callback', phone: '123'})
		expect(result.success).toBe(false)
	})

	it('rejects short name', () => {
		const result = leadSchema.safeParse({...validLead, name: 'A'})
		expect(result.success).toBe(false)
	})

	it('rejects invalid type', () => {
		const result = leadSchema.safeParse({...validLead, type: 'invalid'})
		expect(result.success).toBe(false)
	})

	it('allows empty email string', () => {
		const result = leadSchema.safeParse({...validLead, email: ''})
		expect(result.success).toBe(true)
	})

	it('rejects invalid email', () => {
		const result = leadSchema.safeParse({...validLead, email: 'notanemail'})
		expect(result.success).toBe(false)
	})
})
