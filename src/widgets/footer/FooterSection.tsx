import { Container } from '@/src/shared/ui'
import Link from 'next/link'

const footerColumns = [
	{
		title: 'Каталог',
		links: [
			{ label: 'Авто в наличии', href: '/cars/in-stock' },
			{ label: 'Авто под заказ', href: '/cars/on-order' },
			{ label: 'Заказ из Китая', href: '/order-from-china' },
		],
	},
	{
		title: 'Компания',
		links: [
			{ label: 'О нас', href: '/about' },
			{ label: 'Контакты', href: '/contacts' },
			{ label: 'Финансирование', href: '/financing' },
		],
	},
	{
		title: 'Контакты',
		links: [
			{ label: '+37 (33) 123-45-67', href: 'tel:+373331234567' },
			{ label: 'info@dgmotors.com', href: 'mailto:info@dgmotors.com' },
			{ label: 'г. Минск, ул. Примерная, д. 1', href: '/contacts' },
		],
	},
]

export function FooterSection() {
	return (
		<footer className="border-t border-neutral-800 bg-neutral-950">
			<Container>
				<div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div>
						<Link href="/" className="flex items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-lg font-black text-black">
								DG
							</div>
							<span className="text-lg font-bold text-white">Motors</span>
						</Link>
						<p className="mt-4 text-sm leading-relaxed text-neutral-400">
							Официальный дилер премиальных автомобилей. Продажа новых авто из Китая и Европы.
						</p>
					</div>

					{/* Columns */}
					{footerColumns.map((column) => (
						<div key={column.title}>
							<h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
								{column.title}
							</h4>
							<ul className="mt-4 space-y-2">
								{column.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-sm text-neutral-500 transition-colors hover:text-white"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom */}
				<div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-600">
					© {new Date().getFullYear()} DG Motors. Все права защищены.
				</div>
			</Container>
		</footer>
	)
}
