/**
 * Environment validation using Zod.
 * Import this at the top of server-only files or in instrumentation.ts
 * to ensure required environment variables are present at startup.
 */
import {z} from 'zod'

const serverSchema = z.object({
	DATABASE_URI: z.string().min(1, 'DATABASE_URI is required'),
	PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),

	// SMTP (optional — email sending is skipped if not set)
	SMTP_HOST: z.string().optional(),
	SMTP_PORT: z.coerce.number().optional(),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
	EMAIL_FROM: z.string().optional(),
	ADMIN_EMAIL: z.string().email().optional(),

	// S3 (optional — local storage used if not set)
	S3_BUCKET: z.string().optional(),
	S3_ACCESS_KEY_ID: z.string().optional(),
	S3_SECRET_ACCESS_KEY: z.string().optional(),
	S3_REGION: z.string().optional(),
	S3_ENDPOINT: z.string().optional(),
	S3_FORCE_PATH_STYLE: z.string().optional(),
})

const clientSchema = z.object({
	NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
})

export type ServerEnv = z.infer<typeof serverSchema>
export type ClientEnv = z.infer<typeof clientSchema>

function validateEnv() {
	const serverResult = serverSchema.safeParse(process.env)
	const clientResult = clientSchema.safeParse(process.env)

	if (!serverResult.success) {
		console.error('Invalid server environment variables:')
		console.error(serverResult.error.flatten().fieldErrors)
		throw new Error('Invalid server environment variables')
	}

	if (!clientResult.success) {
		console.error('Invalid client environment variables:')
		console.error(clientResult.error.flatten().fieldErrors)
		throw new Error('Invalid client environment variables')
	}

	return {
		server: serverResult.data,
		client: clientResult.data,
	}
}

export const env = validateEnv()
