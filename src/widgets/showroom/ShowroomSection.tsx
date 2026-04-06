import { Container, LinkButton, Section, SectionHeader } from '@/src/shared/ui'
import { Clock, MapPin, Phone } from 'lucide-react'

export function ShowroomSection() {
	return (
		<Section dark>
			<Container>
				<SectionHeader
					title="Наш шоурум"
					subtitle="Приезжайте, чтобы увидеть автомобили вживую"
				/>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Map placeholder */}
					<div className="aspect-video overflow-hidden rounded-2xl bg-neutral-800 border border-neutral-700">
						<div className="flex h-full w-full items-center justify-center text-neutral-600">
							<div className="text-center">
								<MapPin className="mx-auto h-12 w-12 mb-3" />
								<p className="text-sm">Карта будет здесь</p>
							</div>
						</div>
					</div>

					{/* Info */}
					<div className="flex flex-col justify-center space-y-6">
						<div className="flex items-start gap-4">
							<div className="rounded-lg bg-amber-500/10 p-3">
								<MapPin className="h-5 w-5 text-amber-500" />
							</div>
							<div>
								<h4 className="font-semibold text-white">Адрес</h4>
								<p className="mt-1 text-neutral-400">г. Минск</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="rounded-lg bg-amber-500/10 p-3">
								<Phone className="h-5 w-5 text-amber-500" />
							</div>
							<div>
								<h4 className="font-semibold text-white">Телефон</h4>
								<p className="mt-1 text-neutral-400">+7 (999) 123-45-67</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="rounded-lg bg-amber-500/10 p-3">
								<Clock className="h-5 w-5 text-amber-500" />
							</div>
							<div>
								<h4 className="font-semibold text-white">Время работы</h4>
								<p className="mt-1 text-neutral-400">Пн–Вс: 09:00 — 20:00</p>
							</div>
						</div>

						<LinkButton href="/contacts" variant="primary" size="lg" className="self-start mt-4">
							Связаться с нами
						</LinkButton>
					</div>
				</div>
			</Container>
		</Section>
	)
}
