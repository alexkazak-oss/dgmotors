import 'dotenv/config'
import pg from 'pg'

async function main() {
	const pool = new pg.Pool({connectionString: process.env.DATABASE_URI})
	const {rows} = await pool.query('SELECT id, filename, url FROM media')

	for (const r of rows) {
		const fnHex = Buffer.from(r.filename ?? '').toString('hex')
		const urlHex = Buffer.from(r.url ?? '').toString('hex')
		console.log(`id=${r.id}`)
		console.log(`  filename: ${JSON.stringify(r.filename)} (hex: ${fnHex})`)
		console.log(`  url:      ${JSON.stringify(r.url)} (hex first 20: ${urlHex.slice(0, 40)})`)
	}
	await pool.end()
}

main()
