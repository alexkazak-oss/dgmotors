import { FooterSection } from '@/src/widgets/footer/FooterSection'
import { HeaderClient } from '@/src/widgets/header/HeaderClient'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: {
		default: 'DG Motors — Автомобили из Китая',
		template: '%s | DG Motors',
	},
	description:
		'Официальный дилер премиальных автомобилей. Новые авто из Китая — в наличии и под заказ. Кредит, лизинг, Trade-in.',
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: 'DG Motors',
	},
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru" className={`${inter.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col bg-neutral-950 text-white font-sans">
				<HeaderClient />
				<main className="flex-1">{children}</main>
				<FooterSection />
			</body>
		</html>
	)
}
