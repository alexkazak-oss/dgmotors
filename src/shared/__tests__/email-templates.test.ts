import {describe, expect, it} from 'vitest'
import {
	getLeadEmailSubject,
	renderLeadEmailHtml,
} from '../../payload/email/templates'

describe('getLeadEmailSubject', () => {
	it('returns car-specific subject when carTitle is present', () => {
		const subject = getLeadEmailSubject({
			type: 'car_inquiry',
			name: 'Ivan',
			phone: '123',
			carTitle: 'BYD Han EV',
		})
		expect(subject).toBe('Новая заявка по авто: BYD Han EV')
	})

	it('returns generic subject when no car', () => {
		const subject = getLeadEmailSubject({
			type: 'callback',
			name: 'Ivan',
			phone: '123',
		})
		expect(subject).toBe('Новая заявка с сайта')
	})
})

describe('renderLeadEmailHtml', () => {
	it('renders valid HTML', () => {
		const html = renderLeadEmailHtml({
			type: 'contact',
			name: 'Ivan',
			phone: '+79991234567',
			email: 'ivan@test.com',
			comment: 'Hello',
		})
		expect(html).toContain('<!DOCTYPE html>')
		expect(html).toContain('Ivan')
		expect(html).toContain('+79991234567')
		expect(html).toContain('ivan@test.com')
		expect(html).toContain('Hello')
	})

	it('includes car details when provided', () => {
		const html = renderLeadEmailHtml({
			type: 'car_inquiry',
			name: 'Test',
			phone: '123',
			carTitle: 'BYD Han EV',
			vin: 'ABC123',
			brandName: 'BYD',
		})
		expect(html).toContain('BYD Han EV')
		expect(html).toContain('ABC123')
		expect(html).toContain('BYD')
	})

	it('escapes HTML in user input', () => {
		const html = renderLeadEmailHtml({
			type: 'contact',
			name: '<script>alert("xss")</script>',
			phone: '123',
		})
		expect(html).not.toContain('<script>')
		expect(html).toContain('&lt;script&gt;')
	})
})
