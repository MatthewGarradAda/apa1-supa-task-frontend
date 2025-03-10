'use client'

import { useBasket } from "./index"

import CartPage from "./CartPage"

export default function Cart() {
  const { products, removeProduct, updateQuantity, getTotalPrice } = useBasket()

  return <CartPage products={products} removeProduct={removeProduct} updateQuantity={updateQuantity} getTotalPrice={getTotalPrice} />
}
