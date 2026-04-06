import type {CollectionAfterChangeHook} from 'payload'
import {getLeadEmailSubject, renderLeadEmailHtml, sendEmail} from '../email'

export const sendLeadNotification: CollectionAfterChangeHook = async ({
	doc,
	operation,
	req,
}) => {
	if (operation !== 'create') return doc

	try {
		const adminEmail =
			process.env.ADMIN_EMAIL ||
			(await req.payload
				.findGlobal({slug: 'settings'})
				.then((s) => s.adminEmail)) ||
			''

		if (!adminEmail) {
			console.warn('[Lead] No admin email configured')
			return doc
		}

		// Resolve car details if relationship exists
		let carTitle = doc.carTitleSnapshot
		let brandName = ''
		let modelName = ''

		if (doc.car && typeof doc.car === 'object') {
			carTitle = carTitle || doc.car.title
		}
		if (doc.brand && typeof doc.brand === 'object') {
			brandName = doc.brand.title
		}
		if (doc.model && typeof doc.model === 'object') {
			modelName = doc.model.title
		}

		const subject = getLeadEmailSubject({
			type: doc.type,
			name: doc.name,
			phone: doc.phone,
			carTitle,
		})

		const html = renderLeadEmailHtml({
			type: doc.type,
			name: doc.name,
			phone: doc.phone,
			email: doc.email,
			comment: doc.comment,
			sourceUrl: doc.sourceUrl,
			carTitle,
			carUrl: doc.carUrlSnapshot,
			brandName,
			modelName,
			vin: doc.vinSnapshot,
			stockNumber: doc.stockNumberSnapshot,
		})

		await sendEmail({to: adminEmail, subject, html})
	} catch (error) {
		console.error('[Lead] Failed to send notification email:', error)
	}

	return doc
}
