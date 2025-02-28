"use client"
import { useState } from "react"
import { 
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

import { formatCurrency } from "@/lib/utils"
import { useBasket } from "../cart"

type Product = {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: string;
    sku: string;
    createdAt: Date | null;
}

interface ProductDetailsProps {
  product: Product
}

const MAX_QUANTITY = 10;

export function ProductDetails({ product }: ProductDetailsProps) {
  const {addProduct} = useBasket();
  const [quantity, setQuantity] = useState("1")

  const handleAddToCart = () => {
    // console.log(`Adding ${quantity} of ${product.name} to cart`)
    addProduct(product, parseInt(quantity));
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square relative overflow-hidden rounded-l-lg">
            <Image
              src={`/${product.image || "placeholder.jpg"}`}
              alt={product.name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="w-full md:w-1/2 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">
              {formatCurrency(parseFloat(product.price))}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">{product.description}</p>
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Quantity
              </label>
              <Select
                value={quantity}
                onValueChange={setQuantity}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: MAX_QUANTITY}).map((_, num) => (
                    <SelectItem key={num+1} value={(num+1).toString()}>
                      {num+1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          {/* Additional Details */}
          <div className="pt-6 border-t space-y-4">
            <h3 className="font-semibold">Product Details</h3>
            <div className="prose prose-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-1">
                <li>Free shipping</li>
                <li>30-day return policy</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
