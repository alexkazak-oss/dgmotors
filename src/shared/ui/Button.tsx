import { cn } from '@/src/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, type ElementType } from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20',
				secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm',
				outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black',
				ghost: 'text-neutral-300 hover:text-white hover:bg-white/10',
				dark: 'bg-neutral-800 text-white hover:bg-neutral-700',
			},
			size: {
				sm: 'h-9 px-4 text-sm',
				md: 'h-11 px-6 text-sm',
				lg: 'h-13 px-8 text-base',
				xl: 'h-14 px-10 text-lg',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)

type ButtonOwnProps<C extends ElementType = 'button'> = VariantProps<typeof buttonVariants> & {
	as?: C
	className?: string
}

type ButtonProps<C extends ElementType = 'button'> = ButtonOwnProps<C> &
	Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>

export function Button<C extends ElementType = 'button'>({
	as,
	className,
	variant,
	size,
	...props
}: ButtonProps<C>) {
	const Component = as ?? 'button'
	return (
		<Component className={cn(buttonVariants({ variant, size, className }))} {...props} />
	)
}

type LinkButtonProps = VariantProps<typeof buttonVariants> &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
		className?: string
	}

export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
	return (
		<a className={cn(buttonVariants({ variant, size, className }))} {...props} />
	)
}

export { buttonVariants }
