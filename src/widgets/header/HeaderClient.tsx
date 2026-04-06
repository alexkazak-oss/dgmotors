'use client'

import { cn } from '@/src/shared/lib/utils'
import { Button, Container } from '@/src/shared/ui'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
	{
		label: 'Каталог', href: '/cars', children: [
			{ label: 'В наличии', href: '/cars/in-stock' },
			{ label: 'Под заказ', href: '/cars/on-order' },
		]
	},
	{ label: 'О компании', href: '/about' },
	{ label: 'Финансирование', href: '/financing' },
	{ label: 'Заказ из Китая', href: '/order-from-china' },
	{ label: 'Контакты', href: '/contacts' },
]

export function HeaderClient() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

	return (
		<header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
			<Container>
				<div className="flex h-16 items-center justify-between md:h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-lg font-black text-black">
							DG
						</div>
						<span className="text-lg font-bold text-white">Motors</span>
					</Link>

					{/* Desktop nav */}
					<nav className="hidden items-center gap-1 lg:flex">
						{navItems.map((item) => (
							<div
								key={item.href}
								className="relative"
								onMouseEnter={() => item.children && setDropdownOpen(item.href)}
								onMouseLeave={() => setDropdownOpen(null)}
							>
								<Link
									href={item.href}
									className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
								>
									{item.label}
									{item.children && <ChevronDown className="h-3.5 w-3.5" />}
								</Link>
								{item.children && dropdownOpen === item.href && (
									<div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-neutral-800 bg-neutral-900 py-2 shadow-xl">
										{item.children.map((child) => (
											<Link
												key={child.href}
												href={child.href}
												className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
											>
												{child.label}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</nav>

					{/* Right side */}
					<div className="flex items-center gap-3">
						<a
							href="tel:+79991234567"
							className="hidden items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors md:flex"
						>
							<Phone className="h-4 w-4" />
							+37 (33) 123-45-67
						</a>
						<Button size="sm" className="hidden sm:inline-flex">
							Оставить заявку
						</Button>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="rounded-lg p-2 text-neutral-300 hover:bg-neutral-800 lg:hidden"
						>
							{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>
				</div>
			</Container>

			{/* Mobile menu */}
			<div
				className={cn(
					'overflow-hidden transition-all duration-300 lg:hidden',
					mobileMenuOpen ? 'max-h-96' : 'max-h-0',
				)}
			>
				<Container>
					<nav className="border-t border-neutral-800 py-4 space-y-1">
						{navItems.map((item) => (
							<div key={item.href}>
								<Link
									href={item.href}
									onClick={() => setMobileMenuOpen(false)}
									className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
								>
									{item.label}
								</Link>
								{item.children?.map((child) => (
									<Link
										key={child.href}
										href={child.href}
										onClick={() => setMobileMenuOpen(false)}
										className="block rounded-lg px-6 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
									>
										{child.label}
									</Link>
								))}
							</div>
						))}
						<div className="pt-3">
							<Button size="md" className="w-full">
								Оставить заявку
							</Button>
						</div>
					</nav>
				</Container>
			</div>
		</header>
	)
}
