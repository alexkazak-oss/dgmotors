/**
 * Migration: update media URLs from relative /api/media/file/... paths
 * to absolute S3 URLs via direct database query.
 *
 * Usage: npx tsx scripts/migrate-media-urls.ts
 */
import 'dotenv/config'
import pg from 'pg'

const S3_BASE =
	process.env.S3_PUBLIC_BASE_URL ||
	`https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`

const PREFIX = 'media'

async function main() {
	const pool = new pg.Pool({connectionString: process.env.DATABASE_URI})

	// Find all media with relative or wrong URLs
	const {rows} = await pool.query(
		`SELECT id, filename, url FROM media WHERE filename IS NOT NULL`,
	)

	let updated = 0
	let skipped = 0

	for (const row of rows) {
		const expectedUrl = `${S3_BASE}/${PREFIX}/${row.filename}`

		if (row.url === expectedUrl) {
			skipped++
			continue
		}

		await pool.query(`UPDATE media SET url = $1 WHERE id = $2`, [
			expectedUrl,
			row.id,
		])
		updated++
		console.log(`  ✓ ${row.filename} → ${expectedUrl}`)
	}

	console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`)
	await pool.end()
}

main().catch((err) => {
	console.error('Migration failed:', err)
	process.exit(1)
})
