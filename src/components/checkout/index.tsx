"use client"

import { useBasket } from "../cart";

import CheckoutPage from "./CheckoutPage";

export default function Checkout() {
  const {products, clearBasket, getTotalPrice} = useBasket();
  return <CheckoutPage products={products} clearBasket={clearBasket} getTotalPrice={getTotalPrice} />
}