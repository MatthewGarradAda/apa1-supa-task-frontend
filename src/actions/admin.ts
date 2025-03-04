"use server"
import { FormValues } from "@/components/admin/schema";

import { db } from '@/db'
import { products } from '@/db/schema'
import { Product } from '@/db/types'

import { eq } from 'drizzle-orm'

export async function updateProduct(id: number, values: FormValues) {
    return await db.update(products)
        .set(values)
        .where(eq(products.id, id))
}