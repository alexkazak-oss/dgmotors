import { Breadcrumbs, Container, Section, SectionHeader } from '@/src/shared/ui'
import { Award, Shield, TrendingUp, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'О компании',
	description: 'DG Motors — официальный дилер премиальных автомобилей. Узнайте о нас, нашей команде и ценностях.',
}

const values = [
	{
		icon: Shield,
		title: 'Надёжность',
		description: 'Каждый автомобиль проходит строгий контроль качества.',
	},
	{
		icon: Users,
		title: 'Клиентоориентированность',
		description: 'Индивидуальный подход к каждому покупателю.',
	},
	{
		icon: Award,
		title: 'Экспертиза',
		description: 'Более 5 лет опыта на автомобильном рынке.',
	},
	{
		icon: TrendingUp,
		title: 'Развитие',
		description: 'Мы постоянно расширяем ассортимент и улучшаем сервис.',
	},
]

export default function AboutPage() {
	return (
		<>
			<Breadcrumbs items={[{ label: 'О компании' }]} />
			<Section dark>
				<Container>
					<div className="max-w-3xl">
						<h1 className="text-3xl font-bold text-white md:text-4xl">О компании DG Motors</h1>
						<div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-400">
							<p>
								DG Motors — это современный дилерский центр, специализирующийся на продаже
								новых автомобилей из Китая и Европы. Мы работаем с 2020 года и за это время
								помогли тысячам клиентов найти автомобиль мечты.
							</p>
							<p>
								Наша миссия — сделать покупку автомобиля простой, прозрачной и приятной.
								Мы предлагаем полный спектр услуг: от подбора и заказа автомобиля до оформления
								кредита и доставки.
							</p>
						</div>
					</div>
				</Container>
			</Section>

			<Section className="bg-neutral-950">
				<Container>
					<SectionHeader title="Наши ценности" />
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{values.map((item) => (
							<div key={item.title} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
								<div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3">
									<item.icon className="h-6 w-6 text-amber-500" />
								</div>
								<h3 className="text-lg font-semibold text-white">{item.title}</h3>
								<p className="mt-2 text-sm text-neutral-400">{item.description}</p>
							</div>
						))}
					</div>
				</Container>
			</Section>
		</>
	)
}
