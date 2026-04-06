'use client'

import { Button, Input, Textarea } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { submitLead, type LeadActionResult } from '../actions/submitLead'
import { leadSchema, type LeadFormData } from '../schema/lead'

interface ContactFormProps {
	type?: LeadFormData['type']
	sourceUrl?: string
	utmParams?: {
		utmSource?: string
		utmMedium?: string
		utmCampaign?: string
		utmTerm?: string
		utmContent?: string
	}
	className?: string
}

export function ContactForm({ type = 'contact', sourceUrl, utmParams, className }: ContactFormProps) {
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
			...utmParams,
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

			<div className="space-y-4">
				<Input
					{...register('name')}
					label="Ваше имя"
					placeholder="Иван Иванов"
					error={errors.name?.message}
					id="contact-name"
				/>
				<Input
					{...register('phone')}
					label="Телефон"
					placeholder="+37 (33) 123-45-67"
					type="tel"
					error={errors.phone?.message}
					id="contact-phone"
				/>
				<Input
					{...register('email')}
					label="Email"
					placeholder="email@example.com"
					type="email"
					error={errors.email?.message}
					id="contact-email"
				/>
				<Textarea
					{...register('comment')}
					label="Сообщение"
					placeholder="Ваш вопрос или комментарий..."
					id="contact-comment"
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
						Отправить заявку
					</>
				)}
			</Button>
		</form>
	)
}
