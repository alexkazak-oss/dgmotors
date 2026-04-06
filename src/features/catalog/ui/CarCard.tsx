import { CAR_STATUS_LABELS, ENGINE_TYPE_LABELS } from '@/src/shared/constants/labels'
import { formatPrice } from '@/src/shared/lib/utils'
import { Badge, Button } from '@/src/shared/ui'
import { Calendar, Fuel, Gauge, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CarCardProps {
	car: {
		id: string
		title: string
		slug: string
		price: number
		oldPrice?: number | null
		status: string
		mainImage?: { url: string; alt: string } | null
		brand: { slug: string; title: string }
		model: { slug: string; title: string }
		specifications?: {
			year?: number | null
			mileage?: number | null
			engineType?: string | null
			power?: number | null
			range?: number | null
		} | null
		tags?: string[] | null
		isFeatured?: boolean
	}
}

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
	in_stock: 'success',
	on_order: 'info',
	sold: 'danger',
	reserved: 'warning',
}

export function CarCard({ car }: CarCardProps) {
	const href = `/cars/${car.brand.slug}/${car.model.slug}/${car.slug}`
	const specs = car.specifications

	return (
		<div className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/20">
			{/* Image */}
			<Link href={href} className="relative aspect-4/3 overflow-hidden bg-neutral-800">
				{car.mainImage ? (
					<Image
						src={car.mainImage.url}
						alt={car.mainImage.alt || car.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-neutral-600">
						<Zap className="h-16 w-16" />
					</div>
				)}
				{/* Status badge */}
				<div className="absolute top-3 left-3 flex gap-2">
					<Badge variant={statusVariant[car.status] || 'default'}>
						{CAR_STATUS_LABELS[car.status] || car.status}
					</Badge>
					{car.tags?.includes('new') && <Badge variant="warning">Новинка</Badge>}
					{car.tags?.includes('promo') && <Badge variant="danger">Акция</Badge>}
				</div>
			</Link>

			{/* Content */}
			<div className="flex flex-1 flex-col p-5">
				<Link href={href}>
					<h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
						{car.title}
					</h3>
				</Link>

				{/* Specs row */}
				<div className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-400">
					{specs?.year && (
						<span className="flex items-center gap-1">
							<Calendar className="h-3.5 w-3.5" />
							{specs.year}
						</span>
					)}
					{specs?.engineType && (
						<span className="flex items-center gap-1">
							<Fuel className="h-3.5 w-3.5" />
							{ENGINE_TYPE_LABELS[specs.engineType] || specs.engineType}
						</span>
					)}
					{specs?.power && (
						<span className="flex items-center gap-1">
							<Gauge className="h-3.5 w-3.5" />
							{specs.power} л.с.
						</span>
					)}
					{specs?.range && (
						<span className="flex items-center gap-1">
							<Zap className="h-3.5 w-3.5" />
							{specs.range} км
						</span>
					)}
				</div>

				{/* Price */}
				<div className="mt-auto pt-4">
					<div className="flex items-baseline gap-3">
						<span className="text-2xl font-bold text-white">{formatPrice(car.price)}</span>
						{car.oldPrice && (
							<span className="text-sm text-neutral-500 line-through">
								{formatPrice(car.oldPrice)}
							</span>
						)}
					</div>
				</div>

				{/* CTA */}
				<div className="mt-4 flex gap-2">
					<Button asChild size="sm" className="flex-1" variant="primary">
						<Link href={href}>Подробнее</Link>
					</Button>
					<Button size="sm" variant="secondary" className="flex-1">
						Оставить заявку
					</Button>
				</div>
			</div>
		</div>
	)
}
