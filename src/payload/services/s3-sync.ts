/**
 * S3 - Payload media sync service.
 */
import {type _Object, ListObjectsV2Command, S3Client} from '@aws-sdk/client-s3'
import type {Payload} from 'payload'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface SyncResult {
	found: number
	created: number
	updated: number
	skipped: number
	errors: string[]
}

interface S3Config {
	bucket: string
	region: string
	prefix: string
	publicBaseUrl: string
	accessKeyId: string
	secretAccessKey: string
	endpoint?: string
	forcePathStyle?: boolean
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MIME_MAP: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.bmp': 'image/bmp',
	'.tiff': 'image/tiff',
	'.tif': 'image/tiff',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getS3Config(): S3Config {
	const bucket = process.env.S3_BUCKET?.trim()
	const region = process.env.S3_REGION?.trim()
	const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim()
	const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim()

	if (!bucket || !region || !accessKeyId || !secretAccessKey) {
		throw new Error(
			`S3 environment variables are not configured. bucket=${bucket ? 'set' : 'missing'} region=${region ? 'set' : 'missing'}`,
		)
	}

	return {
		bucket,
		region,
		prefix: 'media/',
		publicBaseUrl:
			process.env.S3_PUBLIC_BASE_URL ||
			`https://${bucket}.s3.${region}.amazonaws.com`,
		accessKeyId,
		secretAccessKey,
		endpoint: process.env.S3_ENDPOINT || undefined,
		forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
	}
}

function buildS3Client(cfg: S3Config): S3Client {
	return new S3Client({
		region: cfg.region,
		credentials: {
			accessKeyId: cfg.accessKeyId,
			secretAccessKey: cfg.secretAccessKey,
		},
		...(cfg.endpoint
			? {endpoint: cfg.endpoint, forcePathStyle: cfg.forcePathStyle}
			: {}),
	})
}

/** Extract filename from an S3 key like `media/photo.jpg` → `photo.jpg` */
function filenameFromKey(key: string, prefix: string): string {
	return key.startsWith(prefix) ? key.slice(prefix.length) : key
}

/** Determine MIME type from filename, fallback to octet-stream */
function guessMimeType(filename: string): string {
	const ext = '.' + filename.split('.').pop()?.toLowerCase()
	return MIME_MAP[ext] || 'application/octet-stream'
}

/** Check if object is an "image" based on its MIME */
function isImageMime(mime: string): boolean {
	return mime.startsWith('image/')
}

// ---------------------------------------------------------------------------
// Core sync
// ---------------------------------------------------------------------------

async function listAllS3Objects(
	client: S3Client,
	bucket: string,
	prefix: string,
): Promise<_Object[]> {
	const objects: _Object[] = []
	let continuationToken: string | undefined

	do {
		const command = new ListObjectsV2Command({
			Bucket: bucket,
			Prefix: prefix,
			ContinuationToken: continuationToken,
		})
		const response = await client.send(command)

		if (response.Contents) {
			objects.push(...response.Contents)
		}

		continuationToken = response.IsTruncated
			? response.NextContinuationToken
			: undefined
	} while (continuationToken)

	return objects
}

export async function syncS3ToPayload(payload: Payload): Promise<SyncResult> {
	const cfg = getS3Config()
	const client = buildS3Client(cfg)

	const result: SyncResult = {
		found: 0,
		created: 0,
		updated: 0,
		skipped: 0,
		errors: [],
	}

	// 1. List all objects in S3 under the prefix
	const objects = await listAllS3Objects(client, cfg.bucket, cfg.prefix)

	// Filter out "folder" markers and non-image files
	const imageObjects = objects.filter((obj) => {
		if (!obj.Key || obj.Key.endsWith('/')) return false
		const fn = filenameFromKey(obj.Key, cfg.prefix)
		if (!fn) return false
		// Skip Payload-generated image size variants (e.g. photo-400x300.webp)
		if (/-\d+x\d+\.\w+$/.test(fn)) return false
		return isImageMime(guessMimeType(fn))
	})

	result.found = imageObjects.length

	// 2. For each object, upsert into Payload
	for (const obj of imageObjects) {
		const key = obj.Key!
		const filename = filenameFromKey(key, cfg.prefix)
		const mimeType = guessMimeType(filename)
		const url = `${cfg.publicBaseUrl}/${key}`
		const etag = obj.ETag?.replace(/"/g, '') ?? null
		const lastModified = obj.LastModified ?? null
		const now = new Date().toISOString()

		try {
			// Check if document already exists by s3Key
			const existing = await payload.find({
				collection: 'media',
				where: {s3Key: {equals: key}},
				limit: 1,
				depth: 0,
			})

			if (existing.docs.length > 0) {
				const doc = existing.docs[0]
				// Update only if ETag changed (file was replaced in S3)
				const docETag = (doc as Record<string, unknown>).s3ETag as string | null
				if (etag && docETag === etag) {
					result.skipped++
					continue
				}

				await payload.update({
					collection: 'media',
					id: doc.id,
					data: {
						url,
						filename,
						mimeType,
						filesize: obj.Size ?? 0,
						s3ETag: etag ?? undefined,
						s3LastModified: lastModified?.toISOString() ?? undefined,
						syncedAt: now,
					},
				})
				result.updated++
			} else {
				// Also check by filename to avoid duplicates from before s3Key existed
				const byFilename = await payload.find({
					collection: 'media',
					where: {filename: {equals: filename}},
					limit: 1,
					depth: 0,
				})

				if (byFilename.docs.length > 0) {
					// Backfill s3Key on existing doc
					const doc = byFilename.docs[0]
					await payload.update({
						collection: 'media',
						id: doc.id,
						data: {
							s3Key: key,
							url,
							s3ETag: etag ?? undefined,
							s3LastModified: lastModified?.toISOString() ?? undefined,
							syncedAt: now,
							source: (doc as Record<string, unknown>).source
								? undefined
								: 'payload',
						},
					})
					result.updated++
					continue
				}

				// Create new document
				await payload.create({
					collection: 'media',
					data: {
						alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
						url,
						filename,
						mimeType,
						filesize: obj.Size ?? 0,
						prefix: 'media',
						s3Key: key,
						source: 's3-import',
						s3ETag: etag ?? undefined,
						s3LastModified: lastModified?.toISOString() ?? undefined,
						syncedAt: now,
					},
				})
				result.created++
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : 'Unknown error'
			result.errors.push(`${key}: ${msg}`)
		}
	}

	return result
}
