'use server'

import {getPayload} from '@/src/shared/lib/payload'
import {leadSchema, type LeadFormData} from '../schema/lead'

export type LeadActionResult = {
	success: boolean
	message: string
}

export async function submitLead(
	data: LeadFormData,
): Promise<LeadActionResult> {
	const parsed = leadSchema.safeParse(data)

	if (!parsed.success) {
		return {
			success: false,
			message: 'Проверьте правильность заполнения формы',
		}
	}

	try {
		const payload = await getPayload()
		const {carId, brandId, modelId, ...rest} = parsed.data

		await payload.create({
			collection: 'leads',
			data: {
				...rest,
				...(carId ? {car: carId} : {}),
				...(brandId ? {brand: brandId} : {}),
				...(modelId ? {model: modelId} : {}),
			},
		})

		return {
			success: true,
			message: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
		}
	} catch (error) {
		console.error('[Lead Action] Error:', error)
		return {
			success: false,
			message: 'Произошла ошибка. Попробуйте позже.',
		}
	}
}
