"use server"
import { FormValues } from "@/components/admin/schema";

import { db } from '@/db'
import { products } from '@/db/schema'

import { eq } from 'drizzle-orm'

export async function upsertProduct(values: FormValues, id?: number) {
    if (!id) {
        return await db.insert(products).values(values);
    }
    return await db.update(products)
        .set(values)
        .where(eq(products.id, id))
}

export async function deleteProduct(id: number) {
    return await db.delete(products).where(eq(products.id, id));
}