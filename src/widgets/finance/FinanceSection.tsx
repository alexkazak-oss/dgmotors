import { Container, LinkButton, Section, SectionHeader } from '@/src/shared/ui'
import { ArrowRight, Calculator, FileCheck, Percent } from 'lucide-react'

const options = [
	{
		icon: Calculator,
		title: 'Кредит',
		description: 'Одобрение за 30 минут. Ставка от 4.9% годовых. Партнёрские программы с ведущими банками.',
		cta: 'Рассчитать кредит',
		href: '/financing',
	},
	{
		icon: Percent,
		title: 'Лизинг',
		description: 'Для юридических и физических лиц. Минимальный аванс. Гибкие условия погашения.',
		cta: 'Условия лизинга',
		href: '/financing',
	},
	{
		icon: FileCheck,
		title: 'Trade-in',
		description: 'Обменяйте ваш старый автомобиль на новый. Бесплатная оценка за 15 минут.',
		cta: 'Оценить авто',
		href: '/contacts',
	},
]

export function FinanceSection() {
	return (
		<Section className="bg-neutral-950">
			<Container>
				<SectionHeader
					title="Финансирование"
					subtitle="Удобные способы покупки вашего нового автомобиля"
				/>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{options.map((item) => (
						<div
							key={item.title}
							className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900 p-8 transition-all duration-300 hover:border-amber-500/30"
						>
							<div className="mb-5 inline-flex rounded-xl bg-amber-500/10 p-3 self-start">
								<item.icon className="h-7 w-7 text-amber-500" />
							</div>
							<h3 className="text-xl font-bold text-white">{item.title}</h3>
							<p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
								{item.description}
							</p>
							<LinkButton href={item.href} variant="outline" size="sm" className="mt-6 self-start">
								{item.cta}
								<ArrowRight className="h-4 w-4" />
							</LinkButton>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}
