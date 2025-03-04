"use server" 
// these functions can only run on our server (privileged environment)
// note that env variables are not given to the client (browser) anyway

import { orderItems, orders, products, users } from "@/db/schema"
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

type CartProducts = {
    id: number
    quantity: number
}[]

export async function createOrder(
    products: CartProducts,
    customerDetails: {
      email: string,
      address1: string,
      address2?: string,
      city: string,
      postcode: string
    }
  ) {
    // Secure price lookup from the database (not the client)
    const serverProducts = await Promise.all(
      products.map(async p => {
        const [product] = await getProduct(p.id)
        return {price: product.price, id: product.id, quantity: p.quantity};
      })
    )
    // Calculate total amount from products
    const totalAmount = serverProducts.reduce(
      (sum, product, i) => sum + (parseFloat(product.price) * product.quantity),
      0
    );
  
    // Create the order first
    const [order] = await db.insert(orders).values({
      email: customerDetails.email,
      totalAmount: String(totalAmount),
      address1: customerDetails.address1,
      address2: customerDetails.address2,
      city: customerDetails.city,
      postcode: customerDetails.postcode
    }).returning({ id: orders.id });
  
    // Create order items
    const orderItemsValues = serverProducts.map(({ id, quantity, price }) => ({
      orderId: order.id,
      productId: id,
      quantity,
      unitPrice: price
    }));
  
    await db.insert(orderItems).values(orderItemsValues);
  
    return order.id;
  }
  