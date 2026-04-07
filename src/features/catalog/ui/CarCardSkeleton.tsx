export function CarCardSkeleton() {
	return (
		<div className="flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 animate-pulse">
			{/* Image placeholder */}
			<div className="aspect-4/3 bg-neutral-800" />

			{/* Content */}
			<div className="flex flex-1 flex-col p-5">
				{/* Title */}
				<div className="h-5 w-3/4 rounded bg-neutral-800" />

				{/* Specs row */}
				<div className="mt-3 flex gap-3">
					<div className="h-4 w-14 rounded bg-neutral-800" />
					<div className="h-4 w-16 rounded bg-neutral-800" />
					<div className="h-4 w-14 rounded bg-neutral-800" />
				</div>

				{/* Price */}
				<div className="mt-auto pt-4">
					<div className="h-7 w-32 rounded bg-neutral-800" />
				</div>

				{/* Buttons */}
				<div className="mt-4 flex gap-2">
					<div className="h-9 flex-1 rounded-lg bg-neutral-800" />
					<div className="h-9 flex-1 rounded-lg bg-neutral-800" />
				</div>
			</div>
		</div>
	)
}

interface CatalogGridSkeletonProps {
	count?: number
}

export function CatalogGridSkeleton({ count = 6 }: CatalogGridSkeletonProps) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }, (_, i) => (
				<CarCardSkeleton key={i} />
			))}
		</div>
	)
}
