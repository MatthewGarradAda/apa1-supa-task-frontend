'use client'

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBasket } from "./index"
import { formatCurrency } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function TopBar() {
  const { totalItems } = useBasket()

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl text-foreground">
          Store Name
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/cart" className="flex items-center gap-2">
              <motion.div
                key={`icon-${totalItems}`}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.div>
              <motion.span
                key={`num-${totalItems}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {totalItems}
              </motion.span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
