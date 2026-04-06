import { CatalogGrid } from '@/src/features/catalog'
import { toCarCard } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Container, LinkButton, Section, SectionHeader } from '@/src/shared/ui'
import { ArrowRight } from 'lucide-react'

export async function FeaturedCars() {
	const payload = await getPayload()

	const { docs: cars } = await payload.find({
		collection: 'cars',
		where: {
			isFeatured: { equals: true },
			isPublished: { equals: true },
			status: { not_equals: 'sold' },
		},
		limit: 6,
		depth: 2,
	})

	const mapped = cars.map((car) => toCarCard(car))

	if (mapped.length === 0) return null

	return (
		<Section dark>
			<Container>
				<SectionHeader
					title="Рекомендуемые автомобили"
					subtitle="Лучшие предложения, отобранные нашими экспертами"
				/>
				<CatalogGrid cars={mapped} />
				<div className="mt-12 text-center">
					<LinkButton href="/cars" variant="outline" size="lg">
						Смотреть все авто
						<ArrowRight className="h-4 w-4" />
					</LinkButton>
				</div>
			</Container>
		</Section>
	)
}
