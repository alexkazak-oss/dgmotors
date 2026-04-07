import 'dotenv/config'
import pg from 'pg'

async function main() {
	const pool = new pg.Pool({connectionString: process.env.DATABASE_URI})
	const {rows} = await pool.query(
		'SELECT id, url FROM media WHERE url IS NOT NULL',
	)

	let fixed = 0
	for (const r of rows) {
		const clean = r.url.trim()
		if (clean !== r.url) {
			await pool.query('UPDATE media SET url = $1 WHERE id = $2', [clean, r.id])
			console.log(
				`Fixed id=${r.id}: ${JSON.stringify(r.url)} → ${JSON.stringify(clean)}`,
			)
			fixed++
		} else {
			console.log(`OK id=${r.id}: ${r.url}`)
		}
	}
	console.log(`\nFixed: ${fixed}/${rows.length}`)
	await pool.end()
}

main()
