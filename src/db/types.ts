import type { InferSelectModel } from 'drizzle-orm'

import { products, orderItems, orders } from './schema'

export type Product = InferSelectModel<typeof products>
// export type Order = InferSelectModel<typeof orders>
// export type Item = InferSelectModel<typeof orderItems> & {
//     product: Product | null
// }