import { Container, Section, SectionHeader } from '@/src/shared/ui'
import { Award, Clock, CreditCard, Headphones, Shield, Truck } from 'lucide-react'

const advantages = [
	{
		icon: Shield,
		title: 'Гарантия качества',
		description: 'Каждый автомобиль проходит многоуровневую проверку перед продажей.',
	},
	{
		icon: Truck,
		title: 'Доставка по стране',
		description: 'Организуем доставку вашего автомобиля в любой город.',
	},
	{
		icon: Award,
		title: 'Сертифицированный дилер',
		description: 'Официальный представитель ведущих мировых брендов.',
	},
	{
		icon: CreditCard,
		title: 'Кредит и лизинг',
		description: 'Выгодные условия финансирования от банков-партнёров.',
	},
	{
		icon: Clock,
		title: 'Быстрое оформление',
		description: 'Полное оформление сделки за один визит в салон.',
	},
	{
		icon: Headphones,
		title: 'Поддержка 24/7',
		description: 'Наши менеджеры всегда на связи и готовы помочь.',
	},
]

export function AdvantagesSection() {
	return (
		<Section dark>
			<Container>
				<SectionHeader
					title="Почему выбирают нас"
					subtitle="Мы делаем покупку автомобиля простой и безопасной"
				/>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{advantages.map((item) => (
						<div
							key={item.title}
							className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-neutral-800/50"
						>
							<div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3">
								<item.icon className="h-6 w-6 text-amber-500" />
							</div>
							<h3 className="text-lg font-semibold text-white">{item.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.description}</p>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}
