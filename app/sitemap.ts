import {toCarSitemapEntry, toSlugDocument} from '@/src/shared/lib/mappers'
import {getPayload} from '@/src/shared/lib/payload'
import {getSiteUrl} from '@/src/shared/lib/utils'
import type {MetadataRoute} from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const siteUrl = getSiteUrl()
	const payload = await getPayload()

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: siteUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${siteUrl}/cars`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${siteUrl}/cars/in-stock`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${siteUrl}/cars/on-order`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{url: `${siteUrl}/contacts`, changeFrequency: 'monthly', priority: 0.7},
		{url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.6},
		{url: `${siteUrl}/financing`, changeFrequency: 'monthly', priority: 0.7},
		{
			url: `${siteUrl}/order-from-china`,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	]

	// Brand pages
	const {docs: brands} = await payload.find({
		collection: 'brands',
		where: {isPublished: {equals: true}},
		limit: 100,
	})

	const brandRoutes: MetadataRoute.Sitemap = brands
		.map(toSlugDocument)
		.map((brand) => ({
			url: `${siteUrl}/cars/${brand.slug}`,
			lastModified: brand.updatedAt ? new Date(brand.updatedAt) : new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		}))

	// Car pages
	const {docs: cars} = await payload.find({
		collection: 'cars',
		where: {isPublished: {equals: true}, status: {not_equals: 'sold'}},
		limit: 1000,
		depth: 2,
	})

	const carRoutes: MetadataRoute.Sitemap = cars
		.map(toCarSitemapEntry)
		.map((car) => ({
			url: `${siteUrl}/cars/${car.brand?.slug}/${car.model?.slug}/${car.slug}`,
			lastModified: car.updatedAt ? new Date(car.updatedAt) : new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.7,
		}))

	return [...staticRoutes, ...brandRoutes, ...carRoutes]
}
