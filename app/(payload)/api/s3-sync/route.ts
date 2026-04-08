import {syncS3ToPayload} from '@/src/payload/services/s3-sync'
import {getPayload} from '@/src/shared/lib/payload'
import {headers as nextHeaders} from 'next/headers'
import {NextResponse} from 'next/server'

// Vercel serverless: allow up to 60s for sync (Hobby = 10s, Pro = 60s)
export const maxDuration = 60

export async function POST() {
	try {
		const payload = await getPayload()

		// Verify the user is authenticated and is admin
		const hdrs = await nextHeaders()
		const {user} = await payload.auth({headers: hdrs})
		if (!user || (user as Record<string, unknown>).role !== 'admin') {
			return NextResponse.json({error: 'Unauthorized'}, {status: 401})
		}

		const result = await syncS3ToPayload(payload)

		return NextResponse.json(result)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Internal server error'
		console.error('[S3 Sync] Error:', message)
		return NextResponse.json({error: message}, {status: 500})
	}
}
