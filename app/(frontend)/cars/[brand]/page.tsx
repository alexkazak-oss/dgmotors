import { CatalogGrid } from '@/src/features/catalog'
import { toCarCard } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { Breadcrumbs, Container } from '@/src/shared/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface Props {
	params: Promise<{ brand: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { brand: slug } = await params
	const payload = await getPayload()
	const { docs } = await payload.find({
		collection: 'brands',
		where: { slug: { equals: slug }, isPublished: { equals: true } },
		limit: 1,
	})
	const brand = docs[0]
	if (!brand) return {}

	return {
		title: `${brand.title} — купить автомобиль`,
		description: brand.seo?.description || `Автомобили ${brand.title} в DG Motors. В наличии и под заказ.`,
		openGraph: {
			title: `${brand.title} — DG Motors`,
			description: `Автомобили ${brand.title} в DG Motors`,
		},
	}
}

export default async function BrandPage({ params }: Props) {
	const { brand: slug } = await params
	const payload = await getPayload()

	const { docs: brands } = await payload.find({
		collection: 'brands',
		where: { slug: { equals: slug }, isPublished: { equals: true } },
		limit: 1,
		depth: 1,
	})

	const brand = brands[0]
	if (!brand) notFound()

	const { docs: cars } = await payload.find({
		collection: 'cars',
		where: {
			brand: { equals: brand.id },
			isPublished: { equals: true },
			status: { not_equals: 'sold' },
		},
		limit: 50,
		depth: 2,
	})

	const mapped = cars.map((car) =>
		toCarCard(car, { brandSlug: slug, brandTitle: brand.title }),
	)

	return (
		<>
			<Breadcrumbs
				items={[
					{ label: 'Каталог', href: '/cars' },
					{ label: brand.title },
				]}
			/>
			<section className="pb-16">
				<Container>
					<h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
						Автомобили {brand.title}
					</h1>
					{brand.shortDescription && (
						<p className="mb-8 max-w-2xl text-lg text-neutral-400">{brand.shortDescription}</p>
					)}
					<CatalogGrid cars={mapped} emptyMessage={`Нет доступных авто ${brand.title}`} />
				</Container>
			</section>
		</>
	)
}
