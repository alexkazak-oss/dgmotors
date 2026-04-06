import { cn } from '@/src/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

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

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, size, className }))} {...props} />
	)
}

interface LinkButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
	VariantProps<typeof buttonVariants> { }

export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
	return (
		<a className={cn(buttonVariants({ variant, size, className }))} {...props} />
	)
}

export { buttonVariants }
