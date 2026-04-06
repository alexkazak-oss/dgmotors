'use client'

import { Modal } from '@/src/shared/ui'
import { useState } from 'react'
import type { LeadFormData } from '../schema/lead'
import { CarLeadForm } from './CarLeadForm'
import { ContactForm } from './ContactForm'

interface CarContext {
	carId: string
	brandId?: string
	modelId?: string
	carTitle: string
	carUrl: string
	vin?: string
	stockNumber?: string
}

interface ModalLeadFormProps {
	trigger: React.ReactNode
	title?: string
	car?: CarContext
	type?: LeadFormData['type']
	sourceUrl?: string
}

export function ModalLeadForm({ trigger, title, car, type, sourceUrl }: ModalLeadFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const modalTitle = title || (car ? `Заявка на ${car.carTitle}` : 'Оставить заявку')

	return (
		<>
			<span onClick={() => setIsOpen(true)} className="cursor-pointer">
				{trigger}
			</span>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={modalTitle}>
				{car ? (
					<CarLeadForm car={car} type={type || 'car_inquiry'} sourceUrl={sourceUrl} />
				) : (
					<ContactForm type={type || 'callback'} sourceUrl={sourceUrl} />
				)}
			</Modal>
		</>
	)
}
