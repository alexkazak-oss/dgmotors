import { cn } from '@/src/shared/lib/utils'

interface SectionProps {
	children: React.ReactNode
	className?: string
	id?: string
	dark?: boolean
}

export function Section({ children, className, id, dark }: SectionProps) {
	return (
		<section
			id={id}
			className={cn(
				'py-16 md:py-24',
				dark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900',
				className,
			)}
		>
			{children}
		</section>
	)
}

interface SectionHeaderProps {
	title: string
	subtitle?: string
	className?: string
	align?: 'left' | 'center'
}

export function SectionHeader({ title, subtitle, className, align = 'center' }: SectionHeaderProps) {
	return (
		<div className={cn('mb-12', align === 'center' && 'text-center', className)}>
			<h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
			{subtitle && (
				<p className="mt-4 max-w-2xl text-lg text-neutral-400 mx-auto">{subtitle}</p>
			)}
		</div>
	)
}
