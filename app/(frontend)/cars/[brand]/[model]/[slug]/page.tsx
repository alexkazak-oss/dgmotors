import { generateBreadcrumbJsonLd, generateCarJsonLd } from '@/src/features/seo/jsonLd'
import {
	CAR_STATUS_LABELS,
	DRIVETRAIN_LABELS,
	ENGINE_TYPE_LABELS,
	TRANSMISSION_LABELS,
} from '@/src/shared/constants/labels'
import { toCarDetail } from '@/src/shared/lib/mappers'
import { getPayload } from '@/src/shared/lib/payload'
import { formatPrice, getSiteUrl } from '@/src/shared/lib/utils'
import type { CarDetail } from '@/src/shared/types'
import { Badge, Breadcrumbs, Container } from '@/src/shared/ui'
import {
	Calendar,
	Car,
	Fuel, Gauge,
	MapPin,
	Palette,
	Settings,
	Zap,
} from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CarGallery } from './CarGallery'
import { CarLeadSection } from './CarLeadSection'

interface Props {
	params: Promise<{ brand: string; model: string; slug: string }>
}

async function getCar(carSlug: string): Promise<CarDetail | null> {
	const payload = await getPayload()

	const { docs } = await payload.find({
		collection: 'cars',
		where: {
			slug: { equals: carSlug },
			isPublished: { equals: true },
		},
		limit: 1,
		depth: 2,
	})

	if (!docs[0]) return null
	return toCarDetail(docs[0])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { brand, model, slug } = await params
	const car = await getCar(slug)
	if (!car) return {}

	const title = car.seo?.title || `${car.title} — купить в DG Motors`
	const description =
		car.seo?.description ||
		car.shortDescription ||
		`${car.title}. Цена: ${formatPrice(car.price)}. Купить в DG Motors.`

	const url = `/cars/${brand}/${model}/${slug}`

	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			type: 'website',
			images: car.mainImage ? [{ url: car.mainImage.url }] : [],
		},
	}
}

export default async function CarPage({ params }: Props) {
	const { brand: brandSlug, model: modelSlug, slug } = await params
	const car = await getCar(slug)
	if (!car) notFound()

	const brandTitle = car.brand.title || brandSlug
	const modelTitle = car.model.title || modelSlug
	const carUrl = `/cars/${brandSlug}/${modelSlug}/${slug}`
	const specs = car.specifications ?? {}

	const jsonLd = generateCarJsonLd({
		title: car.title,
		description: car.shortDescription ?? undefined,
		price: car.price,
		brand: brandTitle,
		model: modelTitle,
		year: specs.year ?? undefined,
		mileage: specs.mileage ?? undefined,
		color: specs.color ?? undefined,
		vin: car.vin ?? undefined,
		image: car.mainImage?.url,
		url: carUrl,
		status: car.status,
	})

	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: 'Каталог', url: '/cars' },
		{ name: brandTitle, url: `/cars/${brandSlug}` },
		{ name: modelTitle, url: `/cars/${brandSlug}/${modelSlug}` },
		{ name: car.title, url: carUrl },
	])

	const allImages = car.mainImage
		? [car.mainImage, ...car.gallery]
		: car.gallery

	const specItems = [
		{ icon: Calendar, label: 'Год', value: specs.year },
		{ icon: Fuel, label: 'Двигатель', value: specs.engineType ? ENGINE_TYPE_LABELS[specs.engineType] : null },
		{ icon: Gauge, label: 'Мощность', value: specs.power ? `${specs.power} л.с.` : null },
		{ icon: Zap, label: 'Запас хода', value: specs.range ? `${specs.range} км` : null },
		{ icon: Settings, label: 'Трансмиссия', value: specs.transmission ? TRANSMISSION_LABELS[specs.transmission] : null },
		{ icon: Car, label: 'Привод', value: specs.drivetrain ? DRIVETRAIN_LABELS[specs.drivetrain] : null },
		{ icon: Palette, label: 'Цвет', value: specs.color },
		{ icon: Gauge, label: 'Пробег', value: specs.mileage != null ? `${specs.mileage.toLocaleString('ru-RU')} км` : null },
	].filter((s) => s.value)

	const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
		in_stock: 'success',
		on_order: 'info',
		sold: 'danger',
		reserved: 'warning',
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>

			<Breadcrumbs
				items={[
					{ label: 'Каталог', href: '/cars' },
					{ label: brandTitle, href: `/cars/${brandSlug}` },
					{ label: modelTitle, href: `/cars/${brandSlug}/${modelSlug}` },
					{ label: car.title },
				]}
			/>

			<section className="pb-16">
				<Container>
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						{/* Left: Gallery + Details */}
						<div className="lg:col-span-2 space-y-8">
							{/* Gallery */}
							{allImages.length > 0 && (
								<CarGallery images={allImages} title={car.title} />
							)}

							{/* Title + status (mobile) */}
							<div className="lg:hidden">
								<div className="flex items-center gap-3 mb-3">
									<Badge variant={statusVariant[car.status] || 'default'}>
										{CAR_STATUS_LABELS[car.status]}
									</Badge>
									{car.vin && <span className="text-xs text-neutral-500">VIN: {car.vin}</span>}
								</div>
								<h1 className="text-2xl font-bold text-white sm:text-3xl">{car.title}</h1>
								<div className="mt-4 flex items-baseline gap-3">
									<span className="text-3xl font-bold text-amber-400">{formatPrice(car.price)}</span>
									{car.oldPrice && (
										<span className="text-lg text-neutral-500 line-through">{formatPrice(car.oldPrice)}</span>
									)}
								</div>
							</div>

							{/* Specifications */}
							{specItems.length > 0 && (
								<div>
									<h2 className="mb-4 text-xl font-semibold text-white">Характеристики</h2>
									<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
										{specItems.map((spec) => (
											<div
												key={spec.label}
												className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
											>
												<spec.icon className="mb-2 h-5 w-5 text-amber-500" />
												<p className="text-xs text-neutral-500">{spec.label}</p>
												<p className="mt-0.5 font-semibold text-white">{spec.value}</p>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Description */}
							{car.shortDescription && (
								<div>
									<h2 className="mb-4 text-xl font-semibold text-white">Описание</h2>
									<p className="text-neutral-400 leading-relaxed">{car.shortDescription}</p>
								</div>
							)}

							{/* Location */}
							{car.location && (
								<div className="flex items-center gap-2 text-sm text-neutral-400">
									<MapPin className="h-4 w-4 text-amber-500" />
									{car.location.title}, {car.location.address}
								</div>
							)}
						</div>

						{/* Right: Sticky sidebar */}
						<div className="lg:col-span-1">
							<div className="sticky top-24 space-y-6">
								{/* Price card (desktop) */}
								<div className="hidden lg:block rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
									<div className="flex items-center gap-3 mb-4">
										<Badge variant={statusVariant[car.status] || 'default'}>
											{CAR_STATUS_LABELS[car.status]}
										</Badge>
										{car.stockNumber && (
											<span className="text-xs text-neutral-500">#{car.stockNumber}</span>
										)}
									</div>
									<h1 className="text-xl font-bold text-white">{car.title}</h1>
									<div className="mt-3 flex items-baseline gap-3">
										<span className="text-3xl font-bold text-amber-400">{formatPrice(car.price)}</span>
										{car.oldPrice && (
											<span className="text-lg text-neutral-500 line-through">{formatPrice(car.oldPrice)}</span>
										)}
									</div>
									{car.vin && (
										<p className="mt-2 text-xs text-neutral-500">VIN: {car.vin}</p>
									)}
								</div>

								{/* Lead form */}
								<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
									<h3 className="mb-4 text-lg font-semibold text-white">Узнать об авто</h3>
									<CarLeadSection
										carId={car.id}
										brandId={car.brand.slug}
										modelId={car.model.slug}
										carTitle={car.title}
										carUrl={`${getSiteUrl()}${carUrl}`}
										vin={car.vin ?? undefined}
										stockNumber={car.stockNumber ?? undefined}
									/>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
