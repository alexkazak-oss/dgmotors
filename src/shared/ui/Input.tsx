import { cn } from '@/src/shared/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
	return (
		<div className="space-y-1.5">
			{label && (
				<label htmlFor={id} className="block text-sm font-medium text-neutral-300">
					{label}
				</label>
			)}
			<input
				id={id}
				className={cn(
					'w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder:text-neutral-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500',
					error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
					className,
				)}
				{...props}
			/>
			{error && <p className="text-sm text-red-400">{error}</p>}
		</div>
	)
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
	return (
		<div className="space-y-1.5">
			{label && (
				<label htmlFor={id} className="block text-sm font-medium text-neutral-300">
					{label}
				</label>
			)}
			<textarea
				id={id}
				rows={4}
				className={cn(
					'w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder:text-neutral-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none',
					error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
					className,
				)}
				{...props}
			/>
			{error && <p className="text-sm text-red-400">{error}</p>}
		</div>
	)
}
