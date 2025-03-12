"use client"
import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import ProductImage from "@/components/products/ProductImage"
import { Product } from "@/db/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Import Select components

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState("")

  // Debounce logic
  useEffect(() => {
    setIsLoading(true)
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setIsLoading(false)
    }, 250) // Adjust debounce delay as needed

    return () => {
      clearTimeout(handler)
      setIsLoading(false)
    }
  }, [searchQuery])

  const filteredProducts = useMemo(() => {
    let productsToDisplay = products.filter((product) => {
      const query = debouncedQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      )
    })

    // Sort the products based on selected sort option
    if (sortBy === "price-asc") {
      productsToDisplay = productsToDisplay.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortBy === "price-desc") {
      productsToDisplay = productsToDisplay.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }

    return productsToDisplay
  }, [debouncedQuery, products, sortBy])

  return (
    <div className="container mx-auto py-10 px-2">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      
      <div className="mb-6 flex justify-between items-center gap-6">
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="p-2 border rounded-md">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && (
          <div className="w-8 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={"animate-spin"}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        )}

        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded-md w-full max-w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <ProductImage product={product} />
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
