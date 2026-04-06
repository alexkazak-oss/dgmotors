import { ContactForm } from '@/src/features/leads'
import { Breadcrumbs, Container, Section } from '@/src/shared/ui'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Контакты',
	description: 'Свяжитесь с DG Motors. Адрес, телефон, график работы и форма обратной связи.',
}

export default function ContactsPage() {
	return (
		<>
			<Breadcrumbs items={[{ label: 'Контакты' }]} />
			<Section dark>
				<Container>
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
						{/* Info */}
						<div>
							<h1 className="text-3xl font-bold text-white md:text-4xl">Контакты</h1>
							<p className="mt-4 text-lg text-neutral-400">
								Мы всегда рады помочь вам с выбором автомобиля. Свяжитесь с нами любым удобным способом.
							</p>

							<div className="mt-8 space-y-6">
								<div className="flex items-start gap-4">
									<div className="rounded-lg bg-amber-500/10 p-3">
										<MapPin className="h-5 w-5 text-amber-500" />
									</div>
									<div>
										<h3 className="font-semibold text-white">Адрес</h3>
										<p className="mt-1 text-neutral-400">г. Минск, ул. Примерная, д. 1</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="rounded-lg bg-amber-500/10 p-3">
										<Phone className="h-5 w-5 text-amber-500" />
									</div>
									<div>
										<h3 className="font-semibold text-white">Телефон</h3>
										<a href="tel:+373331234567" className="mt-1 text-neutral-400 hover:text-white transition-colors">
											+37 (33) 123-45-67
										</a>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="rounded-lg bg-amber-500/10 p-3">
										<Mail className="h-5 w-5 text-amber-500" />
									</div>
									<div>
										<h3 className="font-semibold text-white">Email</h3>
										<a href="mailto:info@dgmotors.com" className="mt-1 text-neutral-400 hover:text-white transition-colors">
											info@dgmotors.com
										</a>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="rounded-lg bg-amber-500/10 p-3">
										<Clock className="h-5 w-5 text-amber-500" />
									</div>
									<div>
										<h3 className="font-semibold text-white">Время работы</h3>
										<p className="mt-1 text-neutral-400">Пн–Вс: 09:00 — 20:00</p>
									</div>
								</div>
							</div>
						</div>

						{/* Form */}
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
							<h2 className="mb-6 text-xl font-semibold text-white">Напишите нам</h2>
							<ContactForm type="contact" />
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
