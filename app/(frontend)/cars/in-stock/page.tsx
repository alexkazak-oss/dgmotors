import { CatalogGrid } from '@/src/features/catalog'
import { toCarCard } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Breadcrumbs, Container } from '@/src/shared/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Автомобили в наличии',
	description: 'Автомобили в наличии в DG Motors. Выберите и купите авто прямо сейчас с полным сопровождением сделки.',
}

export default async function InStockPage() {
	const payload = await getPayload()

	const { docs: cars } = await payload.find({
		collection: 'cars',
		where: {
			isPublished: { equals: true },
			status: { equals: 'in_stock' },
		},
		limit: 50,
		depth: 2,
	})

	const mapped = cars.map((car) => toCarCard(car))

	return (
		<>
			<Breadcrumbs items={[{ label: 'Каталог', href: '/cars' }, { label: 'В наличии' }]} />
			<section className="pb-16">
				<Container>
					<h1 className="mb-8 text-3xl font-bold text-white md:text-4xl">Автомобили в наличии</h1>
					<CatalogGrid cars={mapped} emptyMessage="Сейчас нет авто в наличии. Загляните позже!" />
				</Container>
			</section>
		</>
	)
}
