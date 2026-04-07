'use client'

import { useEffect, useRef, useState } from 'react'
import { CarCard } from './CarCard'
import { CarCardSkeleton } from './CarCardSkeleton'


const INITIAL_BATCH = 6
const LOAD_BATCH = 6

interface CatalogGridProps {
	cars: React.ComponentProps<typeof CarCard>['car'][]
	emptyMessage?: string
}

export function CatalogGrid({ cars, emptyMessage = 'Автомобили не найдены' }: CatalogGridProps) {
	const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
	const sentinelRef = useRef<HTMLDivElement>(null)

	const hasMore = visibleCount < cars.length

	useEffect(() => {
		const sentinel = sentinelRef.current
		if (!sentinel || !hasMore) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisibleCount((prev) => Math.min(prev + LOAD_BATCH, cars.length))
				}
			},
			{ rootMargin: '200px' },
		)

		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [hasMore, cars.length])

	if (cars.length === 0) {
		return (
			<div className="py-16 text-center">
				<p className="text-lg text-neutral-400">{emptyMessage}</p>
			</div>
		)
	}

	const visible = cars.slice(0, visibleCount)

	return (
		<>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{visible.map((car, i) => (
					<CarCard key={car.id} car={car} priority={i < 3} />
				))}
				{hasMore &&
					Array.from({ length: Math.min(LOAD_BATCH, cars.length - visibleCount) }, (_, i) => (
						<CarCardSkeleton key={`skeleton-${i}`} />
					))}
			</div>
			{hasMore && <div ref={sentinelRef} className="h-1" />}
		</>
	)
}
