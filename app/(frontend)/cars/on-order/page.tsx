import { CatalogGrid } from '@/src/features/catalog'
import { toCarCard } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Breadcrumbs, Container } from '@/src/shared/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Автомобили под заказ',
	description: 'Закажите автомобиль из Китая. Доставка и оформление — всё включено.',
}

export default async function OnOrderPage() {
	const payload = await getPayload()

	const { docs: cars } = await payload.find({
		collection: 'cars',
		where: {
			isPublished: { equals: true },
			status: { equals: 'on_order' },
		},
		limit: 50,
		depth: 2,
	})

	const mapped = cars.map((car) => toCarCard(car))

	return (
		<>
			<Breadcrumbs items={[{ label: 'Каталог', href: '/cars' }, { label: 'Под заказ' }]} />
			<section className="pb-16">
				<Container>
					<h1 className="mb-8 text-3xl font-bold text-white md:text-4xl">Автомобили под заказ</h1>
					<CatalogGrid cars={mapped} emptyMessage="Свяжитесь с нами для индивидуального заказа." />
				</Container>
			</section>
		</>
	)
}
