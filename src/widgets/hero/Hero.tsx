import { Container, LinkButton } from '@/src/shared/ui'
import { ArrowRight, PhoneCall } from 'lucide-react'

export function Hero() {
	return (
		<section className="relative min-h-[85vh] flex items-center bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-1/4 -right-48 h-96 w-96 rounded-full bg-amber-500 blur-[128px]" />
				<div className="absolute bottom-1/4 -left-48 h-96 w-96 rounded-full bg-amber-600 blur-[128px]" />
			</div>

			<Container className="relative z-10">
				<div className="max-w-3xl">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
						<span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
						Официальный дилер
					</div>

					<h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
						автомобили <br />
						<span className="text-amber-400">от лидеров рынка</span> <br />
						Из Китая
					</h1>

					<p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed md:text-xl">
						Новые автомобили из Китая с полным сопровождением.
					</p>

					<div className="mt-10 flex flex-col gap-4 sm:flex-row">
						<LinkButton href="/cars/in-stock" size="xl" variant="primary">
							Авто в наличии
							<ArrowRight className="h-5 w-5" />
						</LinkButton>
						<LinkButton href="/contacts" size="xl" variant="secondary">
							<PhoneCall className="h-5 w-5" />
							Связаться с нами
						</LinkButton>
					</div>

					{/* Stats */}
					<div className="mt-16 grid grid-cols-3 gap-8 border-t border-neutral-800 pt-8">
						<div>
							<div className="text-3xl font-bold text-white">200+</div>
							<div className="mt-1 text-sm text-neutral-500">Авто в наличии</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-white">15+</div>
							<div className="mt-1 text-sm text-neutral-500">Брендов</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-white">5 лет</div>
							<div className="mt-1 text-sm text-neutral-500">На рынке</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
