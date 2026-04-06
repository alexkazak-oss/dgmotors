import Image from 'next/image'
import Link from 'next/link'

interface BrandCardProps {
	brand: {
		slug: string
		title: string
		logo?: { url: string; alt: string } | null
		country?: string | null
	}
}

export function BrandCard({ brand }: BrandCardProps) {
	return (
		<Link
			href={`/cars/${brand.slug}`}
			className="group flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-neutral-800/50"
		>
			<div className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-800 p-3">
				{brand.logo ? (
					<Image
						src={brand.logo.url}
						alt={brand.logo.alt || brand.title}
						fill
						className="object-contain p-2"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-2xl font-bold text-neutral-600">
						{brand.title[0]}
					</div>
				)}
			</div>
			<div className="text-center">
				<h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
					{brand.title}
				</h3>
				{brand.country && (
					<p className="mt-1 text-sm text-neutral-500">{brand.country}</p>
				)}
			</div>
		</Link>
	)
}
