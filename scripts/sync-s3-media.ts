/**
 * Dev-only script: run S3 → Payload sync via the running server.
 *
 * Requires the Next.js dev/prod server to be running.
 *
 * Usage:
 *   npx tsx scripts/sync-s3-media.ts <email> <password> [base-url]
 *
 * Example:
 *   npx tsx scripts/sync-s3-media.ts admin@example.com secret123 http://localhost:3000
 */
import 'dotenv/config'

const [email, password, baseUrl = 'http://localhost:3000'] =
	process.argv.slice(2)

if (!email || !password) {
	console.error(
		'Usage: npx tsx scripts/sync-s3-media.ts <email> <password> [base-url]',
	)
	process.exit(1)
}

async function main() {
	// 1. Login to get JWT
	const loginRes = await fetch(`${baseUrl}/api/users/login`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email, password}),
	})

	if (!loginRes.ok) {
		throw new Error(`Login failed: HTTP ${loginRes.status}`)
	}

	const loginData = (await loginRes.json()) as {token?: string}
	const token = loginData.token
	if (!token) throw new Error('No token in login response')

	console.log('Authenticated. Running sync...\n')

	// 2. Call sync endpoint
	const syncRes = await fetch(`${baseUrl}/api/s3-sync`, {
		method: 'POST',
		headers: {Authorization: `Bearer ${token}`},
	})

	if (!syncRes.ok) {
		const body = (await syncRes.json().catch(() => null)) as {
			error?: string
		} | null
		throw new Error(body?.error || `Sync failed: HTTP ${syncRes.status}`)
	}

	const result = (await syncRes.json()) as {
		found: number
		created: number
		updated: number
		skipped: number
		errors: string[]
	}

	console.log('=== Sync Result ===')
	console.log(`Found in S3:  ${result.found}`)
	console.log(`Created:      ${result.created}`)
	console.log(`Updated:      ${result.updated}`)
	console.log(`Skipped:      ${result.skipped}`)

	if (result.errors.length > 0) {
		console.log(`\nErrors (${result.errors.length}):`)
		for (const e of result.errors) {
			console.log(`  - ${e}`)
		}
	}
}

main().catch((err) => {
	console.error('Sync failed:', err instanceof Error ? err.message : err)
	process.exit(1)
})
