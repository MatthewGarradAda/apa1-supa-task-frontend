"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import type { Product } from "@/db/validation"
  
interface ProductsTableProps {
    products: Product[]
}
  
export function ProductsTable({ products }: ProductsTableProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">
                £{product.price.toFixed(2)}
              </TableCell>
              <TableCell>{product.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}
  