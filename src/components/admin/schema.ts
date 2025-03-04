import * as z from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  sku: z.string().min(1, 'SKU is required'),
  image: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>