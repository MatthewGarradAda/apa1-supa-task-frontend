"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

import { Product } from "@/db/types"


interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="container mx-auto py-10 px-2">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={`/${product.image || "placeholder.jpg"}`}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <h2 className="font-semibold text-xl line-clamp-1">
                    {product.name}
                  </h2>
                  <Badge variant="secondary" className="ml-2">
                    {formatCurrency(parseFloat(product.price))}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2 line-clamp-2">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
