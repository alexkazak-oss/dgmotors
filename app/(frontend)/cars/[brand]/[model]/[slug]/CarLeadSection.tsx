'use client'

import { CarLeadForm } from '@/src/features/leads'

interface CarLeadSectionProps {
	carId: string
	brandId?: string
	modelId?: string
	carTitle: string
	carUrl: string
	vin?: string
	stockNumber?: string
}

export function CarLeadSection(props: CarLeadSectionProps) {
	return (
		<CarLeadForm
			car={{
				carId: props.carId,
				brandId: props.brandId,
				modelId: props.modelId,
				carTitle: props.carTitle,
				carUrl: props.carUrl,
				vin: props.vin,
				stockNumber: props.stockNumber,
			}}
		/>
	)
}
