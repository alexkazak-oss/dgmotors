import type {LeadType} from '@/src/shared/types'

interface LeadEmailData {
	type: LeadType | string
	name: string
	phone: string
	email?: string
	comment?: string
	sourceUrl?: string
	carTitle?: string
	carUrl?: string
	brandName?: string
	modelName?: string
	vin?: string
	stockNumber?: string
}

const typeLabels: Record<string, string> = {
	callback: 'Обратный звонок',
	contact: 'Контакт',
	car_inquiry: 'Запрос по авто',
	credit: 'Кредит',
	leasing: 'Лизинг',
}

export function getLeadEmailSubject(data: LeadEmailData): string {
	if (data.carTitle) {
		return `Новая заявка по авто: ${data.carTitle}`
	}
	return 'Новая заявка с сайта'
}

export function renderLeadEmailHtml(data: LeadEmailData): string {
	const rows: string[] = []

	const addRow = (label: string, value?: string) => {
		if (value) {
			rows.push(`
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:180px;">${label}</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>
      `)
		}
	}

	addRow('Тип заявки', typeLabels[data.type] || data.type)
	addRow('Имя', data.name)
	addRow('Телефон', data.phone)
	addRow('Email', data.email)
	addRow('Комментарий', data.comment)
	addRow('Страница', data.sourceUrl)

	if (data.carTitle) {
		addRow('Автомобиль', data.carTitle)
		addRow('Бренд', data.brandName)
		addRow('Модель', data.modelName)
		addRow('VIN', data.vin)
		addRow('Stock #', data.stockNumber)
		if (data.carUrl) {
			rows.push(`
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:180px;">Ссылка на авто</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;"><a href="${escapeHtml(data.carUrl)}" style="color:#2563eb;">${escapeHtml(data.carUrl)}</a></td>
        </tr>
      `)
		}
	}

	return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;">
      <div style="max-width:600px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <div style="background:#111827;padding:20px 24px;">
          <h1 style="margin:0;font-size:18px;color:#fff;">${data.carTitle ? `Заявка по авто: ${escapeHtml(data.carTitle)}` : 'Новая заявка с сайта'}</h1>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            ${rows.join('')}
          </table>
        </div>
        <div style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:13px;">
          DG Motors — уведомление о заявке
        </div>
      </div>
    </body>
    </html>
  `
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}
