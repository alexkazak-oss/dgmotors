import {withPayload} from '@payloadcms/next/withPayload'
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	turbopack: {
		root: import.meta.dirname,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

export default withPayload(nextConfig)
