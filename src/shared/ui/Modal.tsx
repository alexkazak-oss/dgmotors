'use client'

import { cn } from '@/src/shared/lib/utils'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	title?: string
	className?: string
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null)
	const [mounted, setMounted] = useState(typeof window !== 'undefined')
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		if (isOpen) document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	if (!mounted || !isOpen) return null

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
			onClick={(e) => {
				if (e.target === overlayRef.current) onClose()
			}}
		>
			<div
				className={cn(
					'relative w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl',
					className,
				)}
			>
				<div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
					{title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
					<button
						onClick={onClose}
						className="ml-auto rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="px-6 py-5">{children}</div>
			</div>
		</div>
	)
}
