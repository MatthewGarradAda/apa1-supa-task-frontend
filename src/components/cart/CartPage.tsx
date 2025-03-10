'use client'

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBasket } from "./index"
import { formatCurrency } from "@/lib/utils"
import ProductImage from "../products/ProductImage"

import type { Products, RemoveProduct, UpdateQuantity, GetTotalPrice } from "./context"

interface CartPageProps {
  products: Products
  removeProduct: RemoveProduct;
  updateQuantity: UpdateQuantity;
  getTotalPrice: GetTotalPrice;
}

export default function CartPage(props: CartPageProps) {
  const { products, removeProduct, updateQuantity, getTotalPrice } = props

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Your Cart</h1>

      {products.length === 0 ? (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card>
              {products.map((product, index) => (
                <div key={product.id}>
                  <div className="p-6 flex gap-6">
                    <div className="relative aspect-square h-24 rounded-md overflow-hidden">
                      <ProductImage product={product}/>
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                      <p className="font-medium">{formatCurrency(parseFloat(product.price))}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        data-testid="qty-dec"
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{product.quantity}</span>
                      <Button
                        data-testid="qty-asc"
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      data-testid="rm"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {index < products.length - 1 && <Separator />}
                </div>
              ))}
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
