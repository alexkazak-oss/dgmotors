import { z } from 'zod'

export const leadSchema = z.object({
  type: z.enum(['callback', 'contact', 'car_inquiry', 'credit', 'leasing']),
  name: z.string().min(2, 'Укажите имя'),
  phone: z.string().min(10, 'Укажите телефон'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  comment: z.string().optional(),
  sourceUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  // Car context
  carId: z.string().optional(),
  brandId: z.string().optional(),
  modelId: z.string().optional(),
  carTitleSnapshot: z.string().optional(),
  carUrlSnapshot: z.string().optional(),
  vinSnapshot: z.string().optional(),
  stockNumberSnapshot: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>
