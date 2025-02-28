"use server" 
// these functions can only run on our server (privileged environment)
// note that env variables are not given to the client (browser) anyway

import { products, users } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm";

export async function getUsers() {
    return db.select().from(users);
}

export async function getProducts() {
    return db.select().from(products)
}

export async function getProduct(id: number) {
    if (isNaN(id)) {
        return [];
    }
    return db.select().from(products).where(eq(products.id, id));
}