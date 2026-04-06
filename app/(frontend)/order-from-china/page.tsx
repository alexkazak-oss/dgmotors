import { ContactForm } from '@/src/features/leads'
import { Breadcrumbs, Container, Section, SectionHeader } from '@/src/shared/ui'
import { CheckCircle, FileCheck, Shield, Ship } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Заказ авто из Китая',
	description: 'Заказ новых автомобилей из Китая под ключ. BYD, Changan, Zeekr, Chery, Haval и другие бренды с доставкой и гарантией.',
}

const steps = [
	{ icon: CheckCircle, title: 'Выбор авто', description: 'Подберём модель и комплектацию под ваши требования.' },
	{ icon: FileCheck, title: 'Договор и оплата', description: 'Заключаем договор с фиксированной ценой и сроками.' },
	{ icon: Ship, title: 'Доставка', description: 'Автомобиль доставляется из Китая в течение 4–8 недель.' },
	{ icon: Shield, title: 'Получение', description: 'Полная проверка, оформление документов и передача вам.' },
]

export default function OrderFromChinaPage() {
	return (
		<>
			<Breadcrumbs items={[{ label: 'Заказ из Китая' }]} />
			<Section dark>
				<Container>
					<div className="max-w-3xl">
						<h1 className="text-3xl font-bold text-white md:text-4xl">Заказ автомобиля из Китая</h1>
						<p className="mt-4 text-lg text-neutral-400">
							Мы организуем доставку новых автомобилей напрямую из Китая. Полное сопровождение —
							от выбора до получения ключей.
						</p>
					</div>

					{/* Steps */}
					<div className="mt-16">
						<SectionHeader title="Как это работает" align="left" />
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{steps.map((step, i) => (
								<div key={step.title} className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
									<div className="absolute -top-3 -left-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
										{i + 1}
									</div>
									<step.icon className="mb-4 h-8 w-8 text-amber-500" />
									<h3 className="text-lg font-semibold text-white">{step.title}</h3>
									<p className="mt-2 text-sm text-neutral-400">{step.description}</p>
								</div>
							))}
						</div>
					</div>

					{/* Form */}
					<div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
						<div>
							<h2 className="text-2xl font-bold text-white">Заказать автомобиль</h2>
							<p className="mt-3 text-neutral-400">
								Расскажите, какой автомобиль вас интересует, и мы подберём лучшие варианты с расчётом стоимости доставки.
							</p>
						</div>
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
							<ContactForm type="contact" />
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
