import { BrandCard } from '@/src/features/catalog'
import { toBrandSummary } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Container, Section, SectionHeader } from '@/src/shared/ui'

export async function BrandGrid() {
	const payload = await getPayload()

	const { docs: brands } = await payload.find({
		collection: 'brands',
		where: { isPublished: { equals: true } },
		sort: 'order',
		limit: 20,
		depth: 1,
	})

	const mapped = brands.map(toBrandSummary)

	if (mapped.length === 0) return null

	return (
		<Section className="bg-neutral-950">
			<Container>
				<SectionHeader
					title="Бренды"
					subtitle="Широкий выбор автомобилей от мировых производителей"
				/>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
					{mapped.map((brand) => (
						<BrandCard key={brand.slug} brand={brand} />
					))}
				</div>
			</Container>
		</Section>
	)
}
