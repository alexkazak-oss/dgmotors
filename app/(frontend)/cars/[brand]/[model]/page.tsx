import { CatalogGrid } from '@/src/features/catalog'
import { toCarCard } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Breadcrumbs, Container } from '@/src/shared/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
	params: Promise<{ brand: string; model: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { brand: brandSlug, model: modelSlug } = await params
	const payload = await getPayload()

	const { docs: models } = await payload.find({
		collection: 'models',
		where: { slug: { equals: modelSlug }, isPublished: { equals: true } },
		limit: 1,
		depth: 1,
	})
	const model = models[0]
	if (!model) return {}

	const brandTitle =
		(model.brand && typeof model.brand === 'object' ? model.brand.title : null) || brandSlug

	return {
		title: `${brandTitle} ${model.title} — купить`,
		description: model.seo?.description || `Автомобили ${brandTitle} ${model.title} в DG Motors.`,
	}
}

export default async function ModelPage({ params }: Props) {
	const { brand: brandSlug, model: modelSlug } = await params
	const payload = await getPayload()

	const { docs: brands } = await payload.find({
		collection: 'brands',
		where: { slug: { equals: brandSlug }, isPublished: { equals: true } },
		limit: 1,
	})
	const brand = brands[0]
	if (!brand) notFound()

	const { docs: models } = await payload.find({
		collection: 'models',
		where: {
			slug: { equals: modelSlug },
			brand: { equals: brand.id },
			isPublished: { equals: true },
		},
		limit: 1,
		depth: 1,
	})
	const model = models[0]
	if (!model) notFound()

	const { docs: cars } = await payload.find({
		collection: 'cars',
		where: {
			model: { equals: model.id },
			isPublished: { equals: true },
			status: { not_equals: 'sold' },
		},
		limit: 50,
		depth: 2,
	})

	const mapped = cars.map((car) =>
		toCarCard(car, {
			brandSlug,
			brandTitle: brand.title,
			modelSlug,
			modelTitle: model.title,
		}),
	)

	return (
		<>
			<Breadcrumbs
				items={[
					{ label: 'Каталог', href: '/cars' },
					{ label: brand.title, href: `/cars/${brandSlug}` },
					{ label: model.title },
				]}
			/>
			<section className="pb-16">
				<Container>
					<h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
						{brand.title} {model.title}
					</h1>
					{model.shortDescription && (
						<p className="mb-8 max-w-2xl text-lg text-neutral-400">{model.shortDescription}</p>
					)}
					<CatalogGrid cars={mapped} emptyMessage={`Нет доступных ${brand.title} ${model.title}`} />
				</Container>
			</section>
		</>
	)
}
