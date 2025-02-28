'use client'

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBasket } from "./index"
import { formatCurrency } from "@/lib/utils"

export function TopBar() {
  const { totalItems } = useBasket()

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl text-foreground">
          Store Name
        </Link>

        <div className="flex items-center gap-4">
          {/* <div className="text-sm text-muted-foreground">
            Cart Total: {formatCurrency(getTotalPrice())}
          </div> */}
          
          <Button variant="outline" size="sm" asChild>
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>{totalItems}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
