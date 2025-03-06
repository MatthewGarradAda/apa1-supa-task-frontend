"use client"
import { Product } from "@/db/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {deleteProduct} from "@/actions/admin"
import ProductImage from "@/components/products/ProductImage"
import { formatCurrency } from "@/lib/utils"
import { Plus, Router, Trash2 } from "lucide-react" // Import icons
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type TableProps = {
  products: Product[]
}

export default function ProductsTable({products}: TableProps) {
  const router = useRouter();
  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-end px-1 md:px-4 mt-4">
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Product
          </Link>
        </Button>
      </div>
      
      <div className="rounded-md border max-w-screen-lg px-1 md:px-4 mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="relative w-[50px] h-[50px]">
                  <ProductImage product={product} />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{formatCurrency(parseFloat(product.price))}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`admin/products/${product.id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id).then(() => router.refresh())}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
