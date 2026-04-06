import {getSiteUrl} from '@/src/shared/lib/utils'
import type {AutoDealer, BreadcrumbList, Product, WithContext} from 'schema-dts'

interface CarJsonLdData {
	title: string
	description?: string
	price: number
	currency?: string
	brand: string
	model: string
	year?: number
	mileage?: number
	color?: string
	vin?: string
	image?: string
	url: string
	status: string
}

export function generateCarJsonLd(car: CarJsonLdData): WithContext<Product> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: car.title,
		description: car.description,
		image: car.image,
		url: `${getSiteUrl()}${car.url}`,
		brand: {
			'@type': 'Brand',
			name: car.brand,
		},
		offers: {
			'@type': 'Offer',
			price: car.price,
			priceCurrency: car.currency || 'USD',
			availability:
				car.status === 'in_stock'
					? 'https://schema.org/InStock'
					: car.status === 'on_order'
						? 'https://schema.org/PreOrder'
						: 'https://schema.org/OutOfStock',
			url: `${getSiteUrl()}${car.url}`,
		},
		...(car.vin ? {vehicleIdentificationNumber: car.vin} : {}),
	}
}

export function generateDealerJsonLd(): WithContext<AutoDealer> {
	return {
		'@context': 'https://schema.org',
		'@type': 'AutoDealer',
		name: 'DG Motors',
		url: getSiteUrl(),
	}
}

interface BreadcrumbItem {
	name: string
	url: string
}

export function generateBreadcrumbJsonLd(
	items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: `${getSiteUrl()}${item.url}`,
		})),
	}
}
