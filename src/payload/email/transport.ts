import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: Number(process.env.SMTP_PORT) === 465,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

interface SendEmailOptions {
	to: string
	subject: string
	html: string
}

export async function sendEmail({
	to,
	subject,
	html,
}: SendEmailOptions): Promise<void> {
	if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
		console.warn('[Email] SMTP not configured, skipping email send')
		return
	}

	await transporter.sendMail({
		from: process.env.EMAIL_FROM || 'noreply@dgmotors.com',
		to,
		subject,
		html,
	})
}
