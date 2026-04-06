import { Container, Section, SectionHeader } from '@/src/shared/ui'
import { Quote, Star } from 'lucide-react'

const testimonials = [
	{
		name: 'Андрей К.',
		car: 'BYD Han EV',
		text: 'Отличный сервис! Автомобиль получил в идеальном состоянии. Менеджеры помогли с выбором и оформлением. Рекомендую!',
		rating: 5,
	},
	{
		name: 'Елена М.',
		car: 'Changan UNI-V',
		text: 'Очень довольна покупкой. Весь процесс от выбора до получения занял всего 2 недели. Машина — огонь!',
		rating: 5,
	},
	{
		name: 'Дмитрий С.',
		car: 'Zeekr 001',
		text: 'Заказал авто из Китая. Доставили даже быстрее обещанного. Качество автомобиля превзошло все ожидания.',
		rating: 5,
	},
]

export function TestimonialsSection() {
	return (
		<Section className="bg-neutral-950">
			<Container>
				<SectionHeader
					title="Отзывы клиентов"
					subtitle="Что говорят наши довольные покупатели"
				/>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{testimonials.map((item) => (
						<div
							key={item.name}
							className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
						>
							<Quote className="mb-4 h-8 w-8 text-amber-500/30" />
							<p className="text-neutral-300 leading-relaxed">{item.text}</p>
							<div className="mt-4 flex items-center gap-1">
								{Array.from({ length: item.rating }).map((_, i) => (
									<Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
								))}
							</div>
							<div className="mt-4 border-t border-neutral-800 pt-4">
								<p className="font-semibold text-white">{item.name}</p>
								<p className="text-sm text-neutral-500">{item.car}</p>
							</div>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}
