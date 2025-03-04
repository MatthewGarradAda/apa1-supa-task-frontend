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
          <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="15" width="40" height="35" rx="4" fill="#4A90E2"/>
            <rect x="20" y="10" width="20" height="8" rx="2" fill="#4A90E2"/>
            
            <path d="M25 15 L35 15" stroke="#FFFFFF" strokeWidth="2"/>
            
            <text x="60" y="40" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#333333">
              STORE
            </text>
            
            <text x="62" y="52" fontFamily="Arial, sans-serif" fontSize="10" fill="#666666">
              fake products
            </text>
          </svg>
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
