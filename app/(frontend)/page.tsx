import { CatalogGridSkeleton } from '@/src/features/catalog'
import { generateDealerJsonLd } from '@/src/features/seo/jsonLd'
import { LazySection } from '@/src/shared/ui'
import { AdvantagesSection } from '@/src/widgets/advantages/AdvantagesSection'
import { BrandGrid } from '@/src/widgets/brand-grid/BrandGrid'
import { FeaturedCars } from '@/src/widgets/featured-cars/FeaturedCars'
import { FinanceSection } from '@/src/widgets/finance/FinanceSection'
import { Hero } from '@/src/widgets/hero/Hero'
import { SEOTextBlock } from '@/src/widgets/seo-text/SEOTextBlock'
import { ShowroomSection } from '@/src/widgets/showroom/ShowroomSection'
import { TestimonialsSection } from '@/src/widgets/testimonials/TestimonialsSection'
import { Suspense } from 'react'

export const revalidate = 60

export default function HomePage() {
	const jsonLd = generateDealerJsonLd()

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			{/* Critical — SSR, above the fold */}
			<Hero />
			<Suspense fallback={<CatalogGridSkeleton />}>
				<FeaturedCars />
			</Suspense>
			<BrandGrid />

			{/* Non-critical — deferred mount on scroll */}
			<LazySection>
				<AdvantagesSection />
			</LazySection>
			<LazySection>
				<FinanceSection />
			</LazySection>
			<LazySection>
				<TestimonialsSection />
			</LazySection>
			<LazySection>
				<ShowroomSection />
			</LazySection>

			{/* SEO text — always rendered for crawlers (lightweight) */}
			<SEOTextBlock
				title="DG Motors — ваш надёжный автодилер"
				text={`DG Motors — это официальный дилер новых автомобилей из Китая. Мы предлагаем широкий выбор автомобилей в наличии и под заказ с полным сопровождением сделки.\n\nНаша команда экспертов поможет вам выбрать идеальный автомобиль, подобрать оптимальные условия финансирования и обеспечит полное техническое обслуживание. Мы работаем с ведущими мировыми брендами и гарантируем качество каждого автомобиля.`}
			/>
		</>
	)
}
