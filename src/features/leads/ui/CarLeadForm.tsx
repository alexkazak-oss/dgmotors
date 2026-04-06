'use client'

import { Button, Input, Textarea } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Car, CheckCircle, Loader2, Send } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { submitLead, type LeadActionResult } from '../actions/submitLead'
import { leadSchema, type LeadFormData } from '../schema/lead'

interface CarContext {
	carId: string
	brandId?: string
	modelId?: string
	carTitle: string
	carUrl: string
	vin?: string
	stockNumber?: string
}

interface CarLeadFormProps {
	car: CarContext
	type?: LeadFormData['type']
	sourceUrl?: string
	className?: string
}

export function CarLeadForm({ car, type = 'car_inquiry', sourceUrl, className }: CarLeadFormProps) {
	const [isPending, startTransition] = useTransition()
	const [result, setResult] = useState<LeadActionResult | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LeadFormData>({
		resolver: zodResolver(leadSchema),
		defaultValues: {
			type,
			sourceUrl,
			carId: car.carId,
			brandId: car.brandId,
			modelId: car.modelId,
			carTitleSnapshot: car.carTitle,
			carUrlSnapshot: car.carUrl,
			vinSnapshot: car.vin,
			stockNumberSnapshot: car.stockNumber,
		},
	})

	const onSubmit = (data: LeadFormData) => {
		startTransition(async () => {
			const res = await submitLead(data)
			setResult(res)
			if (res.success) reset()
		})
	}

	if (result?.success) {
		return (
			<div className={className}>
				<div className="flex flex-col items-center gap-4 py-8 text-center">
					<CheckCircle className="h-12 w-12 text-emerald-400" />
					<p className="text-lg font-medium text-white">{result.message}</p>
					<Button variant="outline" size="sm" onClick={() => setResult(null)}>
						Отправить ещё
					</Button>
				</div>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={className}>
			<input type="hidden" {...register('type')} />
			<input type="hidden" {...register('sourceUrl')} />
			<input type="hidden" {...register('carId')} />
			<input type="hidden" {...register('brandId')} />
			<input type="hidden" {...register('modelId')} />
			<input type="hidden" {...register('carTitleSnapshot')} />
			<input type="hidden" {...register('carUrlSnapshot')} />
			<input type="hidden" {...register('vinSnapshot')} />
			<input type="hidden" {...register('stockNumberSnapshot')} />

			{/* Car info badge */}
			<div className="mb-5 flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
				<Car className="h-5 w-5 text-amber-500 shrink-0" />
				<span className="text-sm font-medium text-amber-300">{car.carTitle}</span>
			</div>

			<div className="space-y-4">
				<Input
					{...register('name')}
					label="Ваше имя"
					placeholder="Иван Иванов"
					error={errors.name?.message}
					id="car-lead-name"
				/>
				<Input
					{...register('phone')}
					label="Телефон"
					placeholder="+7 (999) 123-45-67"
					type="tel"
					error={errors.phone?.message}
					id="car-lead-phone"
				/>
				<Input
					{...register('email')}
					label="Email"
					placeholder="email@example.com"
					type="email"
					error={errors.email?.message}
					id="car-lead-email"
				/>
				<Textarea
					{...register('comment')}
					label="Сообщение"
					placeholder="Хочу узнать подробнее об этом автомобиле..."
					id="car-lead-comment"
				/>
			</div>

			{result && !result.success && (
				<p className="mt-3 text-sm text-red-400">{result.message}</p>
			)}

			<Button type="submit" className="mt-6 w-full" size="lg" disabled={isPending}>
				{isPending ? (
					<Loader2 className="h-5 w-5 animate-spin" />
				) : (
					<>
						<Send className="h-4 w-4" />
						Узнать об авто
					</>
				)}
			</Button>
		</form>
	)
}
