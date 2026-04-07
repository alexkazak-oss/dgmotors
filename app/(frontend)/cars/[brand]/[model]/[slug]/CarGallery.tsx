'use client'

import { cn } from '@/src/shared/lib/utils'
import type { MediaImage } from '@/src/shared/types'
import Image from 'next/image'
import { useState } from 'react'

interface CarGalleryProps {
	images: MediaImage[]
	title: string
}

export function CarGallery({ images, title }: CarGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0)

	if (images.length === 0) return null

	const active = images[activeIndex]

	return (
		<div className="space-y-3">
			{/* Main image */}
			<div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-neutral-800">
				<Image
					src={active.url}
					alt={active.alt || title}
					fill
					className="object-cover"
					priority={activeIndex === 0}
					sizes="(max-width: 1024px) 100vw, 66vw"
					key={active.url}
				/>
			</div>

			{/* Thumbnails */}
			{images.length > 1 && (
				<div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
					{images.map((img, i) => (
						<button
							key={i}
							type="button"
							onClick={() => setActiveIndex(i)}
							className={cn(
								'relative aspect-4/3 overflow-hidden rounded-lg bg-neutral-800 ring-2 transition-all',
								i === activeIndex
									? 'ring-amber-500'
									: 'ring-transparent hover:ring-neutral-600',
							)}
						>
							<Image
								src={img.url}
								alt={img.alt || `${title} фото ${i + 1}`}
								fill
								className="object-cover"
								sizes="150px"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
