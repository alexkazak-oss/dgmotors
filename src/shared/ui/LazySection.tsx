'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface LazySectionProps {
	children: ReactNode
	/** Placeholder shown before the section enters the viewport */
	fallback?: ReactNode
	/** Margin around the root to trigger early loading */
	rootMargin?: string
}

/**
 * Defers mounting of children until the section approaches the viewport.
 * SSR renders the fallback (empty div by default) keeping the HTML lightweight.
 * Once the sentinel enters the viewport, children mount and stay mounted.
 */
export function LazySection({
	children,
	fallback,
	rootMargin = '300px',
}: LazySectionProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setMounted(true)
					observer.disconnect()
				}
			},
			{ rootMargin },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [rootMargin])

	if (mounted) return <>{children}</>

	return <div ref={ref}>{fallback}</div>
}
