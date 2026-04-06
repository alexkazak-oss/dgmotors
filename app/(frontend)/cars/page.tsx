import { CatalogGrid } from '@/src/features/catalog'
import { toCarCard } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Breadcrumbs, Container } from '@/src/shared/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Каталог автомобилей',
	description: 'Полный каталог автомобилей DG Motors. Новые авто в наличии и под заказ от мировых производителей из Китая.',
}

export default async function CarsPage() {
	const payload = await getPayload()

	const { docs: cars } = await payload.find({
		collection: 'cars',
		where: {
			isPublished: { equals: true },
			status: { not_equals: 'sold' },
		},
		limit: 50,
		depth: 2,
	})

	const mapped = cars.map((car) => toCarCard(car))

	return (
		<>
			<Breadcrumbs items={[{ label: 'Каталог' }]} />
			<section className="pb-16">
				<Container>
					<h1 className="mb-8 text-3xl font-bold text-white md:text-4xl">Каталог автомобилей</h1>
					<CatalogGrid cars={mapped} />
				</Container>
			</section>
		</>
	)
}
