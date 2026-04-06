import { ContactForm } from '@/src/features/leads'
import { Breadcrumbs, Container, Section } from '@/src/shared/ui'
import { Calculator, FileCheck, Percent } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Финансирование',
	description: 'Кредит и лизинг на автомобили в DG Motors. Выгодные условия, быстрое одобрение, партнёрские программы.',
}

export default function FinancingPage() {
	return (
		<>
			<Breadcrumbs items={[{ label: 'Финансирование' }]} />
			<Section dark>
				<Container>
					<div className="max-w-3xl">
						<h1 className="text-3xl font-bold text-white md:text-4xl">Финансирование покупки</h1>
						<p className="mt-4 text-lg text-neutral-400">
							Мы предлагаем несколько удобных способов покупки автомобиля. Выберите подходящий вариант.
						</p>
					</div>

					<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
							<Calculator className="mb-4 h-10 w-10 text-amber-500" />
							<h3 className="text-xl font-bold text-white">Автокредит</h3>
							<ul className="mt-4 space-y-2 text-sm text-neutral-400">
								<li>• Ставка от 4.9% годовых</li>
								<li>• Одобрение за 30 минут</li>
								<li>• Первоначальный взнос от 0%</li>
								<li>• Срок до 7 лет</li>
								<li>• Партнёрские программы</li>
							</ul>
						</div>
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
							<Percent className="mb-4 h-10 w-10 text-amber-500" />
							<h3 className="text-xl font-bold text-white">Лизинг</h3>
							<ul className="mt-4 space-y-2 text-sm text-neutral-400">
								<li>• Для физических и юридических лиц</li>
								<li>• Минимальный аванс</li>
								<li>• Гибкий график платежей</li>
								<li>• Включено ТО и страхование</li>
								<li>• Налоговые преимущества</li>
							</ul>
						</div>
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
							<FileCheck className="mb-4 h-10 w-10 text-amber-500" />
							<h3 className="text-xl font-bold text-white">Trade-in</h3>
							<ul className="mt-4 space-y-2 text-sm text-neutral-400">
								<li>• Бесплатная оценка за 15 минут</li>
								<li>• Выкуп по рыночной цене</li>
								<li>• Зачёт в стоимость нового авто</li>
								<li>• Оформление за 1 день</li>
								<li>• Любые марки и модели</li>
							</ul>
						</div>
					</div>

					{/* Form */}
					<div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
						<div>
							<h2 className="text-2xl font-bold text-white">Получить консультацию</h2>
							<p className="mt-3 text-neutral-400">
								Оставьте заявку, и наш финансовый консультант свяжется с вами для подбора оптимальных условий.
							</p>
						</div>
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
							<ContactForm type="credit" />
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
