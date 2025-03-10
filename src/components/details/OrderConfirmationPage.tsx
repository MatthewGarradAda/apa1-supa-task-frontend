import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'

import { formatCurrency } from '@/lib/utils'

interface OrderConfirmationPageProps {
  order: {
    id: number
    createdAt: Date | null
    totalAmount: string
    email: string
    address1: string
    address2: string | null
    city: string
    postcode: string
  },
  items: {
    productId: number | null
    unitPrice: string
    quantity: number
    product: {
      name: string
    } | null
  }[],
}

export default async function OrderConfirmationPage(props: OrderConfirmationPageProps) {
  const { order, items } = props;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
              <p className="text-gray-500">
                {format(order.createdAt!, 'MMMM dd, yyyy')}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">Total Amount</p>
              <p className="text-xl font-bold">{formatCurrency(parseFloat(order.totalAmount))}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold">Items</h3>
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product?.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  {formatCurrency(parseFloat(item.unitPrice) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold">Shipping Details</h3>
            <div className="text-gray-600">
              <p>{order.email}</p>
              <p>{order.address1}</p>
              {order.address2 && <p>{order.address2}</p>}
              <p>{order.city}</p>
              <p>{order.postcode}</p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-gray-600">
            A confirmation email has been sent to {order.email}
          </p>
        </div>
      </div>
    </div>
  )
}
